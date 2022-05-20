import axios from "axios"

const instance = axios.create({
    withCredentials: false,
    baseURL: `http://localhost:8080/jira-clone`,
})

export const projectsAPI = {
    createProject(data, headers) {
        return instance.post(`scrum/projects`, data, {headers: headers})
    },
    updateProject(id, data, headers) {
        return instance.put(`scrum/projects/${id}`, data, {headers: headers})
    },
    addSupervisor(id, userId, headers) {
        return instance.put(`scrum/projects/supervisor/${id}/${userId}`, null, {headers: headers})
    },
    getProjects(headers) {
        return instance.get(`scrum/projects`, {headers: headers})
    },
    getProjectById(id, headers) {
        return instance.get(`scrum/userScrumProject/${id}`, {headers: headers})
    },
    searchProjects(query, userId, headers) {
        return instance.get(`scrum/userScrumProject/search/${userId}?projectName=${query}`, {headers: headers})
    },
    deleteProject(id, userId, headers) {
        return instance.delete(`scrum/projects/${id}/${userId}`, {headers: headers})
    },
}

export const userScrumProjectAPI = {
    createUserScrumProject(data, headers) {
        return instance.post(`scrum/userScrumProject`, data, {headers: headers})
    },
    getUserScrumProject(userId, headers) {
        return instance.get(`/scrum/userScrumProject/forUsers/${userId}`, {headers: headers})
    },
    isUserProjectExist(userId, projectId, headers) {
        return instance.get(`/scrum/userScrumProject/isExist/${userId}/${projectId}`, {headers: headers})
    },
    getUserScrumProjectFavorite(userId, headers) {
        return instance.get(`/scrum/userScrumProject/forUsers/favorite/${userId}`, {headers: headers})
    },
    putUserScrumProject(userScrumProjectId, userId, projectId, userRoleId, headers) {
        return instance.put(`scrum/userScrumProject/${userScrumProjectId}/${userId}/${projectId}/${userRoleId}/`,
            null, {headers: headers})
    },
    deleteUserScrumProject(id, headers) {
        return instance.delete(`scrum/userScrumProject/${id}`, {headers: headers})
    }
}

export const tasksAPI = {
    createTask(data, headers) {
        return instance.post(`scrum/tasks`, data, {headers: headers})
    },
    putTask(taskId, creatorId, executorId, headers) {
        return instance.put(`scrum/tasks/${taskId}/${creatorId}/${executorId}`, null, {headers: headers})
    },
    putTaskNotExecutor(taskId, creatorId, headers) {
        return instance.put(`scrum/tasks/not_executor/${taskId}/${creatorId}`, null, {headers: headers})
    },
    updateTaskDescription(taskId, data, headers) {
        return instance.put(`scrum/tasks/description/${taskId}`, data, {headers: headers})
    },
    updateTaskName(taskId, data, headers) {
        return instance.put(`scrum/tasks/name/${taskId}`, data, {headers: headers})
    },
    getTasks(headers) {
        return instance.get(`scrum/tasks`, {headers: headers})
    },
    getTaskById(id, headers) {
        return instance.get(`scrum/tasks/${id}`, {headers: headers})
    },
    getUsersOnProject(projectId, headers) {
        return instance.get(`/scrum/userScrumProject/usersOnProject/${projectId}`, {headers: headers})
    },
    deleteTask(id, userId, projectId, headers) {
        return instance.delete(`/scrum/tasks/${id}/${userId}/${projectId}`, {headers: headers})
    },
    changeTaskPriority(id, data, headers) {
        return instance.put(`/scrum/tasks/priority/${id}`, data, {headers: headers})
    },
    changeTaskExecutor(id, data, headers) {
        return instance.put(`/scrum/tasks/executor/${id}`, data, {headers: headers})
    }
}

export const sprintsAPI = {
    createSprint(data, headers) {
        return instance.post(`scrum/sprints`, data, {headers: headers})
    },
    getSprints(projectId, headers) {
        return instance.get(`scrum/sprints/project/${projectId}`, {headers: headers})
    },
    createSprintWithProject(sprintId, projectId, headers) {
        return instance.put(`scrum/sprints/project/${sprintId}/${projectId}`, null, {headers: headers})
    },
    startSprint(data, id, headers) {
        return instance.put(`scrum/sprints/${id}`, data, {headers: headers})
    },
    updateSprint(data, id, headers) {
        return instance.put(`scrum/sprints/settings/${id}`, data, {headers: headers})
    },
    getStartedSprint(projectId, headers) {
        return instance.get(`scrum/sprints/startedSprint/${projectId}`, {headers: headers})
    },
    deleteSprint(id, headers) {
        return instance.delete(`scrum/sprints/${id}`, {headers: headers})
    }
}

export const taskSprintAPI = {
    createTaskSprint(data, headers) {
        return instance.post(`scrum/taskSprint`, data, {headers: headers})
    },
    createTaskSprintPut(taskSprintId, sprintId, taskId, headers) {
        return instance.put(`scrum/taskSprint/${taskSprintId}/${sprintId}/${taskId}`, null, {headers: headers})
    },
    getTaskSprints(sprintId, headers) {
        return instance.get(`scrum/taskSprint/${sprintId}`, {headers: headers})
    },
    deleteTaskSprints(taskSprintId, headers) {
        return instance.delete(`scrum/taskSprint/${taskSprintId}`, {headers: headers})
    },
    startSprintColumn(taskSprintId, columnId, headers) {
        return instance.put(`scrum/taskSprint/${taskSprintId}/${columnId}`, null, {headers: headers})
    },
    moveTaskSprintToSprint(taskSprintId, sprintId, headers) {
        return instance.put(`scrum/taskSprint/updateSprint/${taskSprintId}/${sprintId}`, null, {headers: headers})
    },
    changeIndexBoardTaskSprint(taskSprintId, index, headers) {
        return instance.put(`scrum/taskSprint/indexInBoard/${taskSprintId}/${index}`, null, {headers: headers})
    },
    getTaskSprintForColumn(sprintId, columnId, headers) {
        return instance.get(`scrum/taskSprint/${sprintId}/${columnId}`, {headers: headers})
    },
    getTaskSprintForProject(projectId, headers) {
        return instance.get(`scrum/taskSprint/forProject/${projectId}`, {headers: headers})
    }

}

export const columnsAPI = {
    createColumn(data, headers) {
        return instance.post(`scrum/columns`, data, {headers: headers})
    },
    createColumnPut(columnId, sprintId, headers) {
        return instance.put(`scrum/columns/${columnId}/${sprintId}`, null, {headers: headers})
    },
    getColumns(headers) {
        return instance.get(`scrum/columns`, {headers: headers})
    },
    deleteColumnScrum(id, headers) {
        return instance.delete(`scrum/columns/${id}`, {headers: headers})
    },
    getColumnsForSprint(sprintId, headers) {
        return instance.get(`scrum/columns/${sprintId}`, {headers: headers})
    },
}

export const commentsScrumAPI = {
    createCommentScrum(data, headers) {
        return instance.post(`scrum/commentsScrum`, data, {headers: headers})
    },
    getCommentsScrum(taskId, headers) {
        return instance.get(`scrum/commentsScrum/task/${taskId}`, {headers: headers})
    },
    createCommentScrumForTask(commentId, userId, taskId, headers) {
        return instance.put(`scrum/commentsScrum/user/${commentId}/${userId}/${taskId}`, null, {headers: headers})
    },
    updateCommentScrum(id, data, headers) {
        return instance.put(`scrum/commentsScrum/${id}`, data, {headers: headers})
    },
    deleteCommentsScrum(id, headers) {
        return instance.delete(`scrum/commentsScrum/${id}`, {headers: headers})
    },
}

export const backlogAPI = {
    createBacklogElement(data, headers) {
        return instance.post(`scrum/backlog`, data, {headers: headers})
    },
    getBacklogElements(headers) {
        return instance.get(`scrum/backlog`, {headers: headers})
    },
    deleteBacklogElement(id, headers) {
        return instance.delete(`scrum/backlog/${id}`, {headers: headers})
    },
    uniteBacklogProjectTask(backlogId, taskId, projectId, headers) {
        return instance.put(`scrum/backlog/${backlogId}/${taskId}/${projectId}`, null, {headers: headers})
    },
    getBacklogForProject(projectId, headers) {
        return instance.get(`scrum/backlog/tasks/${projectId}`, {headers: headers})
    },
    searchTask(query, projectId, headers) {
        return instance.get(`scrum/backlog/search/${projectId}?taskName=${query}`, {headers: headers})
    }
}

export const marksAPI = {
    createMark(data, headers) {
        return instance.post(`scrum/marksScrum`, data, {headers: headers})
    },
    uniteMarkTask(markId, taskId, headers) {
        return instance.put(`scrum/marksScrum/tasks/${markId}/${taskId}`, null, {headers: headers})
    },
    getMarkScrumForTask(taskId, headers) {
        return instance.get(`scrum/marksScrum/task/${taskId}`, {headers: headers})
    },
    deleteMarkScrum(id, headers) {
        return instance.delete(`scrum/marksScrum/${id}`, {headers: headers})
    }
}

export const emailAPI = {
    addColleague(data, emailFrom, userType, headers) {
        return instance.post(`email/add_user/${emailFrom}/${userType}`, data, {headers: headers})
    }
}
