import React, {FC} from 'react'
import {Loader} from "./Loader"

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
}

export const Button: FC<Props> = ({ e, text, type, loading, disabled, className, id, 
    onClick, primary, secondary, tertiary, ...rest }) => {
    return (
        <button 
            type={type && (type || undefined)}
            className={`button ${disabled || loading ? "disable" : ""} 
                ${loading ? "loading" : ""} ${className} ${secondary && "secondary"}
                ${tertiary && "tertiary"}
            `}
            onClick={onClick && onClick}
            id={id}
        >
            <div className="btn-inside">
                <p>{loading ? <Loader/> : text}</p>
            </div>
        </button>
    )
}