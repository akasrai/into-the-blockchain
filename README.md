# Blockchain Terminologies

## 1\. Block

A block is an individual transaction or piece of data that is being stored within the blockchain.

## 2\. Blockchain

A blockchain is continuously growing chain (list) of blocks (records), which are linked in the order of which they occurred. We can further define it as , an _accurate and permanent record_ of the the transactions that have been verified and stored in chronological sequence.

## 3\. Blockchain Network

Can be used interchangeably with Blockchain, they represent the entire blockchain (structure and network)

## 4\. Participant

A client or simply a computer that owns a copy of blockchain and verifies transaction across the network.

## 5\. Decentralization

Simply means there will be no central governing system, where participants will work together to validate the transaction together. At least 51% of participant have to validate the transaction in blockchain.

## **6.Hash**

A fixed-length string of a varying combination of letters and numbers produced from a specific input of arbitrary size. Hash is generated using Hash functions.

## **7\. Hash Function**

A cryptographic deterministic function that takes in an input of a random size, performs hashing on this input, and generates a random output of a _fixed size_, also known as the hash.

## **8\. Genesis Block**

The genesis block is the first block on the blockchain and it is typically hard-coded into the blockchain structure. Being the first block on the blockchain, it does not have a link to a previous hash. Things to remember here is complete block is hard-coded along with previous hash.

## **9\. Deterministic**

The same input will always produce the same output, but that output cannot produce the original input.The hash functions used in the blockchain are deterministic.

# **Block Properties**

*   **Timestamp:** The time when block is created, that determines the location of it on the blockchain.
*   **Data:** The information to be securely stored in the block. This can be anything like financial transaction data.
*   **Hash:** A unique code produced by combining all the contents within the block itself with the help of hash functions. This is also known as a _digital fingerprint_**.**
*   **Previous Hash:** Each block has a reference to its previous block with previous hash property. This is what makes the blockchain unique because this link will be broken if a block is tampered with.

# Transaction Properties

## 1\. Transaction

Transaction is an exchange of value among participants on the blockchain.

## 2\. Unconfirmed Transaction

Blocks and Transactions that are yet to be verified.

## 3\. Consensus:

It is the process of agreeing to the transactions on the blockchain network. A random participant broadcast their blocks to the entire network and participants need to verify it. If more than 51% participant agree with the block, a consensus is said to be reached.

## 4\. Immutable

Something whose records can not be changed. The records in the blockchain can not be altered. In other words, the records are said to be immutable.

## 5\. Recalculating Hashes

Replacing the incorrect has with a correct one to validate the chain is called recalculating hashes.

## 6\. Proof-of-work

A security feature in blockchain to prevent attackers from easily taking over the blockchain. It is the clever technique that ensures

*   It makes difficult for participant to modify blocks and recalculating hashes.
*   It is based on bulletproof cryptography instead of anonymous participant to verify transactions.

## 7\. Miners

Miners are special participants who calculate the Proof-of-work to mine new blocks.

## **8\. Nonce**

A number to be guessed by miners which when combined with the block produces an acceptable hash.

## **9\. Longest Chain**

The most trusted chain with the largest amount of computational work done in calculating the Proof-of-Work.
