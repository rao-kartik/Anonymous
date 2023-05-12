import { expect } from "chai";
import { ethers } from "hardhat";

import {
  BigNumber,
  Contract,
  ContractFactory,
  SignerWithAddress,
  fundraiserStruct,
} from "../Types/Fundraiser.types";

const gasLimit = 300000;
const amountToBeRaised = 10000000;

describe("Fundraiser Test", () => {
  let FundraiserFactory: ContractFactory,
    fundraiserContract: Contract,
    owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress;

  before(async (): Promise<void> => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    FundraiserFactory = await ethers.getContractFactory("Fundraiser");
    fundraiserContract = await FundraiserFactory.deploy();
  });

  /*;
   * Test for starting a fundraiser
   * There should be no fundraiser initially
   * Thw raised for address passed should not be a contract address
   * After calling the function a fundraiser is created
   * Compairing the vaules of created and fundraiser with entered values
   */
  describe("Test for starting a fundraiser", (): void => {
    it("There should be no active fundraiser", async () => {
      const _fundRaiserBefore: fundraiserStruct = fundraiserContract.fundRaisers(0);

      expect(_fundRaiserBefore).to.be.revertedWithPanic();
    });

    it("The raised for address should not be a contract address", async (): Promise<void> => {
      const tx: Promise<void> = fundraiserContract
        .connect(addr1)
        .startFundRaiser(
          fundraiserContract.address,
          amountToBeRaised,
          2,
          "Need money for higher studies",
          0,
          { gasLimit }
        );

      expect(tx).to.be.revertedWith("You can't raise for a contract");
    });

    it("A new fundraiser is created", async (): Promise<void> => {
      await fundraiserContract
        .connect(addr3)
        .startFundRaiser(addr3.address, amountToBeRaised, 2, "Need money for higher studies", 0);

      const _fundRaiserAfter: fundraiserStruct = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserAfter.raisedBy).to.equal(addr3.address);
      expect(_fundRaiserAfter.raisedFor).to.equal(addr3.address);
      expect(_fundRaiserAfter.amount).to.equal(amountToBeRaised);
      expect(_fundRaiserAfter.neededBefore).to.equal(2);
      expect(_fundRaiserAfter.about).to.equal("Need money for higher studies");
      expect(_fundRaiserAfter.isActive).to.equal(true);
      expect(_fundRaiserAfter.amountRaised).to.equal(0);
      expect(_fundRaiserAfter.category).to.equal(0);
      expect(_fundRaiserAfter.totalSupportors).to.equal(0);
      expect(_fundRaiserAfter.amountClaimed).to.equal(0);
    });
  });

  /*;
   * Test for managing the active status of the fundraiser
   * The fundraiser should be active initially
   * The status should change to false when passed false and true when passed true
   */
  describe("Test for managing the active status of the fundraiser", async (): Promise<void> => {
    it("Status should be active once the fundraiser is created", async (): Promise<void> => {
      const _fundRaiserDetails: fundraiserStruct = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserDetails.isActive).to.equal(true);
    });

    it("Change active status of fundraiser should fail if anyone other than the owner or the onw for whom the fundraiser is started tries to change the status", async (): Promise<void> => {
      const tx: Promise<void> = fundraiserContract.manageActiveStatusOfFundraiser(0, false, {
        gasLimit,
      });

      expect(tx).to.be.revertedWith("You don't have sufficient permissions");
    });

    it("The fundraiser should be marked as inactive", async (): Promise<void> => {
      await fundraiserContract.connect(addr3).manageActiveStatusOfFundraiser(0, false, {
        gasLimit,
      });

      const _fundRaiserDetails: fundraiserStruct = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserDetails.isActive).to.equal(false);
    });

    it("The fundraiser should be marked as active", async (): Promise<void> => {
      await fundraiserContract.connect(addr3).manageActiveStatusOfFundraiser(0, true, {
        gasLimit,
      });

      const _fundRaiserDetails: fundraiserStruct = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserDetails.isActive).to.equal(true);
    });
  });

  /**
   * Test for donating funds to fundraiser
   * The fundraiser should be valid
   * The fundraiser should not be blacklisted
   * The fundraiser should be active
   * Donation should be less than or equal to what is desired & the remaining amount that is left to be raised
   * After the donation is successful check if the required fields are updated or not
   * After the funds are donated and the needed amount is raised, the fundraiser should be marked as inactive
   */
  describe("Test for donating funds to a fudraiser", (): void => {
    it("The donation should fail if the fundraiser Id doesn't exist", async (): Promise<void> => {
      const donation: BigNumber = ethers.utils.parseEther("1");

      const tx: Promise<void> = fundraiserContract
        .connect(addr2)
        .donateFunds(2, { value: donation, gasLimit });

      expect(tx).to.be.revertedWith("Oops! This fundraiser does not exis");
    });

    it("The donation should fail if the fundraiser is blacklisted", async (): Promise<void> => {
      await fundraiserContract.blacklistFundraiser(0, true);

      const _blacklistStatus: boolean = await fundraiserContract.blacklistedFundraisers(0);

      expect(_blacklistStatus).to.equal(true);

      const donation: BigNumber = ethers.utils.parseEther("1");
      const tx: Promise<void> = fundraiserContract
        .connect(addr2)
        .donateFunds(0, { value: donation, gasLimit });

      expect(tx).to.be.revertedWith(
        "Sorry! This fundraiser has been blacklisted. It can no longer raise funds"
      );

      await fundraiserContract.blacklistFundraiser(0, false);
    });

    it("The donation should fail if the fundraiser is inactive", async (): Promise<void> => {
      await fundraiserContract
        .connect(addr3)
        .manageActiveStatusOfFundraiser(0, false, { gasLimit });

      const donation: BigNumber = ethers.utils.parseEther("1");
      const tx: Promise<void> = fundraiserContract
        .connect(addr2)
        .donateFunds(0, { value: donation, gasLimit });

      expect(tx).to.be.revertedWith(
        "Either the fundraiser is no longer accepting donations or He has raised the needed amount"
      );

      await fundraiserContract.connect(addr3).manageActiveStatusOfFundraiser(0, true, { gasLimit });
    });

    it("The donation should fail if donation is more than the needed amount", async (): Promise<void> => {
      const donation: BigNumber = ethers.utils.parseEther("1");

      const tx: Promise<void> = fundraiserContract
        .connect(addr2)
        .donateFunds(0, { value: donation, gasLimit });

      expect(tx).to.be.revertedWith(
        "Thank You for your help but we can't accept funds as the fundraiser doesn't need that much funds.t"
      );
    });

    it("The donation should fail if the funds are donated once the time period to raise funds has passed", async (): Promise<void> => {
      await fundraiserContract
        .connect(owner)
        .startFundRaiser(addr3.address, amountToBeRaised, 1, "Need money for higher studies", 0);

      const donation: BigNumber = ethers.utils.parseEther("0.00000000000001");

      const tx: Promise<void> = fundraiserContract
        .connect(addr2)
        .donateFunds(1, { value: donation, gasLimit });

      expect(tx).to.be.revertedWith("Sorry! The timeperiod to raise funds has passed");
    });

    it("Donation successful", async (): Promise<void> => {
      const donation: BigNumber = ethers.utils.parseEther("0.0000000000001");

      await fundraiserContract.connect(addr2).donateFunds(0, { value: donation, gasLimit });

      const _fundRaiserDetails = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserDetails.amountRaised).to.equal(donation);
      expect(_fundRaiserDetails.totalSupportors).to.equal(1);

      const _donorDetails = await fundraiserContract.donors(0, addr2.address);

      expect(_donorDetails.amount).to.equal(donation);
    });

    it("Mark fundraiser as inactive once the needed amount is raised", async (): Promise<void> => {
      const donation: BigNumber = ethers.utils.parseEther("0.0000000000099");
      await fundraiserContract.connect(addr2).donateFunds(0, { value: donation, gasLimit });

      const _fundRaiserDetails = await fundraiserContract.fundRaisers(0);

      expect(_fundRaiserDetails.amountRaised).to.equal(`${amountToBeRaised}`);
      expect(_fundRaiserDetails.totalSupportors).to.equal(1);
      expect(_fundRaiserDetails.isActive).to.equal(false);
    });
  });
});
