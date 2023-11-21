import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contact from '../Contact/Contact';
import { ContactType } from '../../types';
import Records from '../Table/Records';
import Pagination from '../Table/Pagination';
import './ContactList.css';

const NATIONALITY = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US'];

function ContactsList() {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [selectedContact, setSelectedContact] = useState<ContactType>();
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [seed, setSeed] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage] = useState<number>(10);
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = contacts.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(contacts.length / recordsPerPage);

    const getData = async (nat: string) => {
        const { data } = await axios.get(`https://randomuser.me/api/?results=100&seed=${seed}&nat=${nat}`);
        const mappedContacts: any = [];
        data.results.map((result: any) => {
            const contact = {
                id: result.login.uuid,
                firstName: result.name.first,
                lastName: result.name.last,
                email: result.email,
                phone: result.phone,
                gender: result.gender,
                city: result.location.city,
                dateOfBirth: result.dob.date,
                nationality: result.nat,
                picture: result.picture.medium
            };
            mappedContacts.push(contact)
        });
        setContacts(mappedContacts);
        setSeed(data.info.seed);
    };

    useEffect(() => {
        getData('');
    }, []);

    const handleClearSelect = () => {
        setSelectedContact(undefined);
    }

    const handleRowSelect = (selectedRow: any) => {
        setSelectedContact(selectedRow);
        setModalShow(true);
    }
    const handleNatSelect = (e: any) => {
        getData(e.target.value);

    };
    return (
        <>
            <div className="contactList">
                <div className='select'>
                    <select onChange={handleNatSelect}>
                        {NATIONALITY.map((nat, index) =>{
                            return <option key={index}>{nat}</option>
                        })}
                    </select>
                </div>
                <Records data={currentRecords} handleRowClicked={(e) => handleRowSelect(e)} />
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {modalShow && <Contact show={modalShow} contact={selectedContact} onHide={() => setModalShow(false)} handleClearSelect={handleClearSelect} />}
        </>
    );
}

export default ContactsList;
