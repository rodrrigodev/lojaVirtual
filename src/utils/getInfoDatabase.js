const fs = require('fs')

const path = require('path')

function getInfoDatabase(fileName){
    const filePath = path.join(__dirname, '..' , 'database' , `${fileName}.json`)
    const readFromFile =  fs.readFileSync(filePath, 'utf-8')
    const result = JSON.parse(readFromFile)
    return result
}

module.exports = getInfoDatabase


