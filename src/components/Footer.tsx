import React from 'react'

interface Props {
    
}

export const Footer = (props: Props) => {
    const openGithub = () => {
       
          window.open('https://github.com/xendfinance', "_blank");  
          return;
      }

    return (
        <footer>
            <p id="copy">
                Copyright &copy; Asset Chain {new Date().getFullYear()}. All rights reserved.
            </p>
            <ul className="foot-menu">
                <li className="foot-list">About</li>
                <li className="foot-list" onClick={()=>openGithub() }>Github</li>
            </ul>
        </footer>
    )
}
