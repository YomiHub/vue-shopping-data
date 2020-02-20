const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  //允许跨域请求
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
module.exports = router;