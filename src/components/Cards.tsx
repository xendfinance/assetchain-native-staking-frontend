import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from '@material-ui/core';
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
    categoryId?:any;
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

export const PackagesCard = ({totalStakedInCategory,categoryId,limit,type, apy, buttonText, action, backgroundImage, backgroundColor, id,address}: Props) => {


    const showInfoInWIKI = (categoryId: any) => {
      if(categoryId == 0){
        window.open('https://en.wikipedia.org/wiki/Nelson_Mandela', "_blank");
        return;
        
      }

      if(categoryId == 1){
        window.open('https://en.wikipedia.org/wiki/Mansa_Musa', "_blank");     
        return;
      }

      if(categoryId ==2){
        window.open('https://en.wikipedia.org/wiki/C._Odumegwu_Ojukwu', "_blank");  
        return;
      }
    }
   
    return (
        <div className={`package-card ${
            renderColor(type)
        }`} 
        
        style={{backgroundImage: `url(${backgroundImage})`, background: backgroundColor}}>
               <Tooltip
                title='Learn more'
                placement="top"
                >  
                <div style={{cursor:"pointer"}} onClick={() => showInfoInWIKI(categoryId)}>
                <span className="card-type">{type}</span><QuestionCircleOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
                </div>
                </Tooltip>
                <p className="card-apy">
                {apy}%
                <span id="apy">APR</span>
            </p>
            <p className="card-type-desc">Limit:</p>  
            <p className="card-type">{limit} XEND</p>
            <p className="card-type-desc">Currently Staked:</p>  
            <p className="card-type">{totalStakedInCategory} XEND</p>
                  
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
