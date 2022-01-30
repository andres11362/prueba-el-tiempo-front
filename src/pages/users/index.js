/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { users } from '../../api/users';
import { apiKey } from '../../constants/apiKey';
import Tabla from '../../components/tables';
import Loader from '../../utils/loader';

const Users = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1)

    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    }

    const getDataTable = () => {
        axios.get(`${users}?page=${currentPage}`, config)
        .then(res => {
            const { data } = res;
            setHeaders(Object.values(data.headers));
            setData(data.users);
        }).catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        setData({});
        getDataTable();
    }, [currentPage]);
    
    return(
        <>
            { (data && Object.keys(data).length > 0) ? (<Tabla headers={headers} rows={data} type="users" changePage={setCurrentPage} page={currentPage} />) : <Loader /> }
        </>
    );
}

export default Users;