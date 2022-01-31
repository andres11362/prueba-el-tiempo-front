import { Link } from "react-router-dom";
import Loader from "../../utils/loader";

/**
 * Componente que me muestra las noticias de un autor
 * @param {*} param0 
 * @returns 
 */
const Category = ({ news }) => {

    return (
        <section>
            <div className="m-4 lg:flex lg:flex-wrap">
                {(news.data && news.data.length > 0) ? (news.data.map((item, index) => (
                    <div className="p-4 md:w-1/3">
                        <div className="border-2 border-gray-200 rounded-lg">
                            <img className="object-cover object-center w-full lg:h-48 md:h-36"
                                src={item.imagen} alt={item.titulo} />
                            <div className="p-6">
                                <Link to={`/category/${item.seccion.id}`} key={item.id}>
                                    <span className={`inline-block p-2 mb-2 text-xs font-medium tracking-widest text-blue-800 bg-blue-200 rounded`}>
                                        {item.seccion.nombre}
                                    </span>
                                </Link>
                                <h1 className="mb-2 text-lg font-medium text-gray-900">{item.titulo}</h1>
                                <p className="mb-2 text-sm tracking-wide text-gray-700 truncate">{item.contenido}</p>
                                <div className="flex items-center ">
                                    <div className="flex items-center ">
                                        <Link to={`/news/${item.id}`} className="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Leer mas...
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : <Loader />}
            </div>
        </section>
    )
}

export default Category;