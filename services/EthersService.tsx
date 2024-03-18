import { ethers } from 'ethers';
import CoinFlipService from './CoinFlipService';

const fromWei = (value: string) => { return ethers.utils.formatEther(value); }
const toWei = (value: string) => { return ethers.utils.parseEther(value); }

const EthersService = {
    provider: null,
    setProvider: (provider: any) => {
        EthersService.provider = provider;
    },
    getChainId: () => 56, // 56 = Mainnet, 97 = Testnet
    getBalanceBNB: (address: string) => {
        if(EthersService.provider) {
            return EthersService.provider.getBalance(ethers.utils.getAddress(address)).then((balance) => {
                balance = ethers.utils.formatEther(balance);
                return balance;
            });
        }

        return null;
    },
    checkNetwork: async (chainId) => {

        // ToDo. This does not work on mobile
        return new Promise((resolve, reject) => {
            resolve(chainId == EthersService.getChainId());
        });
    },
    getErrorMessage: (error: any) => {
        let message = error?.message;
        if(error.reason) {
            message = error.reason;
        } else if(error.data && error.data.message) {
            message = error.data.message;
        }

        message = message
            .replace(/execution reverted/gi, '')
            .replace(':', '')
            .trim();

        if(!message || !message.length) {
            return `Something went wrong. Maybe you don't have enough balance?`;
            /* return error.data.message; */
        }

        return message;
    },
    fromWei: fromWei,
    toWei: toWei
}

export default EthersService;