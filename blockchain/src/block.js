const crypto = require('crypto');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.nonce = 0;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return crypto
      .createHash('sha256')
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest('hex');
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

  hasValidTransaction = () => {
    for (const txn of this.transactions) {
      if (!txn.isValid()) {
        return false;
      }
    }

    return true;
  };
}

module.exports = { Block };
