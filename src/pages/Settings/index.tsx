import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

export function Settings() {
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
                <form action='' className='form'>
                    <div className='formRow'>
                        <DefaultInput labelText='Foco' id='worktime' />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            labelText='Decanso curto'
                            id='shortBreakTime'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput
                            labelText='Decanso longo'
                            id='longBreakTime'
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
