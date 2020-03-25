pragma solidity 0.4.25;

contract Bank {
    int256 bal;

    constructor() public {
        bal = 1;
    }

    function getBalance() public view returns (int256) {
        return bal;
    }

    function widraw(int256 amt) public {
        bal = bal - amt;

    }

    function deposit(int256 amt) public {
        bal = bal + amt;
    }
}
