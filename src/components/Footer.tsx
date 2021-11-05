import React from 'react'

interface Props {
    
}

export const Footer = (props: Props) => {
    return (
        <footer>
            <p id="copy">
                Copyright &copy; Xend Finance {new Date().getFullYear()}. All rights reserved.
            </p>
            <ul className="foot-menu">
                <li className="foot-list">About</li>
                <li className="foot-list">Docs</li>
                <li className="foot-list">Github</li>
            </ul>
        </footer>
    )
}
