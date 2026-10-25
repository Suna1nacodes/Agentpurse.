const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const newAgent = {
    id: Date.now().toString(),
    name: req.body.name || 'Demo Agent',
    policyId: req.body.policyId,
    apiKey: 'ap_sk_' + Math.random().toString(36).substring(2, 15),
    createdAt: new Date()
  };
  db.agents.push(newAgent);
  res.json(newAgent);
});

router.get('/', (req, res) => {
  res.json(req.app.locals.db.agents);
});

module.exports = router;