class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.amount = amount;
    this.toAddress = toAddress;
    this.fromAddress = fromAddress;
  }
}

module.exports = {
  Transaction
};
