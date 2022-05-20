import {useCallback, useEffect, useState} from "react"

const storageName = 'userData'
const userName = 'userName'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        sessionStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        sessionStorage.removeItem(storageName)
        sessionStorage.removeItem(userName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}
