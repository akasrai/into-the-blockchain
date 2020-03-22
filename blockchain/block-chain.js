const { Block } = require('./block');

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock = () => {
    return new Block(0, new Date().toLocaleString(), 'Genesis block', '0');
  };

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  };

  addBlock = newBlock => {
    newBlock.hash = newBlock.calculateHash();
    newBlock.prevHash = this.getLatestBlock().hash;

    this.chain.push(newBlock);
  };
}

module.exports = { BlockChain };
