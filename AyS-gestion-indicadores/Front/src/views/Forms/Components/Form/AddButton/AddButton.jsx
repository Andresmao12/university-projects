import React, { useEffect, useState } from 'react';
import './AddButton.css';

const AddButton = ({ onClick }) => {
    const [rol, setRol] = useState('');

    // Recuperar el rol del usuario desde localStorage
    useEffect(() => {
        const storedRol = localStorage.getItem('rol');
        if (storedRol) {
            setRol(storedRol);
        }
    }, []);

    return (
        <div className='container-button'>
            {rol === 'admin' && (
                <button className="add-button" onClick={onClick}>
                    +
                </button>
            )}
        </div>
    );
}

export default AddButton;
