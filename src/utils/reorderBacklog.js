const reorderBacklog = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export default reorderBacklog

export const reorderSprintMap = ({sprintMap, source, destination}) => {
    const current = [...sprintMap[source.droppableId]]
    const next = [...sprintMap[destination.droppableId]]
    const target = current[source.index]

    if (source.droppableId === destination.droppableId) {
        const reordered = reorderBacklog(current, source.index, destination.index)
        const result = {
            ...sprintMap,
            [source.droppableId]: reordered
        }
        return {
            sprintMap: result
        }
    }

    current.splice(source.index, 1)
    next.splice(destination.index, 0, target)

    const result = {
        ...sprintMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    }

    return {
        sprintMap: result
    }
}
