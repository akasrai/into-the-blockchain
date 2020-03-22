const EC = require('elliptic').ec;
const { BlockChain } = require('./block-chain');
const { Transaction } = require('./transaction');

const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate(
  'eea66d9e857c462e7bae37968bc37a18f584fd75820656e34ab39c7f6f011d69'
);
const myWalletAddress = myKey.getPublic('hex');

const customCoin = new BlockChain();
const txn1 = new Transaction(myWalletAddress, 'receiver wallet public key', 10);

txn1.signTransaction(myKey);
customCoin.addTransaction(txn1);

console.log('Starting mining');
customCoin.minePendingTransaction(myWalletAddress);

console.log('Check Balnce', customCoin.getBalanceOfAddress(myWalletAddress));
console.log('Is blockchain valid?', customCoin.isChainValid());

console.log('Mining again');
customCoin.minePendingTransaction(myWalletAddress);
console.log(
  'check balance again',
  customCoin.getBalanceOfAddress(myWalletAddress)
);

// Try tempering
customCoin.chain[1].transactions[0].amount = 5000;
console.log('Is blockchain valid?', customCoin.isChainValid());

console.log('Mining again');
customCoin.minePendingTransaction(myWalletAddress);

console.log(
  'check balance again',
  customCoin.getBalanceOfAddress(myWalletAddress)
);

for (let i = 0; i < customCoin.chain.length; i++) {
  console.log(customCoin.chain[i]);
}
