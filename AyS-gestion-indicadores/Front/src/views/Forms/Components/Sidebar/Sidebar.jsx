import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

import { permissions } from '../../../../utils/helpers/constants';

const Sidebar = () => {
    const navigate = useNavigate();
    const [rol, setRol] = useState('');
    const [userName, setUserName] = useState('')

    // Recuperar el rol del usuario desde localStorage
    useEffect(() => {
        const storeUserName = JSON.parse(localStorage.getItem('usuario')).email
        const storedRol = localStorage.getItem('rol');
        if (storedRol) setRol(storedRol);
        if (storeUserName) setUserName(storeUserName)
    }, []);

    const handleCerrarSesion = () => {
        navigate('/');
        window.localStorage.clear();
    };

    const menuItems = permissions[rol] || [];

    return (
        <div className="sidebar">

            <div className="sidebar-header">
                <img src="https://i.imgur.com/wkZcKwI.png" alt="user image" className='userImg' />
                <h2>{userName}</h2>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-menu-item" onClick={() => navigate('/formularios/consultas')}>
                    Consultas
                </li>
                {menuItems.map((item, index) => (
                    <li key={`${item}-${index}`} className="sidebar-menu-item" onClick={() => navigate(`/formularios/${item}`)}>
                        {item}
                    </li>
                ))}

                <li className='sidebar-menu-item exit' onClick={handleCerrarSesion}>
                    Cerrar Sesion
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
