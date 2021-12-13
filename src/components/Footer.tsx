import React from 'react'

interface Props {
    
}

export const Footer = (props: Props) => {
    const openGithub = () => {
       
          window.open('https://github.com/xendfinance/xStake-FrontEnd', "_blank");  
          return;
      }

    return (
        <footer>
            <p id="copy">
                Copyright &copy; Xend Finance {new Date().getFullYear()}. All rights reserved.
            </p>
            <ul className="foot-menu">
                <li className="foot-list">About</li>
                <li className="foot-list" onClick={()=>openGithub() }>Github</li>
            </ul>
        </footer>
    )
}
