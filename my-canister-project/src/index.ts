import { Canister, Variant, text, Principal, update, Void, nat32, blob, Vec, nat64, CandidType } from 'azle';
import { query } from 'azle';

const Approvalv = Variant({
  from: text,
  to: text,
  value: nat64,
});

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
    approvals.push(approval); // This change will be persisted
  }),

  // Removes the very first element of the array and returns it
  executeApproval: query([], Approvalv | Void, () => {
    if (approvals.length > 0) {
      const executedApproval = approvals.splice(0, 1)[0];
      return executedApproval;
    } else {
      return Void;
    }
  }),

  // Returns the recent n approvals
  readApprovals: query([nat32], Approvalv, async (n) => {
    if (n <= approvals.length) {
      return Vec.from(approvals.slice(-n));
    } else {
      return Vec.empty();
    }
  }),
});
