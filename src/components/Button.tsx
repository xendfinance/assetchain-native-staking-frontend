import React, {FC} from 'react'

interface Props {
    text?: string | HTMLElement | JSX.Element;
    type?: any;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    id?: string;
    rest?: any;
    onClick?: (e?: any)=>void;
    e?: any;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean
    leftText?: string;
    rightText?: string;
}

export const Button: FC<Props> = ({text, type, disabled, className, 
    onClick, primary, secondary, tertiary, ...rest }) => {
    return (
        <button 
            type={type && (type || undefined)}
            className={`button ${disabled? "disable" : ""} 
                ${className} 
                ${secondary && "secondary"}
                ${tertiary && "tertiary"}
            `}
            onClick={onClick && onClick}
            disabled={disabled}
        >
            <div className="btn-inside">
                <p>{text}</p>
            </div>
        </button>
    )
}

export const CapsuleBtn = ({leftText, rightText, onClick}: Props) => (
    <div className="capsule-btn"
        onClick={onClick && onClick}
    >
         <div className="left-capsule">
            {leftText}
        </div>
        <div className="right-capsule">
            {rightText}
        </div>
    </div>
)

