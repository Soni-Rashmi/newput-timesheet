import React, { Component } from 'react';
import Select from 'react-select';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import 'react-select/dist/react-select.css';

export default class ReactMultiSelect extends Component {
  constructor(props) {
    super(props);
    this.changeSelectedOption = this.changeSelectedOption.bind(this);
    this.state = {
      selectedOption: ''
    }
  }
  changeSelectedOption(selectedOption) {
    this.props.input.onChange(selectedOption);
    this.setState({ selectedOption });
  }

  render() {
    const {input, children, label, name, meta: {touched, error }} = this.props;

    return (
      <FormGroup className='col-sm-6'>
        <ControlLabel>{label}</ControlLabel>
        <Select
          name={this.props.input.name}
          value={this.state.selectedOption}
          onChange={this.changeSelectedOption}
          multi={true}
          options= {children}
          id={label}
          simpleValue={true}
          className= {(touched && error) ? 'select-error': null}
        />
      </FormGroup>
    );
  }
}
