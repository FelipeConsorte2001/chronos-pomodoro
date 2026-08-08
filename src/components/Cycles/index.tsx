import { useTaskContent } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
    const { state } = useTaskContent()

    const cycleDescriptionMap = {
        workTime: 'foco',
        shortBreakTime: 'decanso curso',
        longBreakTime: 'descanso longo',
    };

    const cycleStep = Array.from({ length: state.currentCycle })
    return (
        <>
            <div className={styles.cycles}>
                <span>Ciclos:</span>
                <div className={styles.cycleDots}>
                    {cycleStep.map((_, key) => {
                        const nextCycle = getNextCycle(key)
                        const nextCycleType = getNextCycleType(nextCycle)
                        return (
                            <span
                                key={nextCycle}
                                className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                                aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                                title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}