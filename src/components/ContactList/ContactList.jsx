import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsSlice';
import { getContacts, getFilter } from 'redux/selector';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filterContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };
  const contactsList = filterContacts();

  return (

    <ul className={css.list}>
      {contactsList.map(contact => {
        const { id, name, number } = contact;
        return (
          <li className={css.item} key={id}>
            <span className={css.name}>{name} :</span>
            <span className={css.nameNumber}>{number}</span>
            <button className={css.delete_btn} type="button" onClick={() => dispatch(deleteContact(id))}>
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
