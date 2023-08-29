# CertificateNFT API

The CertificateNFT API is a Node.js application that allows users to mint, verify, and retrieve details of certificates on the Ethereum blockchain. The certificates are represented as NFTs (Non-Fungible Tokens) and are stored on the Ethereum blockchain.

## Features

- **Mint Certificate**: Create a new certificate NFT with details like name, course, date, issuer, and validity date.
- **Verify Certificate**: Check if a certificate with a given token ID is valid.
- **Get Certificate Details**: Retrieve the details of a certificate using its token ID.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd certificatenft
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Update the `config.json` file with your Ethereum private key, Infura project ID, Infura API secret, and contract address.

2. Ensure that the ABI for your smart contract is located at `smartcontract/builds/compiledContract.json`.

### Running the API

To start the API server, run:

```bash
npm start
```

The server will start on `http://localhost:5223`.

## API Endpoints

- **Mint Certificate**:
  - **Endpoint**: `/api/mintCertificate`
  - **Method**: `POST`
  - **Body**:
    - `name`: Name of the certificate holder.
    - `course`: Course or certification title.
    - `date`: Date of issuance.
    - `issuer`: Issuer of the certificate.
    - `validUntilDate`: Date until which the certificate is valid.

- **Verify Certificate**:
  - **Endpoint**: `/api/verifyCertificate/:tokenId`
  - **Method**: `GET`

- **Get Certificate Details**:
  - **Endpoint**: `/api/getCertificateDetails/:tokenId`
  - **Method**: `GET`

## Dependencies

The project uses several npm packages:

- `@openzeppelin/contracts`: For Ethereum smart contract interactions.
- `body-parser`: To parse incoming request bodies.
- `cors`: To enable CORS.
- `ethers`: For Ethereum wallet and contract interactions.
- `express`: Web server framework.
- `fs`: File system operations.
- `path`: Path operations.
- `solc`: Solidity compiler.

## Author

- **enigma1**

## License

This project is licensed under the ISC License.
