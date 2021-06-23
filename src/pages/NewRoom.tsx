// A pagina pages vai guardas as paginas da minha aplicação
// No React para usar uma imagem eu preciso importar ela para usar 
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import IlustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../Components/button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'


export function NewRoom() {
    const { user } = useAuth()

    const history = useHistory()

    // Aqui eu vou obter o valor do input
    const [newRoom, setNewRoom] = useState('')

    // handleCreateRoom será a função que vai criar uma sala
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // console.log(newRoom) dessa forma posso ver que já está pegando os dados do input

        // validr se o campo está vazio e o trim remove os espaços
        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        // O push vai jogar os dados no 'rooms'
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        // Dessa forma ao usuario criar uma sala ele vai ser redirecionado para a sala
        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova Sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input 
                        type="text" 
                        placeholder="Nome da Sala"
                        // obtendo o valor do input 
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
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