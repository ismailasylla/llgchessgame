var express = require('express');
var router = express.Router();
var contractService = require('../services/contractService.js');

const isValidAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

router.get('/getBalance', async (req, res) => {
  const account = req.query.account;

  if (!isValidAddress(account)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid account address' });
  }

  try {
    const balance = await contractService.getContractBalance();
    console.log('Balance of the contract is', balance);
    res.json({ success: true, balance: balance });
  } catch (error) {
    console.error('Error retrieving balance: ', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve balance' });
  }
});

router.get('/', function (req, res, next) {
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
