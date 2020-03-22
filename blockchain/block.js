const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.nonce = 0;
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA256(
      this.index +
        this.nonce +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  };

  mineBlock = difficulty => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mines', this.hash);
  };
}

module.exports = { Block };
