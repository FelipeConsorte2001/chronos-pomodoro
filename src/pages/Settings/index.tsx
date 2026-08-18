import { SaveIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { showMessage } from "../../adapters/showMessage";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { MainTemplate } from "../../templates/MainTemplate";

export function Settings() {
    const { state, dispatch } = useTaskContext();
    const workTimeInputRef = useRef<HTMLInputElement>(null);
    const shortBreakInputRef = useRef<HTMLInputElement>(null);
    const longBreakInputRef = useRef<HTMLInputElement>(null);
    function handleSaveSettings(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        showMessage.dismiss();

        const workTime = Number(workTimeInputRef.current?.value);
        const shortBreakTime = Number(shortBreakInputRef.current?.value);
        const longBreakTime = Number(longBreakInputRef.current?.value);

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime))
            showMessage.error("Digite apenas números para TODOS os campos");

        if (workTime < 1 || workTime > 99)
            showMessage.error("Digite valores entre 1 e 99");

        if (shortBreakTime < 1 || shortBreakTime > 30)
            showMessage.error(
                "Digite valores entre 1 e 30 para descanso curto",
            );
        if (longBreakTime < 1 || longBreakTime > 60)
            showMessage.error(
                "Digite valores entre 1 e 60 para descanso longo",
            );
        dispatch({
            type: TaskActionTypes.CHANGE_SETTINGS,
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime,
            },
        });
        showMessage.success("Configurações salvas");
    }

    useEffect(() => {
        document.title = "Entenda a Técnica Pomodoro - Chronos Pomodoro";
    }, []);

    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>

            <Container>
                <p style={{ textAlign: "center" }}>
                    Modifique as configurações para tempo de foco, descanso
                    curso e descanso longo.
                </p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} action='' className='form'>
                    <div className='formRow'>
                        <DefaultInput
                            labelText='Foco'
                            id='worktime'
                            ref={workTimeInputRef}
                            defaultValue={state.config.workTime}
                            type='number'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            labelText='Decanso curto'
                            id='shortBreakTime'
                            ref={shortBreakInputRef}
                            defaultValue={state.config.shortBreakTime}
                            type='number'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            labelText='Decanso longo'
                            id='longBreakTime'
                            ref={longBreakInputRef}
                            defaultValue={state.config.longBreakTime}
                            type='number'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultButton
                            icon={<SaveIcon />}
                            aria-label='Salvar configurações'
                            title='Salvar configurações'
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}
