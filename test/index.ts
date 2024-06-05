import { expect } from "chai";
import { ethers } from "hardhat";
import { limits } from "../scripts/limits"

describe("GasMovr", function () {
  let gasmovrDeploy: any;

  before(async () => {
    const GasMovr = await ethers.getContractFactory("GasMovr");
    gasmovrDeploy = await GasMovr.deploy();
    await gasmovrDeploy.deployed();
  })

  describe("Getting donations", function () {
    it("Donation event should trigger", async function () {
      const [owner] = await ethers.getSigners();
      const originalBalance = await ethers.provider.getBalance(owner.address);

      expect(
        await owner.sendTransaction({
          from: owner.address,
          to: gasmovrDeploy.address,
          value: ethers.utils.parseEther('1') // 1000000000000000000
        })
      ).to.emit(gasmovrDeploy, 'Donation').withArgs(owner.address, '1000000000000000000');

    })
  })

  describe("Initialising contract with routes", function () {
    it("Adding route", async function () {
      const [owner] = await ethers.getSigners();
      const chainLimits = limits[137][1];

      await gasmovrDeploy.addRoutes(limits[137]); // Assuming we're initialising Polygon

      const res = await gasmovrDeploy.getChainData(chainLimits.chainId);

      expect(res.minAmount).to.equal(chainLimits.minAmount);
      expect(res.maxAmount).to.equal(chainLimits.maxAmount);
      expect(res.chainId).to.equal(chainLimits.chainId);
      expect(res.isEnabled).to.equal(chainLimits.isEnabled);
    })

  })

  describe("Deposit", function () {
    it("It should deposit some ether", async function () {

      const [owner] = await ethers.getSigners();
      const originalContractBalance = await ethers.provider.getBalance(gasmovrDeploy.address);
      const originalOwnerBalance = await ethers.provider.getBalance(owner.address);

      // Depositing 10 tokens to send to xDAI (100)
      await gasmovrDeploy.depositNativeToken(100, owner.address, { value: '10000000000000000000' })

      expect(await ethers.provider.getBalance(gasmovrDeploy.address)).to.above(originalContractBalance);

      expect(await ethers.provider.getBalance(owner.address)).to.below(originalOwnerBalance);

      // Depositing emits Deposit event
      expect(await gasmovrDeploy.depositNativeToken(100, owner.address, { value: '10000000000000000000' })).to.emit(gasmovrDeploy, 'Deposit').withArgs(owner.address, '10000000000000000000', 100);
    })
  });

  describe("Min, Max, isEnabled change", function () {
    it("Change min and max", async function () {
      const NEW_MIN_AMOUNT = '10000000000000000';
      const NEW_MAX_AMOUNT = '100000000000000000';

      const [owner] = await ethers.getSigners();

      await gasmovrDeploy.setMinAmount(100, NEW_MIN_AMOUNT);
      await gasmovrDeploy.setMaxAmount(100, NEW_MAX_AMOUNT);

      const chainData = await gasmovrDeploy.getChainData(100);

      expect(chainData.minAmount).to.equal(NEW_MIN_AMOUNT);
      expect(chainData.maxAmount).to.equal(NEW_MAX_AMOUNT);
    })

    it("Change isEnabled", async function () {
      const chainData = await gasmovrDeploy.getChainData(100);
      const isEnabled = await chainData.isEnabled;

      await gasmovrDeploy.setIsEnabled(100, !isEnabled);

      const updatedChainData = await gasmovrDeploy.getChainData(100)

      expect(updatedChainData.isEnabled).to.equal(!isEnabled);
    })
  })

  describe("Withdrawal by owner", function () {
    let originalContractBalance: any;

    it("Owner adds liquidity", async function () {
      const [owner] = await ethers.getSigners();

      await owner.sendTransaction({
        from: owner.address,
        to: gasmovrDeploy.address,
        value: ethers.utils.parseEther('1')
      })

      originalContractBalance = await ethers.provider.getBalance(gasmovrDeploy.address);

      expect(await ethers.provider.getBalance(gasmovrDeploy.address)).to.above('1000000000000000000');
    })

    it("Owner withdraws", async function () {
      const [owner] = await ethers.getSigners();

      const ownerBalance = await ethers.provider.getBalance(owner.address);

      await gasmovrDeploy.withdrawBalance();

      expect(await ethers.provider.getBalance(gasmovrDeploy.address)).to.equal('0');
      expect(await ethers.provider.getBalance(owner.address)).to.above(ownerBalance);


    })

  })

})