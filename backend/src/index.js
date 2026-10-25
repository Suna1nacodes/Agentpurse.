const express = require('express');
const cors = require('cors');

const policiesRoute = require('./routes/policies');
const agentsRoute = require('./routes/agents');
const purchaseRoute = require('./routes/purchase-intents');
const transactionsRoute = require('./routes/transactions');

const app = express();

// Middleware - MUST be before routes
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Agentpurse API running');
});

// Routes
app.use('/policies', policiesRoute);
app.use('/agents', agentsRoute);
app.use('/v1/purchase-intents', purchaseRoute);
app.use('/transactions', transactionsRoute);
app.use('/policies', policiesRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});