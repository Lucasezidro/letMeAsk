// A pagina pages vai guardas as paginas da minha aplicação
// No React para usar uma imagem eu preciso importar ela para usar 
import { Link } from 'react-router-dom'
import IlustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../Components/button'
import { useAuth } from '../hooks/useAuth'


export function NewRoom() {
    const { user } = useAuth()
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
                    <h2>Criar uma nova Sala</h2>
                <form>
                    <input 
                        type="text" 
                        placeholder="Nome da Sala"
                    />
                    <Button type="submit">Criar Sala</Button>
                </form>
                <p>
                    Quer entrar em uma sala existente ? <Link to="/">Clique Aqui</Link>
                </p>
                </div>
            </main>
        </div>
    )
}