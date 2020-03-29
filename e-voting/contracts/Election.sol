pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Candidate Model
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Map (like associative array) to store data in key value pair
    mapping(address => bool) public voters;
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

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender], "Already voted");
        require(
            _candidateId > 0 && _candidateId <= candidateCount,
            "Not a valid candidate"
        );
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }

}
