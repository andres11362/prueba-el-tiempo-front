import axios from "axios";
import { useEffect, useState } from "react";
import { userProfileNews } from "../../api/users";
import { news } from '../../api/news';
import NotificationModal from "../../components/modals/notificationModal";
import Tabla from "../../components/tables";
import Loader from "../../utils/loader";

/**
 * Llama la lista de noticias de un usuario
 * @returns 
 */
const Newslist = () => {

    const [user, setUser] = useState({});
    const [newsData, setNewsData] = useState({});
    const [headers, setHeaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationModal, setNotificationModal] = useState({
        open: false,
        message: '',
        action: ''
    });
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
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    const getUserNews = () => {
        axios.get(userProfileNews, config).then(res => {
            const { data } = res;
            setHeaders(Object.values(data.headers));
            setUser(data.user);
            setNewsData(data.news);
        }).catch(err => {
            console.error(err);
        })
    }

    const deleteNoticia = (id) => {

        const endpoint = `${news}/${id}`;

        axios.delete(endpoint, config)
        .then(res => {
            const { data } = res;
            setCloseNotificationModal();
            setNewsData({});
            getUserNews();
            setCurrentPage(1);
            setTimeout(() => {
                setOpenNotificationModal(data.message, 'notification');
            }, 3000);
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        setNewsData({});
        getUserNews();
    }, [currentPage]);

    return(
        <>
            {(newsData && Object.keys(newsData).length > 0) ?
                (
                    <Tabla
                        headers={headers}
                        rows={newsData}
                        type="news"
                        changePage={setCurrentPage}
                        page={currentPage}
                        handleDelete={deleteNoticia}
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
                id={idRow}
                handleDelete={deleteNoticia}
            />
        </>
    )
}

export default Newslist;