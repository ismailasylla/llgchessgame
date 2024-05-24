var express = require('express');
var Web3 = require('web3');
var util = require('../config/util.js');
var router = express.Router();

let contractABI = require('../contracts/contractAbi.js');

let web3 = new Web3('https://bsc-dataseed.binance.org/');

let contractAddress = '0x4691f60c894d3f16047824004420542e4674e621';

let contract = new web3.eth.Contract(contractABI, contractAddress);

router.get('/play', async (req, res) => {
  try {
    let result = await contract.methods
      .balanceOf('0x4691F60c894d3f16047824004420542E4674E621')
      .call();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', function (req, res) {
  res.render('partials/play', {
    title: 'Chess Hub - Game',
    user: req.user,
    isPlayPage: true,
  });
});

router.post('/', function (req, res) {
  var side = req.body.side;
  //var opponent = req.body.opponent; // playing against the machine in not implemented
  var token = util.randomString(20);
  res.redirect('/game/' + token + '/' + side);
});

module.exports = router;
