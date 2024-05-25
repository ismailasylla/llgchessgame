// routes/contractRoutes.js
var express = require('express');
var router = express.Router();
var contractService = require('../services/contractService.js');

// Validate Ethereum address
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

module.exports = router;
