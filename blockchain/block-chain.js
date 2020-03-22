const { Block } = require('./block');
const { Transaction } = require('./transaction');

class BlockChain {
  constructor() {
    this.difficulty = 2;
    this.miningReward = 100;
    this.pendingTransaction = [];
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock = () => {
    return new Block(new Date().toLocaleString(), 'Genesis block', '0');
  };

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  };

  minePendingTransaction = miningRewardAddress => {
    let block = new Block(Date.now(), this.pendingTransaction);
    block.previousHash = this.getLatestBlock().hash;
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.pendingTransaction = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  };

  createTransaction = transaction => {
    this.pendingTransaction.push(transaction);
  };

  getBalanceOfAddress = address => {
    let balance = 0;
    for (const block of this.chain) {
      for (const txn of block.transactions) {
        if (txn.fromAddress === address) {
          balance -= txn.amount;
        }

        if (txn.toAddress === address) {
          balance += txn.amount;
        }
      }
    }

    return balance;
  };

  isChainValid = () => {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!this.isDataValid(currentBlock, previousBlock)) return false;
    }

    return true;
  };

  isDataValid = (currentBlock, previousBlock) => {
    if (currentBlock.hash !== currentBlock.calculateHash()) return false;
    if (currentBlock.previousHash !== previousBlock.hash) return false;

    return true;
  };
}

module.exports = { BlockChain };
