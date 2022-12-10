import { nanoid } from 'nanoid';

import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { Contacts } from 'components/ContactList/ContactList';
import { AppContainer, Title } from './App.styled';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  // static defaultProps = {
  //   initialContacts: [],
  // };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorageContacts);
    // якщо користувач зайшов на сайт перший раз, то перевіряємо, чи є щось у локалі за нвшим ключем. Якщо є - то записуємо те значення, якщо немає, то ставимо дефолтні значення
    if (localStorageContacts !== null) {
      return this.setState({ contacts: parsedContacts });
    }
    // this.setState({ contacts: this.props.initialContacts });
  }

  componentDidUpdate(_, prewState) {
    const { contacts } = this.state;
    if (contacts !== prewState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addNewContact = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (
      contactsLists.find(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });

    return filterContactsList;
  };

  render() {
    return (
      <AppContainer>
        <Title>Phonebook</Title>
        <ContactForm onFormSubmit={this.addNewContact}></ContactForm>

        <Title as="h2">Contacts</Title>
        <Filter
          filter={this.state.filter}
          handleChange={this.handleChange}
        ></Filter>
        <Contacts
          contacts={this.getFilteredContacts()}
          handleDelete={this.handleDelete}
        ></Contacts>
      </AppContainer>
    );
  }
}
