/*
* @title GasNFT.sol - ERC721 NFT token
* @author onaboat
* @notice For testing purposes 
* @dev mint and burn functions
* @dev MAX NFT per address is 5
* @dev Auto incremented NFT token
* @dev toalActiveTokens is a counter to keep track of the total number of active tokens
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GasNft is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public totalActiveTokens;

    uint256 public constant MAX_NFT_PER_ADDRESS = 5;

    constructor() ERC721("GasNft", "GNFT") {}


    function safeMint(address to) public {
        require(balanceOf(to) < MAX_NFT_PER_ADDRESS, "NFT limit reached for address");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        totalActiveTokens ++; // Increment the total number of active tokens
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public override {
        totalActiveTokens --; // Decrement the total number of active tokens
        super.burn(tokenId);
    }


    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function activeTokens() public view returns (uint256) {
        return totalActiveTokens;
    }
}