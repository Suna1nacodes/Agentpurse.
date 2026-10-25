const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const newPolicy = {
    id: Date.now().toString(),
    name: req.body.name || 'Default Policy',
    monthly_budget: req.body.monthly_budget || 500,
    per_purchase_cap: req.body.per_purchase_cap || 100,
    allowed_categories: req.body.allowed_categories || ['software','api','services'],
    velocity_limit: req.body.velocity_limit || 10,
    monthlySpent: 0,
    createdAt: new Date()
  };
  db.policies.push(newPolicy);
  res.json(newPolicy);
});
router.get('/', (req, res) => {
  res.json(req.app.locals.db.policies);
});
router.get('/:id', (req, res) => {
  const policy = req.app.locals.db.policies.find(p => p.id === req.params.id);
  if (!policy) return res.status(404).json({ error: 'Policy not found' });
  res.json(policy);
});
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const policy = db.policies.find(p => p.id === req.params.id);
  if (!policy) return res.status(404).json({ error: 'Not found' });
  Object.assign(policy, req.body);
  res.json(policy);
});
router.get('/:id/spending', (req, res) => {
  const db = req.app.locals.db;
  const policy = db.policies.find(p => p.id === req.params.id);
  if (!policy) return res.status(404).json({ error: 'Not found' });
  
  const transactions = db.transactions.filter(t => t.policyId === req.params.id && t.status === 'Approved');
  const monthlySpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  res.json({
    policyId: policy.id,
    monthly_budget: policy.monthly_budget,
    monthlySpent,
    remaining: policy.monthly_budget - monthlySpent,
    burnDown: transactions .map(t => ({ date: t.createdAt, amount: t.amount }))
  });
});

module.exports = router;