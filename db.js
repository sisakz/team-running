const sqlite3 = require('sqlite3')

exports.initDatabase =  () => {
    const db = new sqlite3.Database('team-running.sqlite')
    db.exec(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, webexId, createdAt DATETIME, updatedAt DATETIME);'
      )
    db.exec(
        'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, userId INTEGER, distance REAL, time INTEGER, createdAt DATETIME, updatedAt DATETIME);'
    )
}
