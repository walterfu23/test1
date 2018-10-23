import { ORM } from 'redux-orm';
import BizDoc from './modelBizDoc';
import BizDocRev from './modelBizDocRev';
import BizDocRevPage from './modelBizDocRevPage';
import BizPageField from './modelBizPageField';
import TopLevelList from './modelTopLevelList';
import Category from './modelCategory';
import SubCategory from './modelSubCategory';
import Job from './modelJob';
import JobTopLevelList from './modelJobTopLevelList';

const orm = new ORM();
orm.register(
  BizDoc,
  BizDocRev, 
  BizDocRevPage,
  BizPageField, 
  TopLevelList,
  Category,
  SubCategory,
  Job,
  JobTopLevelList,
);

export default orm;
