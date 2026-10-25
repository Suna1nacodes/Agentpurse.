# Agentpurse — Live Monitor 🟢🔴🟡
Real-time AI agent purchase monitoring with hard-rule + AI injection defense.

**Backend:** localhost:3000 | **Frontend:** localhost:5173 | **Total: 5 transactions**

## 🟢🔴🟡 Live Demo

### Dashboard - All 3 Scenarios Working!
![Dashboard](./dashboard.png)

### Architecture - How It Works
![Architecture](./image-1.png)

## 30-Second Judge Demo

1. **Create Policy (max $1000 cap):**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/policies -Method POST -ContentType "application/json" -Body '{"name":"Hackathon Policy","monthly_budget":5000,"per_purchase_cap":1000,"allowed_categories":["coffee","laptop","flight"],"velocity_limit":10}'# Agentpurse — Live Monitor 🟢🔴🟡
Real-time AI agent purchase monitoring with hard-rule + AI injection defense.

**Backend:** localhost:3000 | **Frontend:** localhost:5173 | **Total: 5 transactions**

## 🟢🔴🟡 Live Demo

### Dashboard - All 3 Scenarios Working!
![Dashboard](./dashboard.png)

### Architecture - How It Works
![Architecture](./image-1.png)

## 30-Second Judge Demo

1. **Create Policy (max $1000 cap):**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/policies -Method POST -ContentType "application/json" -Body '{"name":"Hackathon Policy","monthly_budget":5000,"per_purchase_cap":1000,"allowed_categories":["coffee","laptop","flight"],"velocity_limit":10}'
