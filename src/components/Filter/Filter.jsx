import React from 'react';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { inputFilter } from 'redux/filterSlice.js/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handlerInputFilter = e => {
    const { value } = e.target;
    dispatch(inputFilter(value));
  };

  return (
    <label className={css.label}>
      Find contacts by name:
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={handlerInputFilter}
      />
    </label>
  );
};

export default Filter;
