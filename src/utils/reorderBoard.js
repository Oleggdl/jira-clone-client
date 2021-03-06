// a little function to help us with reordering the result
const reorderBoard = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const reorderColumnMap = ({boardMap, source, destination}) => {
    const current = [...boardMap[source.droppableId]]
    const next = [...boardMap[destination.droppableId]]
    const target = current[source.index]

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorderBoard(current, source.index, destination.index)
        const result = {
            ...boardMap,
            [source.droppableId]: reordered
        }
        return {
            boardMap: result
        }
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1)
    // insert into next
    next.splice(destination.index, 0, target)

    const result = {
        ...boardMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    }

    return {
        boardMap: result
    }
}
