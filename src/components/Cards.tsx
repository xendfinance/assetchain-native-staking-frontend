import { Button } from 'components'
import { url } from 'inspector'
import React from 'react'

interface Props {
    type?: string;
    apy?: number;
    limit:any;
    buttonText?: string;
    action?: () => void;
    backgroundImage?: string;
    backgroundColor?: string;
    id?: string;
    address?:any;
    totalStakedInCategory?:any;
}

const renderColor = (type:any) => {
    switch(type) {
      case 'Seria A':
       return 'orange-bg';
      case 'Seria B':
       return 'blue-bg';
      case 'Seria X':
       return 'black-bg';
      default:
        return 'orange-bg';
    }
  }

export const PackagesCard = ({totalStakedInCategory,limit,type, apy, buttonText, action, backgroundImage, backgroundColor, id,address}: Props) => {
   
    return (
        <div className={`package-card ${
            renderColor(type)
        }`} 
        
        style={{backgroundImage: `url(${backgroundImage})`, background: backgroundColor}}>
            <p className="card-type">{type}</p>
            <p className="card-type">{limit} XEND Limit</p>
            <p className="card-type">{totalStakedInCategory} XEND Currently Staked</p>
            <p className="card-apy">
                {apy}%
                <span id="apy">APR</span>
            </p>           
            <Button
                type="button"
                text={buttonText}
                tertiary
                className="card-btn"
                onClick={address ? () => action && action() : undefined  }                
            />
        </div>
    )
}
