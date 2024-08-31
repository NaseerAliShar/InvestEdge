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
      url: process.env.NEXT_PUBLIC_INFURA_API_KEY, // Infura API key
      accounts: [process.env.NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY], // Sepolia private key
    },
  },
};
