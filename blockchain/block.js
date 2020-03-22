const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  };
}

module.exports = { Block };
