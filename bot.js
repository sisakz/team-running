const { saveWorkout } = require("./db")

exports.getBotAnswer = (message) => {
    if (message) {
        firstChar = message.substring(0,1)
        if (isDigit(firstChar)) {
            const workout = getWorkoutDetails(message)
            saveWorkout(workout)
            return `Congratulation for your workout! Distance: ${workout.distance} km`
        }
        else return "Please send your workout deatils in the following form: distance/time (e.g.: 5.3/29:12)!"
    }
}

const  isDigit = str =>/^\d+$/.test(str)

const getWorkoutDetails = message => {
    let workout = {}
    if (message.includes("/")) {
        messageParts = message.split("/")
        workout.distance = messageParts[0]
        workout.time = messageParts[1]
    }
    else {
        workout.distance = message
        workout.time = ""
    }
    return workout
}
