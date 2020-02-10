const db = require('./connetDB');

exports.getSwipe = (req, res) => {
  let sql = 'select * from swipe';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}