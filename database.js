let bcrypt = require('bcrypt')
const database = (req, res, next) => {
    const mysql = require('mysql')

    const con = mysql.createConnection({
        host: "mysql-70101-0.cloudclusters.net",
        port: "17018",
        localAddress: "172.107.32.116",
        user: "admin",
        password: "FQ7S3A25",
        database: "registered"
    })

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var fname = req.body.fname
        var email = req.body.email
        var passkey = req.body.passkey
        var confirmkey = req.body.confirmkey
        console.log(fname, passkey, confirmkey, email)
        
        bcrypt.hash(passkey, 10, function(err, hash){
            var sql = "INSERT INTO users (fname, email, passkey) VALUE ?"

            var value = [
                [`${fname}`, `${email}`, `${hash}`]
            ]
    
            con.query(sql, [value], function (err, result){
                if(err) throw err
                console.log("1 record added")
            })
        }) 
        next()
        

        // var sql = `INSERT INTO users WHERE (uname, passkey) VALUES ("${uname}", "${passkey}"`
        
        // con.query(sql, [value], function (err, result) {
        //   if (err) throw err
        //   console.log("Number of records inserted: " + result.affectedRows)
        // })
        
      })
}

module.exports = database