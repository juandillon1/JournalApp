import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture" style={{
                backgroundSize: 'cover', backgroundImage: 'url("https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg")'
                }}>
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">Una nueva Palmera</p>
                <p className="journal__entry-content">Esto es un texto que contiene una oración para hacer pruebas buenas en reactJS espero que te guste.</p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
