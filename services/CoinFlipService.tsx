import { ethers } from 'ethers';

const TOKEN_ADDRESS = `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`;
// const TOKEN_ADDRESS = `0x094616f0bdfb0b526bd735bf66eca0ad254ca81f`; // BNB Testnet

// Mainnet
// const WBNB_ADDRESS = `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
// const TOKEN_ADDRESS = `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`;
// const TOKEN_ADDRESS = `0xC1eF9044522551DC0F664139f6C1a7765F6bf4aE`;
const GAME_ADDRESS = `0x2C6fD2a4DEb637662e70955fc4eb97ADAdF0439C`;
const ABI = [
    // Get bets
    'function get_address_bets(address adr) public view returns(tuple(address actor, bool active, bool win, uint256 timestamp, uint256 value, address token, uint256 status)[] memory)',
    'function get_bet_status(uint id) public view returns(uint, uint, address, bool, address, uint, uint256)',
    'function get_bet_values() public view returns (uint256[])',
    'function get_bet_values_token(address token) public view returns (uint256[])',
    'function bet_multiplier() public view returns (uint)',

    // Place bets
    'function place_bet_token(address addy, uint qty) public',
    'function place_bet() payable public'
];

const ABI_AIRDROP = [
    'function allowance(address holder, address spender) external view returns (uint256)',
    'function approveMax(address spender) external returns (bool)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function balanceOf(address account) external view returns (uint256)',
    'function name() external pure returns (string)',
    'function symbol() external pure returns (string)',
    'function decimals() external pure returns (uint8)'
];

const fromWei = (value: string) => { return ethers.utils.formatEther(value); }
const toWei = (value: string) => { return ethers.utils.parseEther(value); }

const CoinFlipService = {
    GAME_ADDRESS: GAME_ADDRESS,
    TOKEN_ADDRESS: TOKEN_ADDRESS,
    DEBUG_MODE: false,
    provider: null,
    signer: null,
    account: null,
    isBNB: () => true,
    setProvider: (provider: any) => CoinFlipService.provider = provider,
    setSigner: (signer: any) => CoinFlipService.signer = signer,
    setAccount: (account: any) => CoinFlipService.account = account,
    getBetsByAddress: async (address: string) => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        const bets = await contract.get_address_bets(address);
        return bets;
    },
    placeBetToken: async (quantity: number) => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        console.log(`[Event] Executing place_bet_token with ${quantity.toString()}`)
        return contract.connect(CoinFlipService.signer).place_bet_token(TOKEN_ADDRESS, quantity.toString());
    },
    // value: BNB value to bet
    placeBet: async (value: number) => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        console.log(`[Event] Executing place_bet with ${value.toString()}`)
        return contract.connect(CoinFlipService.signer).place_bet({
            value: value.toString()
        });
    },
    getMultiplier: async () => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        return contract.bet_multiplier();
    },
    getBetStatus: async (flipId: any) => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        return contract.get_bet_status(flipId);
    },
    getBetValues: async () => {
        const contract = new ethers.Contract(GAME_ADDRESS, ABI, CoinFlipService.provider);
        if(CoinFlipService.isBNB()) {
            return contract.get_bet_values();
        }

        return contract.get_bet_values_token(TOKEN_ADDRESS);
    },
    isApprovedToken: async () => {
        // Check if approved first
        const airdropToken = TOKEN_ADDRESS;
        const airdropContract = new ethers.Contract(airdropToken, ABI_AIRDROP, CoinFlipService.provider);
        const allowance = await airdropContract.allowance(CoinFlipService.account, CoinFlipService.GAME_ADDRESS);
        if(allowance.toString() == '0') {
            return false;
        }

        return true;
    },
    getTokenInfo: async (token, includeBalance) => {
        const airdropContract = new ethers.Contract(token, ABI_AIRDROP, CoinFlipService.provider);
        const name = await airdropContract.name();
        const decimals = await airdropContract.decimals();
        const symbol = await airdropContract.symbol();

        const retVal: any = { name, decimals, symbol }

        if(includeBalance) {
            const balance = await CoinFlipService.getTokenBalance(token);
            retVal.balance = balance;
        }

        if(retVal.symbol === 'WBNB') retVal.symbol = 'BNB';

        return retVal;
    },
    getTokenBalance: async (token) => {
        const airdropContract = new ethers.Contract(token, ABI_AIRDROP, CoinFlipService.provider);

        if(CoinFlipService.isBNB()) {
            const balance = await CoinFlipService.provider.getBalance(CoinFlipService.account);
            const decimals = await airdropContract.decimals();
            return balance.toString() / 10 ** decimals;
        } else {
            const balance = await airdropContract.balanceOf(CoinFlipService.account);
            const decimals = await airdropContract.decimals();
            return balance.toString() / 10 ** decimals;
        }
    },
    approveMaxToken: async () => {
        const airdropToken = TOKEN_ADDRESS;
        const airdropContract = new ethers.Contract(airdropToken, ABI_AIRDROP, CoinFlipService.provider);
        let trx = await airdropContract.connect(CoinFlipService.signer).approve(CoinFlipService.GAME_ADDRESS, (1000000000000000).toString());
        await trx.wait();

        return true;
    },
    fromWei: fromWei
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

export default CoinFlipService;