import React, {useContext} from 'react'
import WelcomeComponent from "./WelcomeComponent"
import {LanguageContext} from "../../../context/LanguageContext"

const WelcomeContainer = () => {

    const {text} = useContext(LanguageContext)

    return (
        <>
            <WelcomeComponent text={text}/>
        </>
    )
}

export default WelcomeContainer
