exports.getBotAnswer = (message) => {
    if (message) {
        firstChar = message.substring(0,1)
        if (isDigit(firstChar)) 
            return "Congratulation for your workout!"
        else
            return "Please send your workout deatils in the following form: distance/time (e.g.: 5.3/29:12)!"
    }
}

const  isDigit = str =>/^\d+$/.test(str)
