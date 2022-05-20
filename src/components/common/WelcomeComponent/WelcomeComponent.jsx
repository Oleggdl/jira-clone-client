import React from 'react'
import './WelcomeComponent.scss'

const WelcomeComponent = ({text}) => {

    return (
        <>
            <h2 className="welcome-title">{text("welcomeComponent.title")}</h2>
            <p className="welcome-text">{text("welcomeComponent.text")}</p>
        </>
    )
}

export default WelcomeComponent
