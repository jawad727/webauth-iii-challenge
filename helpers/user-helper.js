

const db = require('../data/dbConfig')

module.exports = {
    getUser,
    add,
    getby
};

function getUser() {
    return db('user');
}


function getById(id) {
    return db('user').where({ id }).first()
}


function getby(filter) {
    return db('user').where(filter).first()
}


function add(user) {
    return db('user')
    .insert(user)
    .then(ids => {
        return getById(ids[0])
    })
}


