import { TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { MainTemplate } from "../../templates/MainTemplate";
import { formatDate } from "../../utils/formartDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import styles from "./styles.module.css";

export function History() {
    const { state, dispatch } = useTaskContext();
    const [confirmClearHistory, setConfirmClearHistory] = useState(false);
    const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
        () => {
            return {
                tasks: sortTasks({ tasks: state.tasks }),
                field: "startDate",
                direction: "desc",
            };
        },
    );
    const hasTasks = state.tasks.length > 0;

    const sortedTasks = useMemo(() => {
        return sortTasks({
            tasks: state.tasks,
            direction: sortTasksOptions.direction,
            field: sortTasksOptions.field,
        });
    }, [state.tasks, sortTasksOptions.direction, sortTasksOptions.field]);

    function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
        const newDirection =
            sortTasksOptions.direction === "desc" ? "asc" : "desc";
        setSortTaskOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTasksOptions.tasks,
                field: field,
            }),
            direction: newDirection,
            field,
        });
    }

    function handleReseteHistory() {
        showMessage.dismiss();
        showMessage.confirm("Tem certeza?", confirmation => {
            if (confirmation) {
                dispatch({ type: TaskActionTypes.RESET_STATE });
            }
        });
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>History</span>
                    {hasTasks && (
                        <span className={styles.buttonContainer}>
                            <DefaultButton
                                icon={<TrashIcon />}
                                color='red'
                                aria-label='Apagar todo o histórico'
                                title='Apagar histórico'
                                onClick={handleReseteHistory}
                            />
                        </span>
                    )}
                </Heading>
            </Container>
            <Container>
                {hasTasks && (
                    <div className={styles.responsiveTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        onClick={() =>
                                            handleSortTasks({ field: "name" })
                                        }
                                        className={styles.thSort}>
                                        Tarefa ↕
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortTasks({
                                                field: "duration",
                                            })
                                        }
                                        className={styles.thSort}>
                                        Duração ↕
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortTasks({
                                                field: "startDate",
                                            })
                                        }
                                        className={styles.thSort}>
                                        Data ↕
                                    </th>
                                    <th>Status</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTasks.map(task => {
                                    const taskTypeDictionary = {
                                        workTime: "Foco",
                                        shortBreakTime: "Descanso curto",
                                        longBreakTime: "Descanso longo",
                                    };
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td>{task.duration}min</td>
                                            <td>
                                                {formatDate(task.startDate)}
                                            </td>
                                            <td>
                                                {getTaskStatus(
                                                    task,
                                                    state.activeTask,
                                                )}
                                            </td>
                                            <td>
                                                {taskTypeDictionary[task.type]}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {!hasTasks && (
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Ainda não tem tarefas criadas
                    </p>
                )}
            </Container>
        </MainTemplate>
    );
}
