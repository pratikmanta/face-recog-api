const profile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user)
            }
            else {
                res.status(404).json('user not found')
            }
        })
        .catch(err => console.log('error getting user'))
}

module.exports = {
    profile:profile
}
