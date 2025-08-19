import React from 'react'
import './SearchButton.css'


export default function SearchButton({ onClick }) {
    return (
        <div className='container-button'>
            <button className="add-button" onClick={onClick}>
                🔎
            </button>
        </div>
    )
}
