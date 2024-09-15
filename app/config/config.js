const config = {
  rpcUrl: String(process.env.NEXT_PUBLIC_RPC_URL),
  privateKey: String(process.env.NEXT_PUBLIC_PRIVATE_KEY),
  contractAddress: String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS),
};

export default config;
