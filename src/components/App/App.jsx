import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { Contacts } from 'components/ContactList/ContactList';
import { AppContainer, Title } from './App.styled';
import { Filter } from 'components/Filter/Filter';
// import initialContacts from '../initialContacts.json';
// import { useLocalStorage } from 'hooks/useLocalStorage';

const GET_LS_CONTACTS = JSON.parse(localStorage.getItem('contacts'));

export function App() {
  // const [contacts, setContacts] = useState(GET_LS_CONTACTS ?? initialContacts);
  const [contacts, setContacts] = useState(GET_LS_CONTACTS ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    // console.log(e.target);
    const { value } = e.target;
    setFilter(value);
  };

  const addNewContact = e => {
    // console.log(e);

    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (
      contactsLists.find(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.warn(`${name} is already in contacts.`);
    } else if (contactsLists.find(contact => number === contact.number)) {
      toast.warn(`${number} is already in contacts.`);
    } else {
      contactsLists.push({ id, name, number });
    }

    setContacts(contactsLists);
  };

  const handleDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });

    return filterContactsList === []
      ? toast.info('No results find')
      : filterContactsList;
  };
  // console.log(getFilteredContacts());

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm onFormSubmit={addNewContact}></ContactForm>

      <Title as="h2">Contacts</Title>
      <Filter filter={filter} handleChange={handleChange}></Filter>

      {getFilteredContacts().length === 0 ? (
        <p>No contacts</p>
      ) : (
        <Contacts
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        ></Contacts>
      )}

      <ToastContainer position="top-center" autoClose={4000} theme="colored" />
    </AppContainer>
  );
}
