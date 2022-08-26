const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/data')

router.post('/datas', dataCtrl.createThing)
router.get('/', dataCtrl.getAllData)

module.exports = router
