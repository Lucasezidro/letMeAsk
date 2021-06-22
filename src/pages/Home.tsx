// A pagina pages vai guardas as paginas da minha aplicação
// No React para usar uma imagem eu preciso importar ela para usar 
import { useHistory } from 'react-router-dom'
import IlustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../Components/button'

// o handleCreateRoom é a função para criar as rotas de navegação entre as paginas
export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom() {
        // Se o usuario não estiver logado vou chamar a função que o força a estar (signInWithGoogle)
        if(!user) {
            await signInWithGoogle()
        }
       

            history.push('/rooms/new')
        }
    

    return (
        <div id="page-auth">
            <aside>
                <img src={IlustrationImg} alt="ilustração simbolizando perguntas e respostas" /> 
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={LogoImg} alt="Letmeask" />
                
                <button onClick={handleCreateRoom} className="creteRoom">
                    <img src={googleIconImg} alt="Logo do google" />
                    Crie sua sala com o Google
                </button>
                <div className="separator">Ou entre em uma sala</div>

                <form>
                    <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                    />
                    <Button type="submit">Entrar na sala</Button>
                </form>
                </div>
            </main>
        </div>
    )
}