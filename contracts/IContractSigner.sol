//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

/// @notice A smart contract for signing legal contracts on chain
interface IContractSigner {
    event ContractSigned(address indexed owner, bytes32 indexed hash);

    function sign(bytes32 _hash) external;
}
