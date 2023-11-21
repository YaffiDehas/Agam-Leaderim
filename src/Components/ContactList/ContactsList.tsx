import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import Contact from '../Contact/Contact';
import { ContactType } from '../../types';
import './ContactList.css';
import Records from '../Table/Records';
import Pagination from '../Table/Pagination';

const NATIONALITY = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US'];

function ContactsList() {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [selectedContact, setSelectedContact] = useState<ContactType>();
    const [modalShow, setModalShow] = React.useState(false);
    const [seed, setSeed] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
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
                    {/* <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={NATIONALITY[0]}
                        isRtl={true}
                        isSearchable={true}
                        name="color"
                        options={NATIONALITY}
                        onChange={(e) => handleNatSelect(e)}
                    /> */}
                </div>
                {/* <Table data={contacts}/> */}
                <Records data={currentRecords} handleRowClicked={(e) => handleRowSelect(e)} />
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {/* <DataTable columns={columns} data={contacts} selectableRows onSelectedRowsChange={(e)=> handleRowSelect(e)} pagination /> */}
            {modalShow && <Contact show={modalShow} contact={selectedContact} onHide={() => setModalShow(false)} handleClearSelect={handleClearSelect} />}
        </>
    );
}

export default ContactsList;
