import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selector';
import contactsTemplate from '../data/contactsTemplate.json';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import MainTitle from './MainTitle/MainTitle';
import { addContact } from 'redux/contacts/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [showTemplate, setShowTemplate] = useState(contacts.length === 0);

  useEffect(() => {
    if (showTemplate) {
      setTimer(3);
      setTimeout(() => {
        setShowTemplate(false);
        contactsTemplate.forEach(contact => {
          dispatch(addContact(contact));
        });
      }, 3000);
    }
  }, [dispatch, showTemplate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="container">
      <MainTitle title="Phonebook" />
      <ContactForm />
      <MainTitle title="Contacts" />
      <Filter />
      {showTemplate ? (
        <>
          <p>
            You don't have any saved contacts, templates for contacts will be
            loaded
          </p>
          <p>{timer}</p>
        </>
      ) : (
        <ContactList />
      )}
    </div>
  );
};
