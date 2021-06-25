import { ReactNode } from 'react'
import cx from 'classnames'

import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

// Eu fiz a desustruração do content e do author pra não precisar utilizar o props
// se tivesse o props ao inves do obj seria props.content
export function Question({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children
}: QuestionProps) {
    return(
        <div className={cx(
            'questions',
            { answered: isAnswered },
            { highlighted: isHighLighted && !isAnswered}
        )}>
            {/* O props.content no caso é a pargunta que vai aparecer na tela */}
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}