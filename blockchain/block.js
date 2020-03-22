const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.nonce = 0;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA256(
      this.nonce +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.transactions)
    ).toString();
  };

  mineBlock = difficulty => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Blocked mined', this.hash);
  };
}

module.exports = { Block };
