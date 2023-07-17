import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children, bg, width }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (

        <div class="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.4)] p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
            <div className='relative w-full h-full  '>
                <div ref={modalRef} className={`absolute top-[50%] right-[50%] ${bg ? bg : "bg-gray-600 "} ${width ? width : null}   -translate-x-[-50%] translate-y-[-50%] rounded-md `}>
                    {
                        children
                    }
                </div>
            </div>
        </div>


    );
};

export default Modal;
