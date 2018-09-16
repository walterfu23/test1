import { ORM } from 'redux-orm';
import BizDoc from './modelBizDoc';
import BizDocRev from './modelBizDocRev';
import BizDocRevPage from './modelBizDocRevPage';

const orm = new ORM();
orm.register(
  BizDoc,
  BizDocRev, 
  BizDocRevPage 
);

export default orm;
