const router = require('express').Router();
const DB = require('../helpers/user-helper')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') //PRODUCE TOKEN step 1


const secret = 'the moon landing was a hoax' //PRODUCE TOKEN step 2


function generateToken(user) { //PRODUCE TOKEN step 3
    const payload = {
        subject: user.id , //sub in payload is what the token is about
        username: user.username,
        //other data
    };

    const options = {
        expiresIn: "1d",

    }

    return jwt.sign(payload, secret, options)
}


function restricted(req, res, next) {
    const token = req.headers.authorization
    
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "You are not authorized" })
            } else {
                next();
            }
        })
        
    } else {
        res.status(401).json({ message: "You need token to log in" })
    }
    
}


router.get('/users', restricted,(req,res) => {
   DB
       .getUser()
       .then(user => {
           res.status(200).json(user)
       })
       .catch(error => {
           res.status(400).json({
               error: "couldnt get user"
           })
       })
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash;

    DB
    .add(user)
    .then(saved => {
        const token = generateToken(saved);
        res.status(201).json({...saved , token})
    })
    .catch(error => {
        res.status(500).json({error})
    })

})

router.post('/login', (req, res) => {
    let { username, password} = req.body;

    DB
    .getBy({username})
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            
            const token = generateToken(user); //PRODUCE TOKEN step 4

            res.status(200).json({ message: `Welcome ${user.username}`, token }) //PRODUCE TOKEN step 5
        } else {
            res.status(401).json({ 
                message: 'YOU SHALL NOT PASS' 
             })
        }
    })
    .catch( error => {
        res.status(500).json(error)
    })
})


router.get('/logout', (req, res) => {
    if (token) {
        token.destroy(err => {
            if (err) {
                res.status(500).json({ message: 'Logout failed' })
            } else {
                res.status(200).json({ message: 'Bye, thanks for visiting' })
            }
        })
    } else {
        res.status(200).json({ message: "Bye, thanks for visiting" })
    }
})

module.exports = router;

// Q 1: How to automatically give api/users an authorization header w token passed in
// Q 2: How to destroy token in logout