import { Link, useHistory } from 'react-router-dom'

import {
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";

import {
    TwitterIcon,
    FacebookIcon
} from "react-share";
import Loader from '../../utils/loader';

/**
 * Componente que me muestra una  noticias de un autor
 * Contiene un componente de redes sociales
 * @param {*} param0 
 * @returns 
 */
const Post = ({ news }) => {

    const history = useHistory();
    const currentURL = window.location.href;

    return (
        <>
            {
                news[0] ? (
                    <section className="text-gray-600 body-font" >
                        <div className='m-2'>
                            <button onClick={() => history.goBack()}>Ir atras</button>
                        </div>
                        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                    {news[0].titulo}
                                </h1>
                                <Link to={`/category/${news[0].seccion.id}`}>
                                    <span className={`inline-block p-2 mb-2 text-xs font-medium tracking-widest text-blue-800 bg-blue-200 rounded`}>
                                        Categoria: {news[0].seccion.nombre}
                                    </span>
                                </Link>
                                <Link to={`/author/${news[0].usuario.id}`}>
                                    <span className={`inline-block p-2 mb-2 text-xs font-medium tracking-widest text-blue-800 bg-blue-200 rounded`}>
                                        Autor: {news[0].usuario.name}
                                    </span>
                                </Link>
                                <p className="mb-8 leading-relaxed">
                                    {news[0].contenido}
                                </p>
                                <div className="flex justify-center ">
                                    <div className="mx-1">
                                        <h3>Compartir en:</h3>
                                    </div>
                                    <div className="mx-1">
                                        <FacebookShareButton url={currentURL}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                    </div>
                                    <div className="mx-1">
                                        <TwitterShareButton url={currentURL}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                                <img className="object-cover object-center rounded" alt="hero" src={news[0].imagen} />
                            </div>
                        </div>
                    </section >
                ) : <Loader />}
        </>
    )
}

export default Post;