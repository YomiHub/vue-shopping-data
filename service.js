const db = require('./connetDB');

//可以使用module.exports={}导出
//获取轮播图数据
exports.getSwipe = (req, res) => {
  let sql = 'select * from swipe';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}

//获取资讯列表
exports.getNewsList = (req, res) => {
  let sql = 'select id,title,add_time,abstract,click_times,image_url from article';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}

//获取资讯详情
exports.getNewsDetail = (req, res) => {
  let id = req.query.id;
  let sql = 'select id,title,add_time,click_times,detail from article where id=?';
  let data = [id];
  db.base(sql, data, (results) => {
    res.json({ status: 0, message: results });
  })
}

//分页获取资讯评论列表
exports.getNewsComment = (req, res) => {
  let id = req.query.articleid;
  let pageindex = req.query.pageindex;
  let pagesize = req.query.pagesize || 2;
  let sql1 = 'select count(*) as total from article_comments where article_id=?';
  let data1 = [id];
  db.base(sql1, data1, (results1) => {
    let sql2 = 'select * from article_comments where article_id=? order by id desc limit ?,?';
    let data2 = [id, (pageindex - 1) * pagesize, parseInt(pagesize)];
    db.base(sql2, data2, (results2) => {
      res.json({ status: 0, message: { total: results1[0].total, data: results2 } })
    })
  })
}

//添加评论
exports.addComment = (req, res) => {
  let data = req.body;
  let sql = 'insert into article_comments set ?';
  db.base(sql, data, (results) => {
    if (results.affectedRows == 1) {
      res.json({ status: 0, message: data });
    } else {
      res.json({ status: 1 })
    }
  })
}