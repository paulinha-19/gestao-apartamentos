exports.floor = (floor) => {
    try {
        const floors = []
        for (let i = 1; i <= floor; i++) {
            floors.push(i)
        }
        return floors
    }
    catch (error) {
        return error.message
    }
}