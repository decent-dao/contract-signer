import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractSigner, ContractSigner__factory } from "../typechain";

describe("ContractSigner", function () {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let owner2: SignerWithAddress;
  let anon: SignerWithAddress;
  let contractSigner: ContractSigner;

  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Decent Dawgs"));

  beforeEach(async function () {
    [deployer, owner, owner2, anon] = await ethers.getSigners();
    // Deploy ContractSigner contract
    contractSigner = await new ContractSigner__factory(deployer).deploy(
      owner.address
    );
  });
  it("Deploys with the correct owner", async function () {
    expect(await contractSigner.owner()).to.eq(owner.address);
  });
  it("The owner can transfer ownership to a new owner", async function () {
    await contractSigner.connect(owner).transferOwnership(owner2.address);

    expect(await contractSigner.owner()).to.eq(owner2.address);
  });
  it("A non-owner cannot transfer ownership to a new owner", async function () {
    await expect(
      contractSigner.connect(anon).transferOwnership(anon.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
  it("The owner can call sign", async function () {
    const tx = await contractSigner.connect(owner).sign(hash);

    const block = await ethers.provider.getBlock("latest");

    await expect(tx)
      .to.emit(contractSigner, "ContractSigned")
      .withArgs(owner.address, hash, block.timestamp);
  });
  it("A non-owner cannot call sign", async function () {
    await expect(contractSigner.connect(anon).sign(hash)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
