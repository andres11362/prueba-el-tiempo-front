import axios from "axios";
import { useState } from "react"
import { registerUser } from '../../../api/users';

/**
 * Formulario de creación y edicion de usuarios
 * Se envian varios parametros para configuración
 * @param {setOpen,  changePage, setNotificationModal} 
 * @returns 
 */
const UserForm = ({ setOpen, changePage, setNotificationModal }) => {

    const [data, setData] = useState({
        'name': '',
        'email': ''
    });

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(registerUser, data)
        .then(res => {
            const { data } = res;
            setOpen();
            changePage(1);
            setTimeout(() => {
                setNotificationModal(data.message, 'notification');
            }, 3000);
        }).catch(err => {
            console.error(err)
            setNotificationModal('Un error ha ocurrido, intente nuevamente', 'notification');
        })
    } 

    return (
        <>
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
                <div className="mt-3 float-right">
                <button type="submit" class="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                    <button 
                        onClick={() => setOpen()}
                        type="button" 
                        class="mx-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Cerrar
                    </button>
                </div>
            </form>
        </>
    )

}

export default UserForm;