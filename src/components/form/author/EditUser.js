import axios from "axios";
import { useState } from "react"
import { editUser } from '../../../api/users';
import NotificationModal from "../../modals/notificationModal";


/**
 * Formulario de edicion del perfil de usuario
 * @param {user}  
 * @returns 
 */
const EditUser = ({ user }) => {

    const [data, setData] = useState({
        name: user ? user.name : '',
        email: user ? user.email: '',
        password: '',
        password_confirmation: ''
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

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
      
        axios.put(editUser, data, config)
            .then(res => {
                setOpenNotificationModal(res.data.message, 'notification');
        }).catch(err => {
            setOpenNotificationModal('Un error ha ocurrido, intente nuevamente', 'notification');
            console.error(err)
        })
    }

    return (
        <>
            <div className="w-11/12 m-auto">
                <div className="my-5">
                    <h1 className="font-bold text-lg">Tus Datos</h1>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Nombres
                        </label>
                        <input
                            value={data.name}
                            name="name"
                            onChange={onHandleChange}
                            type="text"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. " placeholder="Nombre usuario"
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            value={data.email}
                            onChange={onHandleChange}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="correo@correo.com"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            value={data.password}
                            onChange={onHandleChange}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            for="password_confirmation"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            value={data.password_confirmation}
                            onChange={onHandleChange}
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirmar contraseña"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <hr />
                    <div className="flex float-right my-5">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
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
    )
}

export default EditUser;