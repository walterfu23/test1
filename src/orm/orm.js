import { ORM } from 'redux-orm';
import BizDoc from './modelBizDoc';
import BizDocRev from './modelBizDocRev';
import BizDocRevPage from './modelBizDocRevPage';
import BizPageField from './modelBizPageField';

const orm = new ORM();
orm.register(
  BizDoc,
  BizDocRev, 
  BizDocRevPage,
  BizPageField, 
);

export default orm;
