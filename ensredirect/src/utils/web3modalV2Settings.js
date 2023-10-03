import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { polygon, mainnet, goerli, sepolia } from "wagmi/chains";
import { providers } from "ethers";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  console.error("You need to provide REACT_APP_PROJECT_ID env variable");
}

const projectId =
  process.env.REACT_APP_PROJECT_ID ?? "773ec2d1dd0346a1413f5ebc1649501d";

// 2. Configure wagmi client
const chains = [mainnet, goerli, sepolia, polygon];
const defaultChain = mainnet;

const { publicClient } = configureChains(chains, [
  w3mProvider({
    projectId,
  }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function walletClientToEthers5Signer(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

module.exports = {
  projectId,
  wagmiConfig,
  ethereumClient,
  walletClientToEthers5Signer,
  defaultChain,
};
