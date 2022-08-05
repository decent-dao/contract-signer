# ContractSigner

## Running Tests
To run the tests for the token and staking contracts, in the terminal run:
```
npx hardhat test
```

## Deploying and Verifying contracts
To deploy the contracts:
1) Create a copy of the .env.example file, rename it to .env
2) Update private keys and URLs in the .env file for the networks being deployed to
3) Update the .env file with an Etherscan API key for contract verification
4) Run the deploy task, and specify the network:
```
npx hardhat deploy --owner 0x346658f99924B8Cfe8b6A2418070192385848CA9 --network goerli  
``` 
5) Verify the contracts on Etherscan using the verifyAll task. The first address is the ContractSigner address returned in the previous step. The second address is the Owner address passed in the previous step:
```
npx hardhat verifyAll 0x434B6fA2D3Bc464f3577E1a1076e30A50c6dBc27 0x346658f99924B8Cfe8b6A2418070192385848CA9 --network goerli
```
