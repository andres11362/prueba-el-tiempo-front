/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { news } from '../../api/news';
import { apiKey } from '../../constants/apiKey';
import Tabla from '../../components/tables';
import Loader from '../../utils/loader';

const News = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1)

    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    }

    const getDataTable = () => {
        axios.get(`${news}?page=${currentPage}`, config)
        .then(res => {
            const { data } = res;
            setHeaders(Object.values(data.headers));
            setData(data.noticias);
        }).catch(err => {
            console.error(err);
        });
    }

    const deleteNoticia = (id) => {

        const endpoint = `${news}/${id}`;

        axios.delete(endpoint, config)
        .then(res => {
            console.log(res.data);
            setCurrentPage(1);
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        setData({});
        getDataTable();
    }, [currentPage]);
    
    return(
        <>
            { (data && Object.keys(data).length > 0) ? 
                (<Tabla headers={headers} rows={data} type="news" changePage={setCurrentPage} page={currentPage} handleDelete={deleteNoticia} />)
            : 
            <Loader /> }
        </>
    );
}

export default News;