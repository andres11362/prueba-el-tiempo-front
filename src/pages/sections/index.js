/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { sections } from '../../api/sections';
import { apiKey } from '../../constants/apiKey';
import Tabla from '../../components/tables';
import Loader from '../../utils/loader';
import NotificationModal from '../../components/modals/notificationModal';

const Sections = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1)
    const [notificationModal, setNotificationModal] = useState({
        open: false,
        message: '',
        action: ''
    })
    const [idRow, setIdRow] = useState('');

    const setOpenNotificationModal = (message, action, id = '') => {
        setNotificationModal({
            ...notificationModal,
            open: true,
            message,
            action
        });

        setIdRow(id);
    }

    const setCloseNotificationModal = () => {
        setNotificationModal({
            ...notificationModal,
            open: false,
            message: '',
            action: ''
        });

        setIdRow('');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    }

    const getDataTable = () => {
        axios.get(`${sections}?page=${currentPage}`, config)
            .then(res => {
                const { data } = res;
                setHeaders(Object.values(data.headers));
                setData(data.secciones);
            }).catch(err => {
                console.error(err);
            });
    }

    const deleteNoticia = (id) => {

        const endpoint = `${sections}/${id}`;

        axios.delete(endpoint, config)
            .then(res => {
                const { data } = res;
                setCloseNotificationModal();
                setCurrentPage(1);
                setTimeout(() => {
                    setOpenNotificationModal(data.message, 'notification');
                }, 3000);
            }).catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        setData({});
        getDataTable();
    }, [currentPage]);

    return (
        <>
            {(data && Object.keys(data).length > 0) ? (
                <Tabla
                    headers={headers}
                    rows={data}
                    type="sections"
                    changePage={setCurrentPage}
                    page={currentPage}
                    handleDelete={deleteNoticia}
                    setNotificationModal={setOpenNotificationModal}
                    setCloseNotificationModal={setCloseNotificationModal}
                />
            ) :
                <Loader />
            }
            <NotificationModal
                open={notificationModal.open}
                setOpen={setOpenNotificationModal}
                setClose={setCloseNotificationModal}
                message={notificationModal.message}
                action={notificationModal.action}
                id={idRow}
                handleDelete={deleteNoticia}
            />
        </>
    );
}

export default Sections;