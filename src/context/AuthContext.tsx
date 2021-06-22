import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebase } from '../services/firebase';


type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProps = {
      children: ReactNode;
  }

  export const AuthContext = createContext({} as AuthContextType)

// Nesta parte do App eu criei a autenticação com o usuario, para que o 
// obrigague a estar logado ao realizar algumas opções da aplicação
export function AuthContextProvider(props: AuthContextProps) {
    const [user, setUser] = useState<User>()

  // O segundo parametro do useEffect sempre será um array 
  // e ele vai identificar o que eu quero disparar quando a função for executada
  // Exemplo: useEffect(() => {} [user]) quando a função for executada ele vai disparar o user
  // Se eu quiser que ele dispare uma unica vez eu deixo o vetor vazio
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user) {
        const { displayName, photoURL, uid} = user

              if(!displayName || !photoURL) {
                throw new Error("Missing Information from Google Account.");
                
              }

              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        
            if(result.user) {
              const { displayName, photoURL, uid} = result.user

              if(!displayName || !photoURL) {
                throw new Error("Missing Information from Google Account.");
                
              }

              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              })
            }    
    }
    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}