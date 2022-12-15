import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormInputStyled,
  FormStyled,
  FormLabelStyled,
  BtnStyled,
} from './ContactForm.styled';

import { useState } from 'react';

export function ContactForm({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChangeName = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleChangeNumber = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onFormSubmit({ name: name, number: number });
    reset();
  };

  return (
    <FormStyled onSubmit={handleFormSubmit}>
      <FormLabelStyled htmlFor={nameInputId}>Name</FormLabelStyled>
      <FormInputStyled
        id={nameInputId}
        type="text"
        name="name"
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={name}
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChangeName}
      />

      <FormLabelStyled htmlFor={numberInputId}>Number</FormLabelStyled>
      <FormInputStyled
        id={numberInputId}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        value={number}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChangeNumber}
      />

      <BtnStyled type="submit">Add contact</BtnStyled>
    </FormStyled>
  );
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
