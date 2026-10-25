const express = require('express');
const router = express.Router();
const { checkHardRules, checkAIReview } = require('../riskGuard');

router.get('/', (req, res) => {
  res.json(req.app.locals.db.intents || []);
});

router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { amount, description, justification } = req.body;
  
  const policy = db.policies[0];
  if (!policy) {
    return res.status(400).json({ error: 'Create policy first via POST /policies' });
  }

  const monthlySpent = db.transactions
    .filter(t => t.status === 'Approved')
    .reduce((sum, t) => sum + t.amount, 0);

  let hardCheck = checkHardRules(amount, policy, monthlySpent);
  let status = 'Approved';
  let reason = 'Auto-approved - within policy';

  if (hardCheck.decision === 'denied') {
    status = 'Denied';
    reason = hardCheck.reason;
  } else {
    let aiCheck = checkAIReview(description || '', justification || '');
    if (aiCheck.decision === 'escalated') {
      status = 'Escalated';
      reason = aiCheck.reason;
    }
  }

  const tx = {
    id: Date.now().toString(),
    amount,
    description,
    justification,
    status,
    reason,
    created_at: new Date()
  };

  db.intents.push(tx);
  db.transactions.push(tx);

  res.json(tx);
});

module.exports = router;