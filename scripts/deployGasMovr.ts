// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const GasMovr = await ethers.getContractFactory("Refuel");
  const gasmovrDeploy = await GasMovr.deploy();
  await gasmovrDeploy.deployed()
  console.log(gasmovrDeploy.deployTransaction.hash)

  const networkDetails = await gasmovrDeploy.provider.getNetwork();
  console.log("Run the following command for Etherscan verification: \n \n \n", `npx hardhat verify --network ${networkDetails.name} ${gasmovrDeploy.address}  \n \n \n`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
