import { task } from "hardhat/config";

task("deploy", "Deploy contracts")
  .addParam("owner", "The initial owner of the contract")
  .setAction(async (taskArgs, hre) => {
    const contractSignerFactory = await hre.ethers.getContractFactory(
      "ContractSigner"
    );
    const contractSignerInstance = await contractSignerFactory.deploy(
      taskArgs.owner
    );
    await contractSignerInstance.deployed();

    console.log(`Contract Signer deployed to ${hre.network.name}`);
    console.log(
      `In transaction: ${contractSignerInstance.deployTransaction.hash}`
    );
    console.log(`to contract address: ${contractSignerInstance.address}`);
  });
