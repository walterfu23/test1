import { ORM } from 'redux-orm';
import BizDoc from './modelBizDoc';
import BizDocRev from './modelBizDocRev';
import BizDocRevPage from './modelBizDocRevPage';
import BizPageField from './modelBizPageField';
import TopLevelList from './modelTopLevelList';
import Job from './modelJob';
import Category from './modelCategory';
import SubCategory from './modelSubCategory';

const orm = new ORM();
orm.register(
  BizDoc,
  BizDocRev, 
  BizDocRevPage,
  BizPageField, 
  TopLevelList,
  Job,
  Category,
  SubCategory,
);

export default orm;
