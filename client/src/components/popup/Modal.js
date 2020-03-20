import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'


const Modal = props => {

    return ReactDOM.createPortal(
        <div className='ui dimmer modals page transition visible active' onClick={props.onDismiss}>
            <div onClick={(e) => e.stopPropagation()}
                 className='ui standard test modal  active'>
                <div className='header'>{props.title}</div>
                <div className='content'>{props.content}</div>
                <div className='actions'>
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('.modal')
    );


};

export default Modal