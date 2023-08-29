const express = require('express');
const router = express.Router();
const certificatesController = require('../controllers/certificates');

router.post('/mintCertificate', certificatesController.mint);
router.get('/verifyCertificate/:tokenId', certificatesController.verify);
router.get('/getCertificateDetails/:tokenId', certificatesController.getDetails);

module.exports = router;
