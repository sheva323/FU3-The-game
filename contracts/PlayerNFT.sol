// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract FU3 is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // EPNS COMM ADDRESS ON ETHEREUM goerli, CHECK THIS: https://docs.epns.io/developers/developer-tooling/epns-smart-contracts/epns-contract-addresses
    //Goerli
    address private EPNS_COMM_ADDRESS;


    constructor() ERC721("FU3", "FU3") {
        EPNS_COMM_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    }

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
    //mapping PlayerNFT ID with player properties
    
    mapping (uint256 => Player) private playerInfo;
    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri, Player calldata _player) public onlyOwner {
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

    //Functions called by Owner to modify player stats
    function editPlayerStats (uint256 _tokenId, Player memory _player, address _sender) public onlyOwner{
        modifyPlayerStats(_tokenId, _player, _sender);
    }
    function modifyPlayerStats (uint256 _tokenId, Player memory _player, address _sender) internal {
        require(_isApprovedOrOwner(_sender, _tokenId), "Function Caller must be the Token owner");
        playerInfo[_tokenId] = _player;
        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x4EEe90A694935018609190490DF345b283897df4, // from channel
            _sender, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                    abi.encodePacked(
                        "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        "+", // segregator
                        "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                        "+", // segregator
                        "Player has been improved !", // this is notificaiton title
                        "+", // segregator
                        "Your NFT received an upgrade of properties ! " // notification body
                    )
                )
            )
        );
    }
}
