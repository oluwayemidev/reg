const express = require('express');
const database = require('./scripts/database')

const app = express();

app.use(express.static('./public'))

app.post('/signedup', database, (req, res) => {
    const { uname } = req.body
    if(uname){
        return res.status(200).send(`Welcome ${uname}`)
    }
    res.status(401).send('Please Provide Credentials')
})

app.all('*', (req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
  })

app.listen(3000, () => {
  console.log('server started');
});
