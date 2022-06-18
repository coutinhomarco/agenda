/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [token, setToken] = useState();
  const [contacts, setContacts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');

  const [inputDetails, setInputDetails] = useState({});

  const CONTEXT_VALUE = {
    token,
    setToken,
    contacts,
    setContacts,
    userDetails,
    setUserDetails,
    taskEndDate,
    setTaskEndDate,
    inputDetails,
    taskStartDate,
    setTaskStartDate,
    setInputDetails,

  };

  return (
    <Context.Provider value={CONTEXT_VALUE}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
