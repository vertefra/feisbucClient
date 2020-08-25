import React from 'react'

const Modal = (props) => {

    const { closeBtn } = props.handlers

    const customHandlers = props.handlers.buttons
    
    const handleCloseModal = (e) => {
        e.preventDefault()
        const modal = document.querySelector('.modal')
        modal.style.display = 'None'
    }

    return(
        <div className="modal">
            <div className="content-box">
                <h1>{props.message}</h1>
                <footer>
                    {
                        closeBtn && 
                            <button
                                className="button-secondary modal-button"
                                onClick={handleCloseModal}
                            >
                            close
                            </button>
                    }
                    {        
                        customHandlers.length > 0 &&
                            customHandlers.map(handler=>{
                                return(
                                    <button
                                        className="button-secondary modal-button"
                                        onClick={handler.action}
                                    >
                                    {handler.label}    
                                    </button>
                                )
                            })       
                    }
                </footer>
            </div>
        </div>
    )
}

export default Modal