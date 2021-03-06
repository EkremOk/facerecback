
const handleRegister = (req,res,db,bcrypt) => {

  const {email, name, password} = req.body;

  if( !email || !name || !password) {
    return res.status(400).json('incorrect form submission...')
  }

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .insert({
          email: loginEmail[0],
          name: name,
          joind: new Date()
        })
        .returning('*')
        .then(user => res.json(user[0]))
        .catch(err => console.log('unable to register'))  
    })
  .then(trx.commit)
  .catch(trx.rollback)
})
.catch(err => res.status(400).json('uneble to register'));
}

module.exports = {
  handleRegister: handleRegister
};