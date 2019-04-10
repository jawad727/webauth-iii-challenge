const router = require('express').Router();

const DB = require('../helpers/user-helper')

const bcrypt = require('bcryptjs')



router.get('/users', (req,res) => {
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
        res.status(201).json(saved)
    })
    .catch(error => {
        res.status(500).json({error})
    })

})

router.post('/login', (req, res) => {
    let { username, password} = req.body;

    DB
    .getby({username})
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}` })
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


module.exports = router;
