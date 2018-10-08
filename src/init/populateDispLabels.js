import { createBizDocRevTreeSelector } from '../selectors/selectBizDocRev';
import createBizDocRevPageTreeSelector from '../selectors/selectBizDocRevPage';
import createBizPageFieldTreeSelector from '../selectors/selectBizPageField';

const populateDispLabelsRev = (store) => {
  const state = store.getState();
  const revs = createBizDocRevTreeSelector(state.orm);
  const i = 123;
}
const populateDispLabels = (store) => {
  populateDispLabelsRev(store);
}

export default populateDispLabels;
