import { Canister,Variant,text, update, Void, nat32, blob, Vec, nat64 } from 'azle';
import {query} from 'azle'
const Approval = Variant({
  from: text,
  to: text,
  value: nat64,
});

// type app

// Define an array to store approvals
let approvals: Array<any> = [];

export default Canister({
  // Adds an approval to the end of the array
  addApproval: update([blob], Void, (approval: any) => {
    approvals.push(approval); // This change will be persisted
  }),

  // Removes the very first element of the array and returns it
  executeApproval: query([], Approval, () => {
    if (approvals.length > 0) {
      const executedApproval = approvals.shift();
      return executedApproval;
    } else {
      return null;
    }
}),
  

  // Returns the recent n approvals
  readApprovals: query([nat32], Vec(Approval), (n) => {
    if (n <= approvals.length) {
      return approvals.slice(-n);
    } else {
      return [];
    }
  }),
});
