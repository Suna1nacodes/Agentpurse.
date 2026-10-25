const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let tx = req.app.locals.db.transactions;
  // Filters for Live Monitor
  if (req.query.status) tx = tx.filter(t => t.status === req.query.status);
  if (req.query.agentId) tx = tx.filter(t => t.agentId === req.query.agentId);
  res.json(tx);
});

module.exports = router;