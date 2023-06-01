import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, sepolia } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [polygonMumbai, goerli, sepolia],
  [/* alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), */ publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'FU3 The Game',
  projectId: process.env.WALLET_CONNECT_ID,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { wagmiClient, chains };
