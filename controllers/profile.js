const handleProfile = (req, res, db) => {
  const { id } = req.params;
  
  db.select('*').from('users').where('id', Number(id)).then(user=> {
    if(user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json('no found user');
    }}
    )
  .catch(err => res.status(404).json('err getting user'))
  }

  module.exports = {
    handleProfile: handleProfile
  }