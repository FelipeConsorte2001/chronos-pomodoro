import { useEffect, useReducer } from "react";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        const worker = TimerWorkerManager.getInstance();

        worker.onmessage(e => {
            const countDownSeconds = e.data;
            console.log(countDownSeconds);

            if (countDownSeconds <= 0) {
                console.log("Worker COMPLETED");
                worker.terminate();
            }
        });

        return () => {
            console.log("Worker finished by cleanup on component");
            worker.terminate();
        };
    }, []);

    useEffect(() => {
        const worker = TimerWorkerManager.getInstance();

        if (!state.activeTask) {
            console.log("Worker finishhed by missing activeTask");
            worker.terminate();
            return;
        }

        worker.postmessage(state);
    }, [state]);
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
