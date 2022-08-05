import { task, types } from "hardhat/config";

task("verifyAll", "Verify contract signer")
  .addPositionalParam(
    "contractSignerAddress",
    "Address of the ContractSigner contract",
    undefined,
    types.string,
    false
  )
  .addPositionalParam(
    "ownerAddress",
    "Address of the initial ContractSigner owner",
    undefined,
    types.string,
    false
  )
  .setAction(async ({ contractSignerAddress, ownerAddress }, hre) => {
    try {
      console.log("Verifying ContractSigner contract");
      await hre.run("verify:verify", {
        address: contractSignerAddress,
        constructorArguments: [ownerAddress],
      });
    } catch (e) {
      console.error(e);
    }
  });
