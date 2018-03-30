import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {  FormGroup, ControlLabel } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

export default class ReactDatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {}
  }

  handleChange(date) {
    this.props.input.onChange(moment(date).format('DD-MM-YYYY'))
    this.setState({
      startDate: date
    });
  }
  render() {
    const {input, label, placeholder, maxDate, minDate, meta: { touched, error, } } = this.props;
    return (
      <FormGroup className="col-sm-6" validationState={ (touched && error) ? 'error': null}>
        <ControlLabel >{label}</ControlLabel>
          <DatePicker {...input}
            placeholderText={placeholder}
            dateForm='DD-MM-YYYY'
            maxDate={maxDate}
            minDate={minDate}
            selected={this.state.startDate}
            onChange={this.handleChange}
            className='form-control'
          />
      </FormGroup>
    );
  }
}
