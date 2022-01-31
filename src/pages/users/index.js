/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { users } from '../../api/users';
import Tabla from '../../components/tables';
import Loader from '../../utils/loader';
import NotificationModal from '../../components/modals/notificationModal';

/**
   * Pagina que llama el componente tabla
   * para usuarios
   * @param {*} props 
   * @returns 
*/
const Users = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationModal, setNotificationModal] = useState({
        open: false,
        message: '',
        action: ''
    });

    const setOpenNotificationModal = (message, action, id = '') => {
        setNotificationModal({
            ...notificationModal,
            open: true,
            message,
            action
        });
    }

    const setCloseNotificationModal = () => {
        setNotificationModal({
            ...notificationModal,
            open: false,
            message: '',
            action: ''
        });
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
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

    return (
        <>
            {(data && Object.keys(data).length > 0) ?
                (
                    <Tabla
                        headers={headers}
                        rows={data}
                        type="users"
                        changePage={setCurrentPage}
                        page={currentPage}
                        setNotificationModal={setOpenNotificationModal}
                        setCloseNotificationModal={setCloseNotificationModal}
                    />
                ) 
                : 
                <Loader />
            }
             <NotificationModal
                open={notificationModal.open}
                setOpen={setOpenNotificationModal}
                setClose={setCloseNotificationModal}
                message={notificationModal.message}
                action={notificationModal.action}
            />
        </>
    );
}

export default Users;