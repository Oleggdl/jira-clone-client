import {createContext} from "react"

function nullFunc() {}

export const CurrentLanguageContext = createContext({
    currentLanguage: '',
    setCurrentLanguage: nullFunc
})
