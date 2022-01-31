import axios from "axios";
import { useEffect, useState } from "react"
import { sectionsSelect } from '../../../api/sections';
import { news } from '../../../api/news';

import { routeFiles } from "../../../constants/routeFiles";

/**
 * Formulario de creación y edicion de noticias
 * Se envian varios parametros para configuración
 * @param {setOpen, row, action, changePage, setNotificationModal} 
 * @returns 
 */
const NewsForm = ({ setOpen, row, action, changePage, setNotificationModal }) => {

    const [data, setData] = useState({
        'titulo': row.titulo ? row.titulo : '',
        'contenido': row.contenido ? row.contenido : '',
        'id_seccion': row.id_seccion ? row.id_seccion : ''
    });

    const [secciones, setSecciones] = useState([]);
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

    const getSecciones = () => {
        axios.get(sectionsSelect, config)
            .then(res => {
                setSecciones(Object.values(res.data))
            }).catch(err => {
                console.error(err);
                setNotificationModal('Un error ha ocurrido, intente nuevamente', 'notification');
            })
    }

    /**
     * Se valida por medio del campo action que tipo de formulario es
     * Ademas de envia en un form data para el manejo de archivos
     * @param {e} e 
     */
    const handleSubmit = (e) => {
        
        e.preventDefault();

        const body = new FormData();

        body.append('titulo', data.titulo);
        body.append('contenido', data.contenido);
        body.append('id_seccion', data.id_seccion);

        if(showInputFile) {
            const inputFile =  showInputFile ? document.getElementById('imagen') : '';
            const file = inputFile.files[0];
            body.append('imagen', file);
        }

        const url = action === 'edit' ? `${news}/${row.id}` : `${news}`;

        axios.post(url, body, config)
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

    useEffect(() => {
        getSecciones();
    }, []);


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
                        value={data.titulo}
                        name="titulo"
                        onChange={onHandleChange}
                        type="text"
                        id="titulo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                        placeholder="Nombre sección"
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Contenido
                    </label>
                    <textarea
                        value={data.contenido}
                        name="contenido"
                        onChange={onHandleChange}
                        type="text"
                        id="contenido"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                        placeholder="Contenido"
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

                <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Nombres
                    </label>
                    <select
                        disabled={action === 'edit'}
                        value={data.id_seccion}
                        name="id_seccion"
                        onChange={onHandleChange}
                        id="id_seccion"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2. "
                    >
                        <option disabled selected value=''>Seleccione una sección</option>
                        {secciones.map((item, index) => (
                            <option key={index} value={index + 1}>{item}</option>
                        ))}
                    </select>
                </div>
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

export default NewsForm;