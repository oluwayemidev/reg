let bcrypt = require('bcrypt')
const database = (req, res, next) => {
    const mysql = require('mysql')

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "S1u2n3n4y5",
        database: "mydb"
    })

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var uname = req.body.uname
        var passkey = req.body.passkey
        console.log(uname, passkey)

        // password encryption
        bcrypt.hash(passkey, 10, function(err, hash){
            var sql = "INSERT INTO users (uname, passkey) VALUE ?"

            var value = [
                [`${uname}`, `${hash}`]
            ]
    
            con.query(sql, [value], function (err, result){
                if(err) throw err
                console.log("1 record added")
            })
        })
        
        

        // var sql = `INSERT INTO users WHERE (uname, passkey) VALUES ("${uname}", "${passkey}"`
        
        // con.query(sql, [value], function (err, result) {
        //   if (err) throw err
        //   console.log("Number of records inserted: " + result.affectedRows)
        // })
        next()
      })
}

module.exports = database