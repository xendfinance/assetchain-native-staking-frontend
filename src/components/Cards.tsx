import { Button } from 'components'
import { url } from 'inspector'
import React from 'react'

interface Props {
    type?: string;
    apy?: number;
    buttonText?: string;
    action?: () => void;
    backgroundImage?: string;
    backgroundColor?: string;
}

export const PackagesCard = ({type, apy, buttonText, action, backgroundImage, backgroundColor}: Props) => {
    return (
        <div className="package-card" style={{backgroundImage: `url(${backgroundImage && backgroundImage})`, background: backgroundColor}}>
            <p className="card-type">{type} Package</p>
            <p className="card-apy">
                {apy}%
                <span id="apy">APY</span>
            </p>
            {console.log("image oo-", backgroundImage)}
            <Button
                type="button"
                text={buttonText}
                tertiary
                className="card-btn"
                onClick={() => action && action() }
            />
        </div>
    )
}
