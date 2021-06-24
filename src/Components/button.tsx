import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    isOutlined?: boolean;
} // O buttonHtmlAtributtes vai chamar todas as propriedades de um botão

// Então posso passar ele nas props, e espalhar dentro do botão (...props)
export function Button({isOutlined = false, ...props}: ButtonProps) { 
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`} 
            {...props}>

            </button>
    )
}