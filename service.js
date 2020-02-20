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
    let sql2 = 'update article set click_times=? where id=?'
    let click_times = results[0].click_times + 1;
    let data2 = [click_times, id];
    db.base(sql2, data2, (results2) => {
      res.json({ status: 0, message: results });
    })
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

//获取图片类别
exports.getCategory = (req, res) => {
  let sql = 'select * from photo_category';
  db.base(sql, null, (results) => {
    res.json({ status: 0, message: results });
  })
}

//按分类获取图片列表
exports.getPhotoList = (req, res) => {
  let id = req.query.categoryId;
  let sql = 'select * from photo';
  if (id != 0) {
    sql = 'select id,title,image_url,abstract from photo where category_id=?';
  }
  let data = [id];
  db.base(sql, data, (results) => {
    res.json({ status: 0, message: results })
  })
}

//获取图片详情
exports.getPhotoDetail = (req, res) => {
  let id = req.query.photoId;
  let sql = 'select * from photo where id=?';
  let data = [id];
  db.base(sql, data, (results) => {
    let sql2 = 'update photo set click_times=? where id=?'
    let click_times = results[0].click_times + 1;
    let data2 = [click_times, id];
    db.base(sql2, data2, (results2) => {
      res.json({ status: 0, message: results });
    })
  })
}

//获取图片详情下的图片列表
exports.getPhotoGroup = (req, res) => {
  let id = req.query.photoId;
  let sql = 'select * from photo_group where photo_id=?';
  let data = [id];
  db.base(sql, data, (results) => {
    res.json({ status: 0, message: results })
  })
}

/* 评论部分可以和资讯评论合并，通过type确定类型 */

//分页获取图片的评论
exports.getPhotoComment = (req, res) => {
  let id = req.query.articleid;
  let pageindex = req.query.pageindex;
  let pagesize = req.query.pagesize || 2;
  let sql1 = 'select count(*) as total from photo_comments where photo_id=?';
  let data1 = [id];
  db.base(sql1, data1, (results1) => {
    let sql2 = 'select * from photo_comments where photo_id=? order by id desc limit ?,?';
    let data2 = [id, (pageindex - 1) * pagesize, parseInt(pagesize)];
    db.base(sql2, data2, (results2) => {
      res.json({ status: 0, message: { total: results1[0].total, data: results2 } })
    })
  })
}

//添加图片评论
exports.addPhotoComment = (req, res) => {
  let data = req.body;
  let addData = {};
  for (let key in data) {
    if (key == "article_id") {
      addData["photo_id"] = data[key];
    } else {
      addData[key] = data[key];
    }
  }
  let sql = 'insert into photo_comments set ?';
  db.base(sql, addData, (results) => {
    if (results.affectedRows == 1) {
      res.json({ status: 0, message: data });
    } else {
      res.json({ status: 1 })
    }
  })
}

//分页获取商品列表
exports.getGoodsList = (req, res) => {
  let pageindex = req.query.pageindex || 1;
  let pagesize = req.query.pagesize || 2;
  let sql1 = 'select id,title,add_time,abstract,click_times,image_url,sell_price,market_price,sold_quantity,stock_quantity from goods order by id desc limit ?,?';
  let data1 = [(pageindex - 1) * pagesize, parseInt(pagesize)];
  db.base(sql1, data1, (results1) => {
    let sql2 = 'select count(*) as total from goods';
    db.base(sql2, null, (results2) => {
      res.json({ status: 0, message: { total: results2[0].total, data: results1 } })
    })
  })
}

//获取商品详情下的轮播图列表
exports.getGoodsSwipe = (req, res) => {
  let id = req.query.goodsId;
  let sql = 'select * from goods_swipe where goods_id=?';
  let data = [id];
  db.base(sql, data, (result) => {
    res.json({ status: 0, message: result })
  })
}

//获取商品详情相关信息
exports.getGoodsDetail = (req, res) => {
  let id = req.query.goodsId;
  let sql = 'select id,title,add_time,abstract,click_times,image_url,sell_price,market_price,sold_quantity,stock_quantity,goods_num from goods where id=?';
  let data = [id];
  db.base(sql, data, (result) => {
    res.json({ status: 0, message: result })
  })
}

//获取商品图文介绍
exports.getGoodsInfo = (req, res) => {
  let id = req.query.goodsId;
  let sql = 'select id,title,info from goods where id=?';
  let data = [id];
  db.base(sql, data, (result) => {
    res.json({ status: 0, message: result })
  })
}

//获取商品详情评论
exports.getGoodsComment = (req, res) => {
  let id = req.query.articleid;

  let pageindex = req.query.pageindex;
  let pagesize = req.query.pagesize || 2;
  let sql1 = 'select count(*) as total from goods_comments where goods_id=?';
  let data1 = [id];
  db.base(sql1, data1, (results1) => {
    let sql2 = 'select * from goods_comments where goods_id=? order by id desc limit ?,?';
    let data2 = [id, (pageindex - 1) * pagesize, parseInt(pagesize)];
    db.base(sql2, data2, (results2) => {
      res.json({ status: 0, message: { total: results1[0].total, data: results2 } })
    })
  })
}

//添加商品评论
exports.addGoodsComment = (req, res) => {
  let data = req.body;
  let addData = {};
  for (let key in data) {
    if (key == "article_id") {
      addData["goods_id"] = data[key];
    } else {
      addData[key] = data[key];
    }
  }
  let sql = 'insert into goods_comments set ?';
  db.base(sql, addData, (results) => {
    if (results.affectedRows == 1) {
      res.json({ status: 0, message: addData });
    } else {
      res.json({ status: 1 })
    }
  })
}