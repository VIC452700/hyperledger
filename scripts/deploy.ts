import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("wallet address:", await owner.getAddress());

  // Set up the factory for the contract you want to deploy
  const FabCoin = await ethers.getContractFactory("FabCoin");
  const fabCoin = await FabCoin.deploy();
  
  console.log('FabCoin Contract deployed at:', await fabCoin.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});