import axios from "axios";
import { useState } from "react"
import { sections } from '../../../api/sections';
import { routeFiles } from '../../../constants/routeFiles';

/**
 * Formulario de creación y edicion de secciones
 * Se envian varios parametros para configuración
 * @param {setOpen, row, action, changePage, setNotificationModal} 
 * @returns 
 */
const SectionForm = ({ setOpen, row, action, changePage, setNotificationModal }) => {

    const [data, setData] = useState({
        'nombre': row.nombre ? row.nombre : ''
    });

    const [showInputFile, setShowInputFile] = useState(row.imagen ? false : true);

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    /**
     * Se valida por medio del campo action que tipo de formulario es
     * Ademas de envia en un form data para el manejo de archivos
     * @param {e} e 
     */
    const handleSubmit = (e) => {

        e.preventDefault();

        const inputFile = document.getElementById('imagen');

        const file = inputFile.files[0];

        const body = new FormData();

        body.append('nombre', data.nombre);
        body.append('imagen', file);

        const url = action === 'edit' ? `${sections}/${row.id}` : `${sections}`;

        axios.post(url, body, config)
            .then(res => {
                const { data } = res;
                setOpen();
                changePage(1);
                setTimeout(() => {
                    setNotificationModal(data.message, 'notification');
                }, 3000);;
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
                        value={data.nombre}
                        name="nombre"
                        onChange={onHandleChange}
                        type="text"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                        placeholder="Nombre sección"
                    />
                </div>
                {showInputFile ? (
                    <div class="rounded-lg shadow-xl bg-gray-50">
                        <div class="m-4">
                            <label class="inline-block mb-2 text-gray-500">Sube una imagen(jpg,png,svg,jpeg)</label>
                            <div class="flex items-center justify-center w-full">
                                <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div class="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select a photo</p>
                                    </div>
                                    <input id="imagen" type="file" class="opacity-0" value={data.imagen} />
                                </label>
                            </div>
                        </div>
                    </div>
                ) :
                    <>
                        <div className="my-1">
                            <label class="inline-block mb-2 text-gray-500">Imagen previa</label>
                            <img width={300} src={`${routeFiles}${row.imagen}`} alt={row.nombre} />
                            <button
                                type="button"
                                onClick={() => { setShowInputFile(true) }}
                                className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                            >
                                Cargar nueva imagen
                            </button>
                        </div>
                    </>
                }
                <hr />
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

export default SectionForm;