const db = require('./connetDB');

exports.getSwipe = (req, res) => {
  let sql = 'select * from swipe';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}

exports.getNewsList = (req, res) => {
  let sql = 'select id,title,add_time,abstract,click_times,image_url from article';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}

exports.getNewsDetail = (req, res) => {
  let id = req.query.id;
  let sql = 'select id,title,add_time,click_times,detail from article where id=?';
  let data = [id];
  db.base(sql, data, (results) => {
    res.json({ status: 0, message: results });
  })
}