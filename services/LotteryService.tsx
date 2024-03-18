import { ethers } from 'ethers';
import { FormatTypes, Interface } from 'ethers/lib/utils';

/* const LOTTERY_ADDRESS = `0x4C03A4C4E2abf7836B8BB9392F4826A20DC4460d`;
const LOTTERY_NFT_ADDRESS = `0x0C4615927C2D4e67471fF879E4dC16B4ED38FBAb`; */

const LOTTERY_ADDRESS = `0xfd71C1cB1363E69c79AA14A27B8E0B1a78B0Ef16`;
const LOTTERY_NFT_ADDRESS = `0xA95E65cDc71E479891aabf9C23C306bA9023571d`;

const fromWei = (value: string) => { return ethers.utils.formatEther(value); }
const toWei = (value: string) => { return ethers.utils.parseEther(value); }

const ABI_TO_HUMAN_READABLE = (abi) => {
    const iface = new Interface(abi);
    return iface.format(FormatTypes.full);
}

const ENTITIES = {
    LOTTERY: {
        getABI: () => {
            const ABI = ABI_TO_HUMAN_READABLE(require('../abis/Lottery.json'));
            return ABI;
        }
    },
    LOTTERY_NFT: {
        getABI: () => {
            const ABI = ABI_TO_HUMAN_READABLE(require('../abis/LotteryNFT.json'));
            return ABI;
        }
    }
}

if(process.env.NODE_ENV === 'development') {
    console.log(`Lottery ABI`, ENTITIES.LOTTERY.getABI());
    console.log(`LotteryNFT ABI`, ENTITIES.LOTTERY_NFT.getABI());
}

const LotteryService = {
    LOTTERY_ADDRESS,
    LOTTERY_NFT_ADDRESS,
    provider: null,
    signer: null,
    account: null,
    setProvider: (provider: any) => LotteryService.provider = provider,
    setSigner: (signer: any) => LotteryService.signer = signer,
    setAccount: (account: any) => LotteryService.account = account,
    getMaxRange: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const maxRange = await contract.getMaxRange();
        return maxRange;
    },
    getCostPerTicket: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const data = await contract.costPerTicket();
        return fromWei(data.toString());
    },
    getSizeOfLottery: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const maxRange = await contract.sizeOfLottery_();
        return maxRange;
    },
    getAllLotosOpenInfo: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const lottos = await contract.getAllLottosOpenInfo();
        return lottos;
    },
    getAllLottosClosedInfo: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const lottos = await contract.getAllLottosClosedInfo();
        return lottos;
    },
    getAllLottosCompletedActiveInfo: async () => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const lottos = await contract.getAllLottosCompletedActiveInfo();
        return lottos;
    },
    getBasicLottoInfo: async (lottoId) => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const lotto = await contract.getBasicLottoInfo(lottoId);
        return lotto;
    },
    getLottoCurrentPrizePool: async (lottoId) => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const data = await contract.getLottoCurrentPrizePool(lottoId);
        return fromWei(data.toString());
    },
    batchBuyLottoTicket: async (payableAmount: any, lotteryId: any, numberOfTickets: number, choosenNumbers: number[]) => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const lotto = await contract
            .connect(LotteryService.signer)
            .batchBuyLottoTicket(lotteryId, numberOfTickets, choosenNumbers, {
                value: toWei(payableAmount.toString())
            });

        await lotto.wait();
        return lotto;
    },
    getUserTickets: async (lotteryID: number, address: string) => {
        const contract = new ethers.Contract(LOTTERY_NFT_ADDRESS, ENTITIES.LOTTERY_NFT.getABI(), LotteryService.provider);
        const tickets = [];
        const data = await contract.getUserTickets(lotteryID, address);

        for(var idx in data) {
            const ticketNumbers = await contract.getTicketNumbers(data[idx]);
            const claimed = await contract.getTicketClaimStatus(data[idx]);

            tickets.push({
                ticketId: data[idx].toString(),
                numbers: ticketNumbers,
                claimed: claimed
            })
        }
        return tickets;
    },
    batchClaimRewards: async (lotteryId: number, ticketIds: number) => {
        const contract = new ethers.Contract(LOTTERY_ADDRESS, ENTITIES.LOTTERY.getABI(), LotteryService.provider);
        const trx = await contract
            .connect(LotteryService.signer)
            .batchClaimRewards(lotteryId, ticketIds);

        return trx;
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

export default LotteryService;