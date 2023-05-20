// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract FU3 is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    string[10] uris = [
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/1.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/2.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/3.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/4.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/5.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/6.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/7.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/8.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/9.json",
        "https://gateway.pinata.cloud/ipfs/QmPdEwjNdPr9yvommNmy87CvdoDiB9Kr3jpKGZVJM9XfjC/10.json"
    ];
    Counters.Counter private _tokenIdCounter;
    address private EPNS_COMM_ADDRESS;
    address payable admin;
    uint256 public tid;
    uint256 mintPrice;
    string initialProps = "001001001001001001001001001001001001";
    //ritm,shoot,pass,dodge,defense,physic,stretch,stop,reflex,keeperSpeed,kick,positioning
    mapping(uint256 => string) private playerInfo;
    event LogBytes32(bytes32 value);
    constructor() ERC721("FU3", "FU3") {
        EPNS_COMM_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
        mintPrice = 0.00001 ether;
        admin = payable(msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint8 _avatarIndex)
        external
        payable
    {
        require(msg.value == mintPrice, "Price must be the asking one");
        (bool success, ) = admin.call{value: msg.value}("");
        require(success, "Payment did not proceed");
        safeMint(msg.sender, uris[_avatarIndex], initialProps);
    }

    function safeMint(
        address _to,
        string memory uri,
        string memory _player
    ) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, uri);
        playerInfo[tokenId] = _player;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //Player's Functions
    function readProperties(uint256 _tokenId)
        external
        view
        returns (string memory)
    {
        require(
            _isApprovedOrOwner(_msgSender(), _tokenId),
            "Caller must be the Token owner"
        );
        return playerInfo[_tokenId];
    }

    //Functions called by Owner to modify player stats
    function editPlayerStats(
        uint256 _tokenId,
        string memory _player,
        bytes memory _signature
    ) external whitelisted(msg.sender, _tokenId, _player, _signature) {
        modifyPlayerStats(_tokenId, _player, msg.sender);
    }

    function modifyPlayerStats(
        uint256 _tokenId,
        string memory _player,
        address _sender
    ) internal {
        require(   
            _isApprovedOrOwner(_sender, _tokenId),
            "Function Caller must be the Token owner"
        );
        playerInfo[_tokenId] = _player;
    }

    modifier whitelisted(
        address _sender,
        uint256 _tokenId,
        string memory _player,
        bytes memory _signature
    ) {
        emit LogBytes32(getMessageHash(_sender, _tokenId, _player));
        require(
            verify(_sender, _tokenId, _player, _signature) == true,
            "No permission granted"
        );
        _;
    }
    function printSignature (
        address _to,
        uint256 _tokenId,
        string memory _player
    ) external pure returns (bytes32) {
        return getMessageHash(_to, _tokenId, _player );
    }
    function printAddressSign (
        address _to,
        uint256 _tokenId,
        string memory _player,
        bytes memory _signature
    ) external pure returns (address) {
       bytes32 messageHash = getMessageHash(_to, _tokenId, _player);
       return recoverSigner(messageHash, _signature);
    }
    function verify(
        address _to,
        uint256 _tokenId,
        string memory _player,
        bytes memory signature
    ) internal view returns (bool) {
        bytes32 messageHash = getMessageHash(_to, _tokenId, _player);
        return recoverSigner(messageHash, signature) == owner();
    }
    function getMessageHash(
        address _to,
        uint256 _tokenId,
        string memory _player
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    _tokenId,
                    _to,
                    _player
                )
            );
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) internal pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        (bytes32 _r, bytes32 _s, uint8 _v) = splitSignature(_signature);
        bytes32 prefixedHashMessage = keccak256(
            abi.encodePacked(prefix, _ethSignedMessageHash)
        );
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return (r, s, v);
    }
}
