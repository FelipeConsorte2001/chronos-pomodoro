import { PlayCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContent } from "../../contexts/TaskContext/useTaskContext";
import type { TaskModel } from "../../models/TaskModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {
    const { state, setState } = useTaskContent()
    const taskNameInput = useRef<HTMLInputElement>(null)


    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(state.currentCycle)

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!taskNameInput.current) return
        const taskName = taskNameInput.current.value.trim()

        if (!taskName) {
            alert('Digite o nome da tarefa')
            return
        }
        const newTask: TaskModel = {
            id: crypto.randomUUID(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        }
        const secondsRemaining = newTask.duration * 60
        setState(prev => {
            return {
                ...prev,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [...prev.tasks, newTask],
                config: { ...prev.config }
            }
        })
    }
    return (
        <form onSubmit={handleCreateNewTask} action={''} className='form'>
            <div className="formRow">
                <DefaultInput
                    ref={taskNameInput}
                    id='input'
                    type='text'
                    labelText='Task'
                    placeholder='Digite algo'
                />
            </div>
            <div className="formRow">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            {state.currentCycle > 0 && (
                <div className="formRow">
                    <Cycles />
                </div>
            )}
            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
        </form>
    )
}