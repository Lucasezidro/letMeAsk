import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> // O buttonHtmlAtributtes vai chamar todas as propriedades de um botão

// Então posso passar ele nas props, e espalhar dentro do botão (...props)
export function Button(props: ButtonProps) { 
    return (
        <button className="button" {...props}></button>
    )
}