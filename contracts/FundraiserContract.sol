// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnonymousBadge is ERC721, Ownable {
    uint256 private totalTokens;
    mapping(uint => bool) burnedTokens;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mint(address _to) external onlyOwner {
        require(_to != address(0), "Invalid address");
        totalTokens++;
        _safeMint(_to, totalTokens);
    }

    function burnToken(uint tokenId) external onlyOwner {
        burnedTokens[tokenId] = true;
        _burn(tokenId);
    }
}