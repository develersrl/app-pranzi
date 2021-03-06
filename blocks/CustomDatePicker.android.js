'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  DatePickerAndroid,
} from 'react-native';

import { uiblocks } from '../globstyle';

import { formatTimeParts } from '../utils.js';

import I18n from 'react-native-i18n';

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.onSelectDatePressed = this.onSelectDatePressed.bind(this);
  }

  onSelectDatePressed() {
    try {
      const { date, minDate, maxDate } = this.props;
      const opts = {
        date: date
      };

      if (minDate) {
        opts.minDate = minDate;
      }

      if (maxDate) {
        opts.maxDate = maxDate;
      }

      DatePickerAndroid.open(opts)
        .then((result) => {
          const {action, year, month, day} = result;

          if (action !== DatePickerAndroid.dismissedAction) {
            this.props.onSelected(new Date(year, month, day));
          }
        }, (error) => {
          console.error('Error on datePicker ', error);
        });
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    const { date, disabled } = this.props;

    const day = formatTimeParts(date.getDate());
    const month = formatTimeParts((date.getMonth() + 1));
    const year = date.getFullYear();

    const dateString = date.toDateString() === new Date().toDateString() ? I18n.t('today') : day + '/' + month + '/' + year;

    const style = [defaultStyle.button, disabled ? defaultStyle.disabled : null];

    return (
        <TouchableOpacity 
          style={style}
          onPress={this.onSelectDatePressed}
          disabled={ disabled }>
          <Text style={defaultStyle.text}>{dateString}</Text>
        </TouchableOpacity>
    );
  }
}

CustomDatePicker.propTypes = {
  navigator: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

const { enabled, disabled, text } = uiblocks.button;

const defaultStyle = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 10,
    ...enabled
  },
  disabled: {
    ...disabled
  },
  text: {
    alignSelf: 'center',
    ...text
  }
});
