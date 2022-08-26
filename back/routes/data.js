const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/data')

router.post('/datas', dataCtrl.createThing)
router.get('/', dataCtrl.getAllData)
router.delete('/:id', dataCtrl.deleteData);

module.exports = router
