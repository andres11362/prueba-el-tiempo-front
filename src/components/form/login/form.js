import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { singIn } from "../../../api/users";
import NotificationModal from "../../modals/notificationModal";

/**
 * Formulario de Login de la aplicación
 */
const Login = () => {

    let history = useHistory();

    const [data, setData] = useState({
        email: '',
        password: ''
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
        axios.post(singIn, data).then(res => {
            const { data } = res;
            if (data.error === 0) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.access_token);
                history.push('/home');
            }
        }).catch(err => {
            console.error(err);
            setOpenNotificationModal('Un error ha ocurrido, intente nuevamente', 'notification');
        });
    }

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <form onSubmit={submitLogin} className="w-full md:w-1/3 bg-white rounded-lg">
                    <div className="flex font-bold justify-center mt-6">
                        <img alt="avatar" className="h-20 w-20"
                            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
                    </div>
                    <h2 className="text-3xl text-center text-gray-700 mb-4">Bienvenido</h2>
                    <div className="px-12 pb-10">
                        <div className="w-full mb-2">
                            <div className="flex items-center">
                                <input
                                    name="email"
                                    onChange={onHandleChange}
                                    type='text'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                                    placeholder="Correo electrónico"
                                />
                            </div>
                        </div>
                        <div className="w-full mb-2">
                            <div className="flex items-center">
                                <input
                                    name="password"
                                    onChange={onHandleChange}
                                    type='password'
                                    placeholder="Contraseña"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                                />
                            </div>
                        </div>
                        <Link to="/forget" className="text-xs text-gray-500 float-right mb-4">¿Olvidaste tu contraseña?</Link>
                        <button type="submit"
                            className="w-full py-2 rounded-lg bg-green-600 text-gray-100  focus:outline-none">Entrar</button>
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

export default Login;