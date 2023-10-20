const express = require('express');
const TaskController = require('./controllers/TaskController');

const router = express.Router();

router.get('/suppliers', TaskController.getSupplier);
router.get('/purchase-order', TaskController.getPurchaseOrder);
router.post('/docket/create', TaskController.createDocket);
router.get('/dockets', TaskController.getDocket);

module.exports = {router};