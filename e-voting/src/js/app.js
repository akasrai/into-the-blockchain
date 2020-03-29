App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    ethereum.enable();

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Election.json', function(election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      App.listenForEvents();

      return App.render();
    });
  },

  casteVote: function() {
    var candidateId = $('#candidatesSelector').val();
    App.contracts.Election.deployed()
      .then(function(instance) {
        return instance.vote(candidateId, { from: App.account });
      })
      .then(function() {
        $('#content').hide();
        $('#loader').show();
      })
      .catch(function(error) {
        console.error(error);
      });
  },

  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      instance
        .votedEvent(
          {},
          {
            fromBlock: 0,
            toBlock: 'latest'
          }
        )
        .watch(function(error, event) {
          console.log('voted event is triggred', event);
          App.render();
        });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err == null) {
        App.account = account;
        $('#accountAddress').html(`Your account is ${account}`);
      }
    });

    App.contracts.Election.deployed()
      .then(function(instance) {
        electionInstance = instance;

        return electionInstance.candidateCount();
      })
      .then(function(count) {
        var candidateResults = $('#candidatesResults');
        var candidateSelector = $('#candidatesSelector');

        candidateResults.empty();
        candidateSelector.empty();

        for (var i = 1; i <= count; i++) {
          electionInstance.candidates(i).then(function(candidate) {
            if (candidateResults[0].rows.length == count) {
              candidateResults.empty();
              candidateSelector.empty();
            }

            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];

            var candidateOption = `<option value='${id}'>${name}</option>`;
            var candidateTemplate = `<tr><th>${id}</th><th>${name}</th><th>${voteCount}</th></tr>`;

            candidateSelector.append(candidateOption);
            candidateResults.append(candidateTemplate);
          });
        }

        return electionInstance.voters(App.account);
      })
      .then(function(hasVoted) {
        if (hasVoted) $('form').hide();

        loader.hide();
        content.show();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
