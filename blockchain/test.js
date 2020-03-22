const { BlockChain } = require('./block-chain');
const { Transaction } = require('./transaction');

let customCoin = new BlockChain();

customCoin.createTransaction(new Transaction('address1', 'address2', 300));
customCoin.createTransaction(new Transaction('address2', 'address1', 600));

console.log('Starting mining');
customCoin.minePendingTransaction('akash');

console.log('Balnce of akash', customCoin.getBalanceOfAddress('akash'));
console.log('Is blockchain valid?', customCoin.isChainValid());

console.log('Mining again');
customCoin.minePendingTransaction('akash');

console.log('Balnce of akash', customCoin.getBalanceOfAddress('akash'));
console.log('Is blockchain valid?', customCoin.isChainValid());
