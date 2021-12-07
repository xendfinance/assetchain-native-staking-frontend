import React, {FC, useState, useEffect} from 'react'


interface Props {
    modalChild?: any;
	modalOpen: boolean;
	modalClose?: () => void;
    className?: string;
    closeIcon?: boolean;
    rest?: any;
	logo?: boolean;
	title?: string;
}

export const Modal: FC<Props> = ({modalChild, modalOpen, modalClose, title, className, closeIcon, logo}) => {
    const [modal, setModal] = useState<boolean>(false)
    
    useEffect(() => {
        setModal(modalOpen)
    }, [modalOpen])
	

    return (
        <div
			className={`modal-cont ${!modalOpen && "hidden"}`}
			onClick={() => modalClose && modalClose()}
		>
			<div
				className={`bg-secondary content-cont ${className && className}`}
				onClick={(e) => e.stopPropagation()}
			>
				{(closeIcon || title) && 
					<div className="header">
						<p id="modal-title">{title}</p>
						
						
                    	<img src={'../assets/icons/close.svg'} alt="cancel" id="close-modal" onClick={modalClose}/>
					</div>
				}
				{/* <img src={logoMini} alt="logo" id={`${!logo ? "hide-logo" : "logo-min"}`} /> */}
				<div className={`modal`}>
					{modalOpen && modalChild}
				</div>
			</div>
		</div>
    )
}

