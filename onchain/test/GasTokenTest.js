const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("GasToken", function () {
    let Owner, signer2, signer3, signer4, signer5, signer6, signer7, signer8;
    let gasTokenTest;

    this.beforeAll(async function () {
        [Owner, signer2, signer3, signer4, signer5, signer6, signer7, signer8] =
            await ethers.getSigners();

        const GasTokenTest = await ethers.getContractFactory("GasToken", Owner);
        gasTokenTest = await GasTokenTest.deploy();
        console.log("GasToken deployed to:", gasTokenTest.target);
    });

    it("GasToken ERC20 deployed", async function () {

        const name = await gasTokenTest.name();
        const symbol = await gasTokenTest.symbol();
        const decimals = await gasTokenTest.decimals();

        expect(name).to.equal("GasToken");
        expect(symbol).to.equal("GTK");
        expect(decimals).to.equal(18);
    });

    it("GasToken ERC20 -- should mint 1000000 tokens (non Owner)", async function () {
        const initialBalance = await gasTokenTest.balanceOf(signer2.address);
        await gasTokenTest.connect(signer2).mint(signer2.address);
        const newBalance = await gasTokenTest.balanceOf(signer2.address);
        expect(newBalance).to.equal(1000000);
    });

    it("GasToken ERC20 -- should burn 1 tokens (non Owner)", async function () {
        await gasTokenTest.connect(signer2).burn(1);
        const finalBalance = await gasTokenTest.balanceOf(signer2.address);
        expect(finalBalance).to.equal(999999);
    });
});

