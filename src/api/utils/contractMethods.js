// api/utils/contractMethods.js

const contract = require("./contractHandler");

async function mintCertificate(name, course, date, issuer, validUntilDate) {
    try {
        const validUntilTimestamp = Math.floor(new Date(validUntilDate).getTime() / 1000);
        let tx = await contract.mintCertificate(name, course, date, issuer, validUntilTimestamp);
        let receipt = await tx.wait();

        if (receipt && receipt.logs) {
            const event = contract.interface.parseLog(receipt.logs[0]);
            const tokenId = event.args[2].toString();
            return tokenId;
        } else {
            throw new Error("Minting receipt didn't contain expected logs");
        }
    } catch (error) {
        console.error(`Error occurred while minting: ${error.message}`);
        throw error;
    }
}

async function verifyCertificate(tokenId) {
    try {
        return await contract.verifyCertificate(tokenId);
    } catch (error) {
        console.error(`Error occurred during verification: ${error.message}`);
        throw error;
    }
}

async function getCertificateDetails(tokenId) {
    try {
        return await contract.getCertificateDetails(tokenId);
    } catch (error) {
        console.error(`Error occurred while fetching details: ${error.message}`);
        throw error;
    }
}

module.exports = {
    mintCertificate,
    verifyCertificate,
    getCertificateDetails
};
