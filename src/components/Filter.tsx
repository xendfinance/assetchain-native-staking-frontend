import React from 'react'

interface Props {
    className?: string;
    options?: any;
    value?: string | number;
    name?: string;
    onChange?: (e: any) => void;
    label?: string | HTMLElement | JSX.Element;
    asterik?: boolean;
    subLabel?: string;
    id?: string;
    marginButtom?: boolean;
    defaultValue?: number | string;
}

export const Filter = (
    {className, options, name, defaultValue, onChange, id, label,
     value, asterik, subLabel}: Props) => {

    return (
        <div className={`filter ${className && className}`} >
            {/* {label && <label >{label}</label>} */}
            <div className="label-box">
                    {label && 
                        <div className={`text-primary label ${className && className}`} >
                            {label} 
                            <span className={asterik ? "asterik" : "hide"}> * </span>
                        </div>
                    }
                    {subLabel && 
                        <p className={`sub-label ${className && className}`}>
                            {subLabel}
                        </p> 
                    }
                </div>
            <select 
                className={`bg-primary select ${className && className}`}
                name={name} id={id} 
                onChange={onChange}
            >
                {options?.map((item: any, i: any) => (
                    <option key={i} defaultValue={defaultValue} value={item.value} id={id}>
                        {item.label}
                    </option>
                ))}
            </select>

        </div>
    )
}
