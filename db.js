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

exports.saveWorkout = (workout) => {
  const db = new sqlite3.Database('team-running.sqlite')
  let sql = `INSERT INTO workouts (distance)`;
  db.run(`INSERT INTO workouts (distance) VALUES(?)`, [workout.distance], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })
  db.close()
}

exports.getStatistic = () => {
  const db = new sqlite3.Database('team-running.sqlite')
  let sql = `SELECT SUM(distance) as sumOfDistances FROM workouts
           `;

  db.get(sql, [], (err, row) => {
    if (err) {
      throw err
    }
    console.log(row.sumOfDistances);
    let sumOfDistances = row.sumOfDistances
    db.close()
    return sumOfDistances
  })

  // close the database connection
  
}