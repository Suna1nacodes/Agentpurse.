function checkHardRules(amount, policy, monthlySpent) {
  if (!policy) return { decision: 'denied', reason: 'No policy found' };
  if (amount > policy.per_purchase_cap) {
    return { decision: 'denied', reason: 'Over per_purchase_cap $' + policy.per_purchase_cap };
  }
  if (monthlySpent + amount > policy.monthly_budget) {
    return { decision: 'denied', reason: 'Over monthly budget $' + policy.monthly_budget };
  }
  return { decision: 'ok' };
}

function checkAIReview(description, justification) {
  const text = (description + ' ' + justification).toLowerCase();
  if (text.includes('ignore previous') || text.includes('gift card') || text.includes('urgent wire') || text.includes('ceo')) {
    return { decision: 'escalated', reason: 'Suspicious instruction' };
  }
  return { decision: 'approved', reason: 'AI review passed' };
}

module.exports = { checkHardRules, checkAIReview };