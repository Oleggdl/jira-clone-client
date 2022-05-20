import React from 'react'
import SideBarContainer from "../../common/SideBar/SideBarContainer"
import {Route, Routes} from "react-router-dom"
import BoardContainer from "../../Board/BoardComponent/BoardContainer"
import BacklogContainer from "../../Backlog/BacklogComponent/BacklogContainer"

const ScrumComponent = ({
                            sprintsMap, updateTaskSprints, unsetTaskSprintsHandler, sprints, updateSprintsHandler,
                            columnMap, columns
                        }) => {
    return (
        <>
            <SideBarContainer updateTaskSprints={updateTaskSprints}/>
            <Routes>
                <Route path='board' element={<BoardContainer columnMap={columnMap} columns={columns}/>}/>
                <Route path='backlog' element={<BacklogContainer initial={sprintsMap} sprints={sprints}
                                                                 updateTaskSprints={updateTaskSprints}
                                                                 unsetTaskSprintsHandler={unsetTaskSprintsHandler}
                                                                 updateSprintsHandler={updateSprintsHandler}/>}/>
            </Routes>
        </>
    )
}

export default ScrumComponent
