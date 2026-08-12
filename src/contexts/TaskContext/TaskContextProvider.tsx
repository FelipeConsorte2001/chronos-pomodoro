import { useEffect, useReducer, useRef } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { loadBeep } from "../../utils/loadBeep";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialState } from "./initialTaskState";
import { TaskActionTypes } from "./taskActions";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialState, () => {
        const storageState = localStorage.getItem("state");
        if (storageState === null) return initialState;

        const pardedStorageState = JSON.parse(storageState) as TaskStateModel;

        return {
            ...pardedStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: "00:00",
        };
    });
    const playBeepRef = useRef<() => void | null>(null);

    useEffect(() => {
        if (!state.activeTask) return;

        const worker = TimerWorkerManager.getInstance();
        worker.onmessage(event => {
            const countDownSeconds = event.data;
            if (countDownSeconds <= 0) {
                if (playBeepRef.current) {
                    playBeepRef.current();
                    playBeepRef.current = null;
                }

                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
                worker.terminate();
                return;
            }

            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        });

        worker.postmessage(state);

        return () => {
            worker.terminate();
        };
    }, [state.activeTask?.id]);

    useEffect(() => {
        const worker = TimerWorkerManager.getInstance();

        localStorage.setItem("state", JSON.stringify(state));

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
        if (!state.activeTask) {
            console.log("Worker finishhed by missing activeTask");
            worker.terminate();
            return;
        }

        worker.postmessage(state);
    }, [state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else playBeepRef.current = null;
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
