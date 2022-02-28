const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express();
const { body, validationResult } = require('express-validator')
const { check } = require('express-validator');
const path = require('path')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('', (req, res) => {
    res.render('index')
})

app.post('/signedup', 
    body('email').isEmail(),
    body('email').normalizeEmail(),
    // password must be at least 8 chars long
    check('passkey')
        // body('passkey').isLength({ min: 8 })
        .isLength({ min: 5 })
        .withMessage('must be at least 8 chars long')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .matches(/\d/)
        .withMessage('must contain a number'),
    database,
    body('confirmkey').custom((value, { req }) => {
    if (value !== req.body.passkey) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
    (req, res) => {
        
    var fname = req.body.fname

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).jsonp({ errors: errors.array() })

            const alert = errors.array()
            res.render('signuped', {
                alert
            })
    }



    
    
    if(fname){
        return res.status(200).send(`Welcome ${fname}`)
    }
    res.status(401).send('Please Provide Credentials')
})

app.all('*', (req, res) => {    
    res.status(404).send("<h1>Page not found</h1>")
  })

app.listen(3000, () => {
  console.log('server started')
});
