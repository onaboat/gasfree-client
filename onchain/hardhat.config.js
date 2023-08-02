

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();

const { PRIVATE_KEY, ETHERSCAN_API_KEY, INFURA_URL_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    linea: {
      url: INFURA_URL_API_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      linea: ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: "linea",
        chainId: 59140,
        urls: {
          apiURL: "https://goerli.lineascan.build/apis#contracts",
          browserURL: "https://goerli.lineascan.build/"
        }
      }
    ]
  }
};
