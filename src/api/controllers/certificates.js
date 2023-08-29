const { mintCertificate, verifyCertificate, getCertificateDetails } = require('../utils/contractMethods');

exports.mint = async (req, res) => {
    try {
        const { name, course, date, issuer, validUntilDate } = req.body;
        const tokenId = await mintCertificate(name, course, date, issuer, validUntilDate);
        res.json({ success: true, tokenId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.verify = async (req, res) => {
    try {
        const { tokenId } = req.params;
        const isValid = await verifyCertificate(tokenId);
        res.json({ success: true, isValid });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getDetails = async (req, res) => {
    try {
        const { tokenId } = req.params;
        const details = await getCertificateDetails(tokenId);
        res.json({ 
            success: true, 
            name: details[0],
            course: details[1],
            date: details[2],
            issuer: details[3]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
