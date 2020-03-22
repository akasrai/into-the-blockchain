const { Block } = require('./block');
const { BlockChain } = require('./block-chain');

let customCoin = new BlockChain();
customCoin.addBlock(new Block(1, new Date().toLocaleString(), { amount: 100 }));
customCoin.addBlock(new Block(2, new Date().toLocaleString(), { amount: 200 }));

console.log(JSON.stringify(customCoin, null, 4));

console.log('Is blockchain valid?', customCoin.isChainValid());

customCoin.chain[2].data = { amount: 500 };
customCoin.chain[2].calculateHash();

console.log('Is blockchain valid?', customCoin.isChainValid());
