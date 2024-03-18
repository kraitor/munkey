import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import EthersService from '../../services/EthersService';
/* import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { MagicConnector } from '@web3-react/magic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { SquarelinkConnector } from '@web3-react/squarelink-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { OneWalletConnector } from '@harmony-react/onewallet-connector'
import { MathWalletConnector } from '@harmony-react/mathwallet-connector' */

const CHAIN_ID = EthersService.getChainId();
const CHAIN_IDS = {
    BSC_MAINNET: 56,
    BSC_TESTNET: 97
};
const CHAINS = { [CHAIN_IDS.BSC_MAINNET]: `https://bsc-dataseed.binance.org/`, [CHAIN_IDS.BSC_TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545/` }
const CHAIN_IDS_SUPPORTED = [ CHAIN_IDS.BSC_MAINNET, CHAIN_IDS.BSC_TESTNET ];
const RPC_BSC = CHAINS[CHAIN_ID];

export const injected = new InjectedConnector({
  supportedChainIds: CHAIN_IDS_SUPPORTED,
});

export const walletconnect = new WalletConnectConnector({
    chainId: CHAIN_ID,
    rpc: { [CHAIN_ID]: RPC_BSC },
    qrcode: true,
    infuraId: null,
    rpcUrl: RPC_BSC
});

export const network = new NetworkConnector({
    urls: { [CHAIN_ID]: RPC_BSC },
    defaultChainId: CHAIN_ID,
    supportedChainIds: CHAIN_IDS_SUPPORTED,
});