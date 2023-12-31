import { Canister, Variant, text, Principal, update, Void, nat32, blob, Vec, nat64, CandidType } from 'azle';
import { query } from 'azle';

interface Approval {
  from: string;
  to: string;
  value: number;
}

// Define an array to store approvals
let approvals: Approval[] = [];

export default Canister({
  // Actor control to restrict access to the person who deployed the canister
  // (principal = principal-id):

  // Adds an approval to the end of the array
  addApproval: update([blob], Void, (approval: any) => {
    approvals.push(approval);
  }),

  // Returns the recent n approvals
  readApprovals: query([nat32], Approval, async (n) => {
    if (n <= approvals.length) {
      const recentApprovals = approvals.slice(-n);
      const serializedApprovals: Approval[] = [];
      for (const approval of recentApprovals) {
        serializedApprovals.push({
          from: approval.from,
          to: approval.to,
          value: approval.value,
        });
      }
      return serializedApprovals;
    } else {
      //not enough size of the array, hence returning complete array
      return approvals;
    }
  }),
});
