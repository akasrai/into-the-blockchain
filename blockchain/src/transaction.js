const crypto = require('crypto');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.amount = amount;
    this.toAddress = toAddress;
    this.fromAddress = fromAddress;
  }

  calculateHash = () => {
    return crypto
      .createHash('sha256')
      .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
      .digest('hex');
  };

  signTransaction = signingKey => {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transation for other wallets!!!');
    }

    // Calculate the hash of this transaction, sign it with the key
    // and store it inside the transaction object
    const hashTxn = this.calculateHash();
    const sign = signingKey.sign(hashTxn, 'base64');

    this.signature = sign.toDER('hex');
  };

  isValid = () => {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (this.fromAddress === null) return true;

    // Check if txn has signature
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction!!!');
    }

    // if txn has signature then verify if txn is signed with correct key
    // creating public key object from fromAddress, fromAddress is a public key
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

    // verify if hash of this txn is signed by this signature
    return publicKey.verify(this.calculateHash(), this.signature);
  };
}

module.exports = {
  Transaction
};
