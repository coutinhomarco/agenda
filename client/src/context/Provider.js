/* eslint-disable react/prop-types */
/* eslint-disable react/no-typos */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [token, setToken] = useState();
  const CONTEXT_VALUE = {
    token, setToken,
  };

  return (
    <Context.Provider value={CONTEXT_VALUE}>
      {children}
    </Context.Provider>
  );
}
Provider.proptypes = {
  children: PropTypes.node,
};
