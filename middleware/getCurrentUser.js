const user = require("../model/user");

function getUser(req, res) {
  let user_id = req.params.id;

  user.findOne({ _id: user_id }, (err, user) => {
    if (err) {
      return res.json(err);
    }

    return res.json(user);
  });
}
module.exports = getUser;
