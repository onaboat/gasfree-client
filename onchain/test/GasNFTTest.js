const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("GasNFT", function () {
    let Owner, signer2, signer3, signer4, signer5, signer6, signer7, signer8;
    let gasNftTest;

    this.beforeAll(async function () {
        [Owner, signer2, signer3, signer4, signer5, signer6, signer7, signer8] =
            await ethers.getSigners();

        const GasNftTest = await ethers.getContractFactory("GasNft", Owner);
        gasNftTest = await GasNftTest.deploy();
        console.log("GasNFT deployed to:", gasNftTest.target);
    });

    it("GasNFT ERC721 deployed", async function () {

        const name = await gasNftTest.name();
        const symbol = await gasNftTest.symbol();
        expect(name).to.equal("GasNft");
        expect(symbol).to.equal("GNFT");

    });


    it("GasNFT ERC721 -- should mint 1 NFT (non Owner)", async function () {
        const initialBalance = await gasNftTest.balanceOf(signer2.address);
        await gasNftTest.connect(signer2).safeMint(signer2.address);
        const OwnerofNFT = await gasNftTest.ownerOf(0);
        // console.log("OwnerofNFT:", OwnerofNFT);
        expect(OwnerofNFT).to.equal(signer2.address);
        const NFTBalance = await gasNftTest.balanceOf(signer2.address);
        expect(NFTBalance).to.equal(1);
    });


    it("GasNFT ERC721 -- should burn 1 NFT (non Owner)", async function () {
        const initialBalance = await gasNftTest.balanceOf(signer2.address);
        // console.log("initialBalance:", initialBalance.toString());
        await gasNftTest.connect(signer2).burn(0);
        expect(await gasNftTest.balanceOf(signer2.address)).to.equal(0);

        const totalBalance = await gasNftTest.totalSupply();
        // console.log("Total Balance:", totalBalance.toString());
        expect(totalBalance).to.equal(1);
        
        const activeBalance = await gasNftTest.activeTokens()
        // console.log("Tatal Active NFT:", activeBalance.toString());
        expect(activeBalance).to.equal(0);
    });

    it("GasNFT ERC721 -- should not mint more than 5 per address (non Owner)", async function () {
        await gasNftTest.connect(signer3).safeMint(signer3.address);
        await gasNftTest.connect(signer3).safeMint(signer3.address);
        await gasNftTest.connect(signer3).safeMint(signer3.address);
        await gasNftTest.connect(signer3).safeMint(signer3.address);
        await gasNftTest.connect(signer3).safeMint(signer3.address);
        
        // Check for the revert using the expectReverted function
        await expect(gasNftTest.connect(signer3).safeMint(signer3.address))
            .to.be.revertedWith("NFT limit reached for address");
    });
});

