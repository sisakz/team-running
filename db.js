const sqlite3 = require('sqlite3')

exports.initDatabase = () => {
  const db = new sqlite3.Database('team-running.sqlite')
  db.exec(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, webexId, createdAt DATETIME, updatedAt DATETIME);'
  )
  db.exec(
    'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, userId INTEGER, distance REAL, time INTEGER, createdAt DATETIME, updatedAt DATETIME);'
  )
}

exports.saveWorkout = (workout) => new Promise((resolve, reject) => {
  const db = new sqlite3.Database('team-running.sqlite')
  let sql = `INSERT INTO workouts (distance)`;
  db.run(`INSERT INTO workouts (distance) VALUES(?)`, [workout.distance], function (err) {
    if (err) {
      reject(err.message)
    }
    resolve()
    db.close()
  })
})

exports.getStatistic = () => new Promise((resolve, reject) => {
  const db = new sqlite3.Database('team-running.sqlite')
  let sql = `SELECT SUM(distance) as sumOfDistances FROM workouts`
    db.get(sql, [], (err, row) => {
    if (err) {
      reject(err.message)
    }
    let sumOfDistances = row.sumOfDistances
    db.close()
    resolve(sumOfDistances)
  })
})

  // close the database connection
  
  exports.resetWorkouts = (workout) => new Promise((resolve, reject) => {
    const db = new sqlite3.Database('team-running.sqlite')
    let sql = `DELETE FROM workouts`;
    db.run(sql, [], function (err) {
      if (err) {
        reject(err.message)
      }
      console.log(`Reset workouts`);
      resolve()
      db.close() 
    })
  })

