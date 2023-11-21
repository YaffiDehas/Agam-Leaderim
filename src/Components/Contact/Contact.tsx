import React from 'react';
import moment from 'moment';
import { ContactType } from '../../types';
import './Contact.css';

interface ContactProps {
  onHide: () => void;
  handleClearSelect: () => void;
  show: boolean | undefined;
  contact: ContactType | undefined;
}

function Contact(props: ContactProps) {
const {contact} = props;
console.log(contact);

function handleClose() {
  props.onHide();
  props.handleClearSelect();
}

  return (
    <div className='contact'>
          <img src={contact && contact && contact.picture} alt="Image" />
          <p>{contact && contact.firstName} {contact && contact.lastName}</p>

        <div className='details'>
          <span><b>Email Adress: </b></span><span>{contact && contact.email} </span>
          <span><b>Phone: </b></span><span>{contact && contact.phone} </span>
          <span><b>Gender: </b></span><span>{contact && contact.gender} </span>
        </div>
        <div className='details'>
        <span><b>City: </b></span><span>{contact && contact.city} </span>
        <span><b>Date of birth: </b></span><span>{moment(contact && contact.dateOfBirth).format('DD MMM, YYYY')} </span>
        <span><b>Nationlity: </b></span><span>{contact && contact.nationality} </span>
        </div>

        <button onClick={handleClose}>Close</button>
    
    </div>
  );
}

export default Contact;
