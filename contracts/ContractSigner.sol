//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IContractSigner.sol";

/// @notice A smart contract for signing legal contracts on chain
contract ContractSigner is IContractSigner, Ownable {
    /// @notice Deploys the contract & sets an initial owner
    /// @param _owner The address of the initial contract owner
    constructor(address _owner) {
        _transferOwnership(_owner);
    }

    function sign(bytes32 _hash) external onlyOwner {
        emit ContractSigned(owner(), _hash);
    }
}
