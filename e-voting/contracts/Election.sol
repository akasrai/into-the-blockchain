pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Candidate Model
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCOunt;
    }

    // Map (like associative array) to store candidates in key value pair
    mapping(uint256 => Candidate) public candidates;

    uint256 public candidateCount;

    constructor() public {
        addCandidate("Akash Rai");
        addCandidate("Bikash Rai");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

}
