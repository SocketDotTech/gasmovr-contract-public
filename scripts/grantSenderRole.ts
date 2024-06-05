// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const GasMovrFactory = await ethers.getContractFactory("GasMovr");
  const gasMovr = GasMovrFactory.attach("0x555A64968E4803e27669D64e349Ef3d18FCa0895")

  const grantTx = await gasMovr.grantSenderRole("0x58Daefe2A4224966535dfbBca1f3c90D09919c2D")
  console.log(grantTx)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
