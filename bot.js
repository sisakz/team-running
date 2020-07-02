const { saveWorkout, getStatistic, resetWorkouts } = require("./db")

exports.getBotAnswer = async (message) => {
    let answer
    if (message) {
        message = message.replace("team-running-bot","")
        message = message.replace("team-running","")
        message = message.trim()
        firstChar = message.substring(0,1)
        if (isDigit(firstChar)) {
            const workout = getWorkoutDetails(message.replace(",","."))
            await saveWorkout(workout)
            const sumOfDistance = await getStatistic()
            answer = `Congratulation to your workout! Distance: ${workout.distance} km. Team result: ${sumOfDistance} km`
        }
        else switch(message.split(" ")[0]) {
            case "reset":
                await resetWorkouts()
                answer = `All workouts were deleted from the datase.`
                break
            case "set":
                await resetWorkouts()
                const newTeamDistance = message.split(" ")[1].replace(",",".")
                const workout = getWorkoutDetails(newTeamDistance)
                await saveWorkout(workout)
                answer = `All workouts were deleted from the datase. Team result was set to: ${newTeamDistance} km`
                break
            case "help":
                answer = `Hi Guys! I am Cisco XO Team Running Bot. I am happy to assist your team to count your team result. Please mention me in your message with your workout distance! (e.g.: @team-running-bot 5.3 or @team-running-bot 5,3)!`
                break
            case "status":
                const sumOfDistance = await getStatistic()
                answer = `Team result: ${sumOfDistance} km`
                break
            default: 
                answer="Please send your workout distance! (e.g.: 5.3 or 5,3)!"
        }
        return answer
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
