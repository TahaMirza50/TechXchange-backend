const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/Auth.middleware');
const reportController = require('../Controllers/Report.controller');

router.post('/new', authMiddleware.authenticateUser, reportController.createReport);

router.get('/admin/get', authMiddleware.authenticateAdmin, reportController.getAllReportsByAdmin);

router.delete('/admin/delete/:reportId', authMiddleware.authenticateAdmin, reportController.deleteReport);

router.patch('/admin/update/:reportId', authMiddleware.authenticateAdmin, reportController.reviewReport);

module.exports = router