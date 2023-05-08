// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FU3 is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("FU3", "FU3") {}

    struct Player {
        uint8 ritm;
        uint8 shoot;
        uint8 pass;
        uint8 dodge;
        uint8 defense;
        uint8 physic;
        uint8 stretch;
        uint8 stop;
        uint8 reflex;
        uint8 keeperSpeed;
        uint8 kick;
        uint8 positioning;
    }   
    //mappint PlayerNFT ID with player properties
    mapping (uint256 => Player) private playerInfo;
    mapping (uint256 => bool) private allowed;
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri, Player memory _player) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
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

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    //Player's Functions
    function readProperties (uint256 _tokenId) external view returns (Player memory) {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller must be the Token owner");
        return playerInfo[_tokenId];
    } 
    //Functions called by Owner to approve modify player stats
    function editPlayerStats (uint256 _tokenId, Player memory _player, address _sender) public onlyOwner{
        modifyPlayerStats(_tokenId, _player, _sender);
    }
    function modifyPlayerStats (uint256 _tokenId, Player memory _player, address _sender) internal {
        require(_isApprovedOrOwner(_sender, _tokenId), "Caller must be the Token owner");
        playerInfo[_tokenId] = _player;
    }
}