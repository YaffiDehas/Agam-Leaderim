import React from 'react'
import moment from 'moment';
import { ContactType } from '../../types';

const COLUMNS = ['Full Name','Email Adress','Phone', 'Gender','City','Date Of Birth','Nationality'];

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
                    {COLUMNS.map((col, index) => <th key={index}>{col}</th>)}
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
                        <td>{moment(item && item.dateOfBirth).format('DD MMM, YYYY')}</td>
                        <td>{item.nationality}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Records;