import React, {useEffect, useState} from "react"
import './App.scss'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/redux-store"
import {useRoutes} from "./routes"
import NavbarContainer from "./components/common/Navbar/NavbarContainer"
import {AuthContext} from "./context/AuthContext"
import {useAuth} from "./hooks/auth.hook"
import 'materialize-css'
import {LanguageContext} from "./context/LanguageContext"
import {useTranslation} from "react-i18next"
import {CurrentLanguageContext} from "./context/CurrentLanguageContext"

function App() {

    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const [currentLanguage, setCurrentLanguage] = useState('')

    useEffect(() => {
        setCurrentLanguage(JSON.parse(localStorage.getItem('currentLanguage'))
            ? JSON.parse(localStorage.getItem('currentLanguage')) : 'en')
    }, [])

    const {t, i18n} = useTranslation()
    const changeLanguage = language => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
                <LanguageContext.Provider value={{text: t, changeLanguage}}>
                    <CurrentLanguageContext.Provider value={{currentLanguage: currentLanguage, setCurrentLanguage}}>
                        <BrowserRouter>
                            <Provider store={store}>
                                {isAuthenticated && <NavbarContainer/>}
                                <div className="container">
                                    {routes}
                                </div>
                            </Provider>
                        </BrowserRouter>
                    </CurrentLanguageContext.Provider>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default App
