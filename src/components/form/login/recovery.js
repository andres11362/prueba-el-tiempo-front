import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { recovery } from "../../../api/users";
import NotificationModal from "../../modals/notificationModal";


const RecoveryPassword = () => {
    let  { token } = useParams();
    let history = useHistory();

    const [data, setData] = useState({
        password: '',
        password_confirmation: '',
        token
    });

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

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        axios.put(recovery, data).then(res => {
            setOpenNotificationModal(res.data.message, 'notification');
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        }).catch(err => {
            console.error(err);
            setOpenNotificationModal('Un error ha ocurrido, intente nuevamente', 'notification');
        });
    }

    return(
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <form onSubmit={submitLogin} className="w-full md:w-1/3 bg-white rounded-lg">
                    <div className="flex font-bold justify-center mt-6">
                        <img alt="avatar" className="h-20 w-20"
                            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
                    </div>
                    <h2 className="text-3xl text-center text-gray-700 mb-5 p-6">Ingresa tu nueva contraseña</h2>
                    <div className="px-12 pb-10">
                        <div className="w-full mb-2">
                            <div className="flex items-center">
                                <input
                                    name="password"
                                    onChange={onHandleChange}
                                    type='password'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                                    placeholder="Contraseña"
                                />
                            </div>
                        </div>
                        <div className="w-full mb-2">
                            <div className="flex items-center">
                                <input
                                    name="password_confirmation"
                                    onChange={onHandleChange}
                                    type='password'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                                    placeholder="Confirmar contraseña"
                                />
                            </div>
                        </div>
                        <button type="submit"
                            className="w-full py-2 rounded-lg bg-green-600 text-gray-100  focus:outline-none">Enviar</button>
                    </div>
                </form>
            </div>
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

export default RecoveryPassword;