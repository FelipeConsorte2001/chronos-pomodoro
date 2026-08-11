import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContent } from "../../contexts/TaskContext/useTaskContext";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Tips } from "../Tips";

export function MainForm() {
    const { state, dispatch } = useTaskContent();
    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!taskNameInput.current) return;
        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert("Digite o nome da tarefa");
            return;
        }
        const newTask: TaskModel = {
            id: crypto.randomUUID(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCyleType],
            type: nextCyleType,
        };
        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    }

    function handleInterruptTask() {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    }

    return (
        <form onSubmit={handleCreateNewTask} action={""} className='form'>
            <div className='formRow'>
                <DefaultInput
                    ref={taskNameInput}
                    id='input'
                    type='text'
                    labelText='Task'
                    placeholder='Digite algo'
                    disabled={!!state.activeTask}
                />
            </div>
            <div className='formRow'>
                <Tips />
            </div>
            {state.currentCycle > 0 && (
                <div className='formRow'>
                    <Cycles />
                </div>
            )}
            <div className='formRow'>
                {!state.activeTask && (
                    <DefaultButton
                        aria-label='Iniciar nova tarefa'
                        title='Iniciar nova tarefa'
                        icon={<PlayCircleIcon />}
                        key={"submit"}
                    />
                )}
                {!!state.activeTask && (
                    <DefaultButton
                        key={"stop"}
                        aria-label='Interromper tarefa atual'
                        onClick={handleInterruptTask}
                        title='Interromper tarefa atual'
                        color='red'
                        type='button'
                        icon={<StopCircleIcon />}
                    />
                )}
            </div>
        </form>
    );
}
