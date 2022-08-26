const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/data')

router.post('/datas', dataCtrl.createThing)

module.exports = router
