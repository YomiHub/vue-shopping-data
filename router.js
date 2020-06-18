const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  //允许跨域请求
  res.setHeader("Access-Control-Allow-Methods", "*");
  //response.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader("Access-Control-Expose-Headers", "*");

  //axios发送post请求时，会先发送options请求，请求通过才会发送post
  if (req.method == "OPTIONS") {
    res.status(200).send('{"test": "options ok"}');
    return;
  }
  next();
})

router.get('/getSwipe', service.getSwipe);
router.get('/getNewsList', service.getNewsList);
router.get('/getNewsDetail', service.getNewsDetail);
router.get('/getNewsComment', service.getNewsComment);

router.post('/addComment', service.addComment);
router.get('/getCategory', service.getCategory);
router.get('/getPhotoList', service.getPhotoList);
router.get('/getPhotoDetail', service.getPhotoDetail);
router.get('/getPhotoGroup', service.getPhotoGroup);
router.get('/getPhotoComment', service.getPhotoComment);
router.post('/addPhotoComment', service.addPhotoComment);

router.get('/getGoodsList', service.getGoodsList);
router.get('/getGoodsSwipe', service.getGoodsSwipe);
router.get('/getGoodsDetail', service.getGoodsDetail);
router.get('/getGoodsInfo', service.getGoodsInfo);
router.get('/getGoodsComment', service.getGoodsComment);
router.post('/addGoodsComment', service.addGoodsComment);

router.get('/getGoodsCarList', service.getGoodsCarList);
router.get('/getGoodsByKey', service.getGoodsByKey);
module.exports = router;