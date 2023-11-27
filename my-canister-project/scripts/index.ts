//to modify when  the debugging of the deployment ofd canister finishes
const azle = require('azle');

const canisterId = 'br5f7-7uaaa-aaaaa-qaaca-cai'; // Replace with your canister ID

const canister = azle.createCanister(canisterId);

canister.call('addApproval', {
  from: 'user1',
  to: 'user2',
  value: 100,
});

const approval = canister.query('executeApproval');
console.log('Executed approval:', approval);

const recentApprovals = canister.query('readApprovals', [2]);
console.log('Recent approvals:', recentApprovals);
