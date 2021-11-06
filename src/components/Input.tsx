import React, { FC } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string | HTMLElement | JSX.Element;
    subLabel?: string;
    inputLabel?: any;
    className?: string;
    asterik?: boolean;
    id?: string;
    phone?: boolean;
    SuffixComponent?: string | HTMLElement | JSX.Element;
    prefixComponent?: string | HTMLElement | JSX.Element;
}


export const Input: FC<InputProps> = ({ name, label, subLabel, SuffixComponent, prefixComponent, asterik, className, id, phone, ...rest }) => {
    return (
        <div className={`input-box ${className && className}`} id={id}>
            <div className="head-box">
                <div className="label-box">
                    {label && 
                        <div className={`text-primary label ${className && className}`} >
                            {label} 
                            <span className={asterik ? "asterik" : "hide"}> * </span>
                        </div>
                    }
                    {subLabel && 
                        <p className={`text-secondary sub-label ${className && className}`}>
                            {subLabel}
                        </p> 
                    }
                </div>
            </div>
               {/* {phone && <p id="code">+123</p>} */}

            <div className={`input-cont ${className && className}`}>
                <input 
                    name={name} 
                    {...rest} 
                    className={`input ${className && className}`} 
                    id={id }
                />
                {SuffixComponent && <div className="suffix">{SuffixComponent}</div> }
            </div>
                
        </div>
    );
};