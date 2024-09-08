/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.NEXT_PUBLIC_RPC_URL, // Infura API key
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY], //MetaMask Private key
    },
  },
};
