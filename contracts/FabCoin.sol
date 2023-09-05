// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ERC20} from "./ERC20.sol";

contract FabCoin is ERC20 {
    struct User {
        address _address;
        uint256 _coinAmount;
    }

    mapping(address => User) userData;

    constructor() ERC20("FabCoin", "FBC", 18) {
        uint256 _totalSupply = 1000000000 * 10 ** 18;
        _mint(msg.sender, _totalSupply);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function createUser(address userAddress, uint256 coinAmount) public {
        User storage newUser = userData[userAddress];
        newUser._address = userAddress;
        newUser._coinAmount = coinAmount;
    }

    function getUserInfo(
        address userAddress
    ) public view returns (User memory) {
        User storage user = userData[userAddress];
        return user;
    }

    function transferCoin(address to, uint256 coinAmount) public {
        approve(to, coinAmount);
        transfer(to, coinAmount);
    }

    function getBalance(address userAddress) public view returns (uint256) {
        return this.balanceOf(userAddress);
    }
}
