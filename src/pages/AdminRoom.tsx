import { useHistory, useParams } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../Components/button'
import { RoomCode } from '../Components/Roomcode'
import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../Components/Question'
import { useRoom } from '../hooks/useRoom'




type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth()

    // Falta passar o código da sala aqui pra dentro
    const history = useHistory()
    const params = useParams<RoomParams>()
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id
    // agora que transferi os componentes preciso chamar o novo hoock criado aqui
    const { title, questions } = useRoom(roomId)

    // Função para encerrar a sala 
    async function handleEndRoom() {
       await database.ref(`rooms/${roomId}`).update({
           endedAt: new Date()
       })

       // Depois de encerrar a sala vou redirecionar o usuario 
       history.push('/')
    }

    // Função que vai remover a pergunta
    async function handleDeleteQuestion(questionId: string) {
       if (window.confirm('Você tem certeza que deseja excluir esta pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}` ).remove()
       }
    }
   
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if(newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },

            // essas duas perguntas vão determinar se a pergunta já está respondida
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

    }

    return (
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="Letmeask" />
                   <div>
                   <RoomCode code={roomId} />
                   <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                   </div>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1>Sala {title}</h1>
                   { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
               </div>

               <form onSubmit={handleSendQuestion}>
                   <textarea 
                    placeholder="O que você quer perguntar ?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                   />

                   <div className="form-footer">
                       { user ? (   
                           <div className="user-info">
                               <img src={user.avatar} alt={user.name} />
                               <span>{user.name}</span>
                           </div>
                       ) : (
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                       ) }

                       {/* o botão está desabilitado caso o usuario não esteja logado */}
                       <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                   </div>
               </form>

               <div className="question-list">
                   {/* Quando eu percorro uma lista usando um map eu preciso passar uma chave, e nela eu passo qual parametro é unico, que normalmente será o id */}
               {questions.map(question => {
                   return (
                       <Question 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        >

                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    
                   )
               })}
               </div>
           </main>
       </div>
    )
}