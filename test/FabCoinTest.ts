import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers"

describe("FabCoin Test", function () {
    let fabCoin:Contract;
    let owner: any;
    let user1: any;
    let user2: any;
    
    beforeEach(async function() {
        // Get the first account as the owner
        [owner, user1, user2] = await ethers.getSigners();
        console.log("\tOwner address\t", await owner.address);

        // Deploy the Asset(SpaceCredit) token
        const FabCoin = await ethers.getContractFactory("FabCoin");
        fabCoin = await FabCoin.deploy();
        
        await fabCoin.mint(user1, 1000);
        await fabCoin.mint(user2, 2000);
        console.log('\tFabCoin Contract deployed at:', await fabCoin.getAddress());
    });

    it("should return the correct user info", async function() {
        await fabCoin.createUser(user1.address, 1000);
        await fabCoin.createUser(user2.address, 2000);

        let user1Info = await fabCoin.getUserInfo(user1.address);
        let user2Info = await fabCoin.getUserInfo(user2.address);
        
        expect(user1Info._coinAmount.toString()).to.equal("1000");
        expect(user2Info._coinAmount.toString()).to.equal("2000");
    });

    it(("should transfer FabCoin amount from user1 to user2"), async function() {
        let user1Amount = await fabCoin.getBalance(user1.address);
        let user2Amount = await fabCoin.getBalance(user2.address);

        console.log("\tuser1 current coin amount ", user1Amount);
        console.log("\tuser2 current coin amount ", user2Amount);

        await fabCoin.transferCoin(user1.address, 500);
        await fabCoin.transferCoin(user2.address, 500);
        
        let user1AfterAmount = await fabCoin.getBalance(user1.address);
        let user2AfterAmount = await fabCoin.getBalance(user2.address);

        console.log("\tuser1 later coin amount ", user1AfterAmount);
        console.log("\tuser2 later coin amount ", user2AfterAmount);
    });

});