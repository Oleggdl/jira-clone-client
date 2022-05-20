import {createContext} from "react"

function nullFunc() {}

export const TaskContext = createContext({
    isTaskInfo: false,
    setIsTaskInfo: nullFunc()
})
