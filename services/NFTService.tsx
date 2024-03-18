import { ethers } from 'ethers';
import { FormatTypes, Interface } from 'ethers/lib/utils';
import axios from 'axios';

interface IEdition {
    address: string,
    name: string
};

const fromWei = (value: string) => { return ethers.utils.formatEther(value); }
const toWei = (value: string) => { return ethers.utils.parseEther(value); }

const ABI_TO_HUMAN_READABLE = (abi) => {
    const iface = new Interface(abi);
    return iface.format(FormatTypes.full);
}

const ENTITIES = {
    NFT: {
        getABI: () => {
            const ABI = ABI_TO_HUMAN_READABLE(require('../abis/NFTMint.json'));
            return ABI;
        }
    }
}

if(process.env.NODE_ENV === 'development') {
    console.log(`NFT ABI`, ENTITIES.NFT.getABI());
}

const NFTService = {
    getEditions: () => {
        return {
            COMMON: {
                address: '0x1782d1e0bf1380d53cc453e4c9613f3cda7bf61a', // Mainnet
                name: `Common Edition`,
                slug: 'common'
            } as IEdition,
            EXCLUSIVE: {
                address: `0xdE231dBd566176cff9846EEF0613462443983Ed8`, // Mainnet
                name: `Exclusive Edition`,
                slug: 'exclusive'
            } as IEdition,
            LEGENDARY: {
                address: `0x43286a582a2cf513D719bA221E4a21D8532444A0`, // Mainnet
                name: `Legendary Edition`,
                slug: 'legendary'
            } as IEdition
        }
    },
    provider: null,
    signer: null,
    account: null,
    setProvider: (provider: any) => NFTService.provider = provider,
    setSigner: (signer: any) => NFTService.signer = signer,
    setAccount: (account: any) => NFTService.account = account,
    isSaleActive: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.saleActive();
        return data;
    },
    getMaxSupply: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.MAX_SUPPLY();
        return data;
    },
    getTotalSupply: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.totalSupply();
        return data;
    },
    getMaxTxMint: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.MAX_TX_MINT();
        return data;
    },
    getOriginalPrice: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.PRICE_PER_MINT();
        return data;
    },
    getPrice: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.getMintPriceByAddress(NFTService.account);
        return data;
    },
    getTokenBalance: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.getTokenBalance(NFTService.account);
        return data;
    },
    getEligibleDiscount: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.getEligibleDiscount(NFTService.account);
        return data;
    },
    getHoldDiscounts: async (edition: IEdition) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.getHoldDiscounts();
        return data;
    },
    balanceOf: async (edition: IEdition, address: string) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.balanceOf(address);
        return data;
    },
    getOwnedNfts: async (edition: IEdition, address: string) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const balance = await contract.balanceOf(address);
        const nfts = [];
        for(var i=0; i < parseInt(balance.toString()); i++) {
            try {
                const data = await contract.tokenOfOwnerByIndex(address, i)
                nfts.push(parseInt(data.toString()));
            } catch (err) {
                break;
            }
        }
        
        return nfts;
    },
    getImageURIByTokenID: async (edition: IEdition, tokenId) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const data = await contract.tokenURI(tokenId);

        const replaceIPFS = (ipfsURI) => {
            let uri = ipfsURI.replace('ipfs://', '')
            uri = `https://kraitor.mypinata.cloud/ipfs/${uri}`;
            return uri;
        }

        let imageIPFSUri = replaceIPFS(data);
        const imageJSON = await axios.get(imageIPFSUri);
        if(imageJSON && imageJSON.status == 200) {
            return replaceIPFS(imageJSON.data['image'])
        }

        return null;
    },
    mint: async (edition: IEdition, numberOfNfts: number) => {
        const contract = new ethers.Contract(edition.address, ENTITIES.NFT.getABI(), NFTService.provider);
        const price = await contract.getMintPriceByAddress(NFTService.account);
        const total = price * numberOfNfts;
        const trx = await contract
            .connect(NFTService.signer)
            .mint(numberOfNfts, {
                value: total.toString()
            });

        return await trx.wait();
    },
    fromWei: fromWei,
    toWei: toWei
}

const formatDecimalZeros = (value: string, numberOfZeros: number) => {
    let integer = value.split('.')[0];
    let decimals = value.split('.')[1];
    let decimalsPad = '';
    let indexNotZeros = 0;

    for(var i=0; i < decimals.length; i++) {
        if(decimals.charAt(i) !== '0') {
            indexNotZeros++;
        }

        decimalsPad += decimals.charAt(i);

        if(indexNotZeros == numberOfZeros)
            break;
    }

    return integer + '.' + decimalsPad;
}

export default NFTService;