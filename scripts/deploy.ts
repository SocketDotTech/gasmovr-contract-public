// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import * as fs from 'fs';
import { limits } from "./limits"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const GasMovr = await ethers.getContractFactory("Refuel");
  const gasmovrDeploy = await GasMovr.deploy();
  console.log("Deploy tx hash: ", gasmovrDeploy.deployTransaction.hash)

  const networkDetails = await gasmovrDeploy.provider.getNetwork();

  console.log("GasMovr deployed to:", gasmovrDeploy.address);

  const routeInitialisation = await gasmovrDeploy.addRoutes(limits[gasmovrDeploy.deployTransaction.chainId]);

  console.log("Initialised with routes", routeInitialisation);

  fs.readFile('./addresses/address.json', 'utf8', function readFileCallback(err, data) {

    if (err) {
      console.log(err);
    }

    else {
      let object = JSON.parse(data); //now it an object

      object.addresses.push(
        {
          "chainID": gasmovrDeploy.deployTransaction.chainId,
          "address": gasmovrDeploy.address
        }
      );

      let json = JSON.stringify(object, null, 4);

      fs.writeFile('./addresses/address.json', json, 'utf8', () => {
        console.log('Successfully updated')
      });

    }
  }
  )

  console.log("Run the following command for Etherscan verification: \n \n \n", `npx hardhat verify --network ${networkDetails.name} ${gasmovrDeploy.address}  \n \n \n`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
