/*
* @title GasToken.sol - ERC20 token
* @author onaboat
* @notice For testing purposes 
* @dev mint and burn functions
* @dev Mint set to 1000000
*/

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract GasToken is ERC20, ERC20Burnable {
    constructor() ERC20("GasToken", "GTK") {}

    function mint(address to) public  {
        _mint(to, 1000000);
    }
}