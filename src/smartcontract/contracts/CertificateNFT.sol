// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract DigitalCertificate is ERC721Enumerable, AccessControl, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Define a new role identifier for our certificate minters
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Struct for Certificate details
    struct Certificate {
        string name;
        string course;
        string date;
        string issuer;
        uint256 validUntil; // UNIX timestamp for when the certificate is valid until
    }

    // Mapping from token ID to certificate details
    mapping(uint256 => Certificate) private _certificates;

    constructor() ERC721("DigitalCertificate", "DCERT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }
    
    function _generateTokenId() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty)));
    }


    function mintCertificate(
        string memory name,
        string memory course,
        string memory date,
        string memory issuer,
        uint256 validUntilTimestamp
    )
        external onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        uint256 newTokenId = _generateTokenId();

        // Ensure that the newTokenId is unique
        while (_exists(newTokenId)) {
            newTokenId = _generateTokenId();
        }

        _safeMint(msg.sender, newTokenId);  // Mint to the sender's address
        _certificates[newTokenId] = Certificate(name, course, date, issuer, validUntilTimestamp);
        return newTokenId;
    }



    function isCertificateValid(uint256 tokenId) external view returns (bool) {
        require(_exists(tokenId), "Token ID does not exist");
        Certificate memory cert = _certificates[tokenId];
        return (block.timestamp <= cert.validUntil);
    }
    


    function getCertificateDetails(uint256 tokenId) external view returns (string memory, string memory, string memory, string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        Certificate memory cert = _certificates[tokenId];
        return (cert.name, cert.course, cert.date, cert.issuer);
    }

    function verifyCertificate(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    // Functions to manage minters
    function addMinter(address minterAddress) external onlyOwner {
        grantRole(MINTER_ROLE, minterAddress);
    }

    function removeMinter(address minterAddress) external onlyOwner {
        revokeRole(MINTER_ROLE, minterAddress);
    }

    function supportsInterface(bytes4 interfaceId) 
        public view virtual 
        override(ERC721Enumerable, AccessControl) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }

}
