import React, {useContext, useEffect, useRef, useState} from 'react'
import {AuthComponent} from "./AuthComponent"
import {AuthContext} from "../../../context/AuthContext"
import {useMessage} from "../../../hooks/message.hook"
import {useHttp} from "../../../hooks/http.hook"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {getUser} from "../../../redux/users-reducer"
import {LanguageContext} from "../../../context/LanguageContext"
import {CurrentLanguageContext} from "../../../context/CurrentLanguageContext"

const userName = 'userName'

const AuthContainer = (props) => {

    const auth = useContext(AuthContext)
    const {text} = useContext(LanguageContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [isSettings, setIsSettings] = useState(false)

    const [isLogIn, setIsLogin] = useState(true)
    const modalSettings = useRef()
    const buttonSettings = useRef()
    const {changeLanguage} = useContext(LanguageContext)
    const {currentLanguage, setCurrentLanguage} = useContext(CurrentLanguageContext)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const [form] = useForm()

    const onReset = () => {
        form.resetFields()
    }


    const closeSettingsWindow = event => {
        if (modalSettings.current) {
            if (!buttonSettings.current.contains(event.target) && !modalSettings.current.contains(event.target)) {
                setIsSettings(false)
            }
        }
    }

    const setSetting = () => {
        !!isSettings ? setIsSettings(false) : setIsSettings(true)
    }

    useEffect(() => {
        window.addEventListener("mousedown", event => closeSettingsWindow(event))
        return window.removeEventListener("mousedown", event => closeSettingsWindow(event))
    }, [])

    const onChangeLanguage = e => {
        setCurrentLanguage(e.target.value)
        localStorage.setItem('currentLanguage', JSON.stringify(e.target.value))
        setIsSettings(false)
    }

    useEffect(() => {
        window.M.updateTextFields()
    })

    const registerHandler = async (values) => {
        try {
            if (values.passwordRepeat === values.password) {
                const data = await request('api/auth/signup', 'POST', {
                    name: values.name, surname: values.surname, email: values.email, username: values.username,
                    password: values.password
                })
                message(data.message)
                const dataLogin = await request('api/auth/signin', 'POST', {
                    name: '', surname: '', email: '', username: values.username, password: values.password
                })
                auth.login(dataLogin.token, dataLogin.id)
                props.getUser(dataLogin)
                sessionStorage.setItem(userName, JSON.stringify({
                    userName: dataLogin
                }))
            } else {
                message(text("authPage.signup.dontMatch"))
            }

        } catch (e) {
        }
        onReset()
    }

    const loginHandler = async (values) => {
        try {
            const data = await request('api/auth/signin', 'POST', {
                name: '', surname: '', email: '', username: values.username, password: values.password
            })
            auth.login(data.token, data.id)
            message(data.message)
            props.getUser(data)
            sessionStorage.setItem(userName, JSON.stringify({
                userName: data
            }))
        } catch (e) {
        }
        onReset()
    }

    useEffect(() => {
        changeLanguage(currentLanguage)
    }, [currentLanguage])

    return (
        <>
            <AuthComponent isLogIn={isLogIn} setIsLogin={setIsLogin} form={form} registerHandler={registerHandler}
                           loginHandler={loginHandler} text={text} isSettings={isSettings}
                           setSetting={setSetting} modalSettings={modalSettings} buttonSettings={buttonSettings}
                           onChangeLanguage={onChangeLanguage} currentLanguage={currentLanguage}/>
        </>
    )
}

export default compose(
    connect(null, {getUser})
)(AuthContainer)

