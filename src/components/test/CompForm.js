import React from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';

import countries from './countries';

class CompForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    };
  }
  render() {
    return (
      <div >
        <form >
          <Input
            required={true}
          />
          <DropDownList
            required={true}
            data={countries}
            style={{ width: '100%' }}
          />
          <Button primary={true}>
          Submit
          </Button>
        </form>

      </div>
    );
  }

}

export default CompForm;
