// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const transactionHash = await owner.sendTransaction({
    to: "0xa7649aa944b7dce781859c18913c2dc8a97f03e4",
    value: ethers.utils.parseEther("5.0")
  });

  console.log(transactionHash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
