import SHA256 from 'crypto-js/sha256';

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.data = data;
    this.index = index;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA256(
      this.index + this.timestamp + this.prevHash + JSON.stringify(this.data)
    ).toString();
  };
}

export default Block;
