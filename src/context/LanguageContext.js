import {createContext} from "react"

function nullFunc() {}

export const LanguageContext = createContext({
    text: null,
    changeLanguage: nullFunc
})
