import React from 'react'
import { ContactType } from '../../types';

const COLUMNS = [
    {
        name: 'Full Name',
        selector: (row: { firstName: any, lastName: any }) => `${row.firstName} ${row.lastName}`,
    },
    {
        name: 'Email Adress',
        selector: (row: { email: any; }) => row.email,
    },
    {
        name: 'Phone',
        selector: (row: { phone: any; }) => row.phone,
    },
    {
        name: 'Gender',
        selector: (row: { gender: any; }) => row.gender,
    },
    {
        name: 'City',
        selector: (row: { city: any; }) => row.city,
    },
    {
        name: 'Date Of Birth',
        selector: (row: { dateOfBirth: any; }) => row.dateOfBirth,
    },
    {
        name: 'Nationality',
        selector: (row: { nationality: any; }) => row.nationality,
    }
];

interface RecordsProps {
    data: ContactType[];
    handleRowClicked: (selectedRow: any) => void;
}
const Records = (props: RecordsProps) => {

    const handleClick = (item: any) => {
        props.handleRowClicked(item);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    {COLUMNS.map((col, index) => <th key={index}>{col.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                    <tr onClick={() => handleClick(item)}>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                        <td>{item.city}</td>
                        <td>{item.dateOfBirth}</td>
                        <td>{item.nationality}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Records;