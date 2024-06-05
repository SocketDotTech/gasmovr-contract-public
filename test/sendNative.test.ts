import { expect, should } from 'chai'
import { BigNumber, Contract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";
import { limits } from "../scripts/limits"

should();

const BOB_SRC_TX = "0xe2d21a92bc107fb84b66e576bb195aeecea2e79f1e61fd4e6913809456f81b6f";
const CHARLIE_SRC_TX = "0xd41b7b9eb96768eb728122dc1b59142976fb377f121df7072d81e17b9c0a0919";
const DAVID_SRC_TX = "0x301a927ba7f740d36e6a8fe03c1073c4618442058404bebe5a1f506d3c11f3ac";

describe("Send Native", function () {
  let GasMovrFactory: ContractFactory;
  let gasMovr: Contract;
  let admin: Signer;
  let alice: Signer;
  let bob: Signer;
  let charlie: Signer;
  let david: Signer;

  const deployGasMovr = async () => {
    gasMovr = await GasMovrFactory.connect(admin).deploy();
    await gasMovr.connect(admin).addRoutes(limits[31337]);
  }

  const checkSenderRole = async (account: Signer, expectedRole: boolean) => {
    const hasRole: boolean = await gasMovr.senders(account.getAddress());
    hasRole.should.eq(expectedRole);
  }

  before(async () => {
    GasMovrFactory = await ethers.getContractFactory("GasMovr");
    [admin, alice, bob, charlie, david] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    before(deployGasMovr);

    it("Deployer should have sender role", async () => await checkSenderRole(admin, true));
    it("Alice not should have sender role", async () => await checkSenderRole(alice, false));
    it("Bob not should have sender role", async () => await checkSenderRole(bob, false));
  });

  describe("Admin Actions", () => {
    before(deployGasMovr);

    it("Admin should be able to grant sender role to alice", async () => {
      await gasMovr.connect(admin).grantSenderRole(alice.getAddress());
    });

    it("Alice should have sender role", async () => await checkSenderRole(alice, true));

    it("Admin should be able to grant sender role to bob", async () => {
      await gasMovr.connect(admin).grantSenderRole(bob.getAddress());
    });

    it("Alice should have sender role", async () => await checkSenderRole(alice, true));
    it("Bob should have sender role", async () => await checkSenderRole(bob, true));

    it("Admin should be able to revoke sender role from alice", async () => {
      await gasMovr.connect(admin).revokeSenderRole(alice.getAddress());
    });

    it("Alice not should have sender role", async () => await checkSenderRole(alice, false));
    it("Bob should have sender role", async () => await checkSenderRole(bob, true));
  });

  describe("Send native tokens", () => {
    const INITIAL_AMOUNT: BigNumber = ethers.utils.parseEther('10');
    const BOB_AMOUNT: BigNumber = ethers.utils.parseEther('2');
    const CHARLIE_AMOUNT: BigNumber = ethers.utils.parseEther('3');
    let bobInitialBalance: BigNumber;
    let charlieInitialBalance: BigNumber;

    before(deployGasMovr);
    before(async () => {
      await gasMovr.connect(admin).grantSenderRole(alice.getAddress());
      await admin.sendTransaction({
        to: gasMovr.address,
        value: INITIAL_AMOUNT
      });
      bobInitialBalance = await ethers.provider.getBalance(bob.getAddress());
      charlieInitialBalance = await ethers.provider.getBalance(charlie.getAddress());
    });

    it("Alice should be able to send native tokens to bob", async () => {
      await gasMovr.connect(alice).sendNativeToken(
        bob.getAddress(),
        BOB_AMOUNT,
        BOB_SRC_TX
      );
    });

    it("Alice should be able to send native tokens to Charlie", async () => {
      await gasMovr.connect(alice).sendNativeToken(
        charlie.getAddress(),
        CHARLIE_AMOUNT,
        CHARLIE_SRC_TX
      );
    });

    it("Alice should not be able to send native tokens to Charlie again using same hash", async () => {
      await expect(gasMovr.connect(alice).sendNativeToken(
        bob.getAddress(),
        BOB_AMOUNT,
        BOB_SRC_TX
      )).to.be.revertedWith("Already processed");
    });

    it("Contract should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(gasMovr.address);
      balance.should.eq(INITIAL_AMOUNT.sub(BOB_AMOUNT).sub(CHARLIE_AMOUNT));
    });

    it("Bob should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(bob.getAddress());
      balance.should.eq(bobInitialBalance.add(BOB_AMOUNT));
    });

    it("Charlie should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(charlie.getAddress());
      balance.should.eq(charlieInitialBalance.add(CHARLIE_AMOUNT));
    });
  });

  describe("Batch send native tokens", () => {
    const INITIAL_AMOUNT: BigNumber = ethers.utils.parseEther('10');
    const BOB_AMOUNT: BigNumber = ethers.utils.parseEther('2');
    const CHARLIE_AMOUNT: BigNumber = ethers.utils.parseEther('3');
    const DAVID_AMOUNT: BigNumber = ethers.utils.parseEther('4');

    let bobInitialBalance: BigNumber;
    let charlieInitialBalance: BigNumber;
    let davidInitialBalance: BigNumber;

    before(deployGasMovr);
    before(async () => {
      await gasMovr.connect(admin).grantSenderRole(alice.getAddress());
      await admin.sendTransaction({
        to: gasMovr.address,
        value: INITIAL_AMOUNT
      });
      bobInitialBalance = await ethers.provider.getBalance(bob.getAddress());
      charlieInitialBalance = await ethers.provider.getBalance(charlie.getAddress());
      davidInitialBalance = await ethers.provider.getBalance(david.getAddress());
    });

    it("Alice should be able to batch send native tokens to bob and charlie", async () => {
      await gasMovr.connect(alice).batchSendNativeToken(
        [bob.getAddress(), charlie.getAddress()],
        [BOB_AMOUNT, CHARLIE_AMOUNT],
        [BOB_SRC_TX, CHARLIE_SRC_TX],
      );
    });

    it("Alice should not be able to batch send tokens to bob and david", async () => {
      await expect(gasMovr.connect(alice).batchSendNativeToken(
        [bob.getAddress(), david.getAddress()],
        [BOB_AMOUNT, DAVID_AMOUNT],
        [BOB_SRC_TX, DAVID_SRC_TX],
      )).to.be.revertedWith("Already processed");
    });

    it("Alice should not be able to send tokens to bob", async () => {
      await expect(gasMovr.connect(alice).sendNativeToken(
        bob.getAddress(),
        BOB_AMOUNT,
        BOB_SRC_TX
      )).to.be.revertedWith("Already processed");
    });

    it("Alice should be able to batch send tokens to david", async () => {
      await gasMovr.connect(alice).batchSendNativeToken(
        [david.getAddress()],
        [DAVID_AMOUNT],
        [DAVID_SRC_TX],
      );
    });

    it("Contract should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(gasMovr.address);
      balance.should.eq(INITIAL_AMOUNT.sub(BOB_AMOUNT).sub(CHARLIE_AMOUNT).sub(DAVID_AMOUNT));
    });

    it("Bob should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(bob.getAddress());
      balance.should.eq(bobInitialBalance.add(BOB_AMOUNT));
    });

    it("Charlie should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(charlie.getAddress());
      balance.should.eq(charlieInitialBalance.add(CHARLIE_AMOUNT));
    });

    it("David should have correct balance", async () => {
      const balance = await ethers.provider.getBalance(david.getAddress());
      balance.should.eq(davidInitialBalance.add(DAVID_AMOUNT));
    });
  });
});
