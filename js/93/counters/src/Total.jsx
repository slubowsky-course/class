import React from 'react';
import {PropTypes} from 'prop-types';

export default function Total(prop) {
  return (
    <div>Total - {prop.total}</div>
  )
}

Total.propTypes = {
  total: PropTypes.number.isRequired
}
