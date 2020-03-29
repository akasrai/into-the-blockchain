var Election = artifacts.require('./Election.sol');

contract('Election', function(accounts) {
  it('initialise two candidates', function() {
    return Election.deployed()
      .then(function(instance) {
        var candidates = ['Akash Rai', 'Bikash Rai'];
        for (let i = 0; i < instance.candidateCount(); i++) {
          instance.candidates(i).then(function(candidate) {
            assert.equal(candidate.name, candidates[i]);
          });
        }

        return instance.candidateCount();
      })
      .then(function(count) {
        assert.equal(count, 2);
      });
  });

  it('initialise the correct values', function() {
    return Election.deployed()
      .then(function(instance) {
        candidateInstance = instance;
        return candidateInstance.candidates(1);
      })
      .then(function(candidate) {
        assert.equal(candidate[0], 1, 'contains correct id');
        assert.equal(candidate[1], 'Akash Rai', 'contains correct name');
        assert.equal(candidate[2], 0, 'contains correct vote count');

        return candidateInstance.candidates(2);
      })
      .then(function(candidate) {
        assert.equal(candidate[0], 2, 'contains correct id');
        assert.equal(candidate[1], 'Bikash Rai');
        assert.equal(candidate[2], 0, 'contains correct vote count');
      });
  });
});
