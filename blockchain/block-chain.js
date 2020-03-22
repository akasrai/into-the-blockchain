const { Block } = require('./block');

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock = () => {
    return new Block(0, new Date().toLocaleString(), 'Genesis block', '0');
  };

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  };

  addBlock = newBlock => {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
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
