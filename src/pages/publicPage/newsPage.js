import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsUnique } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Post from "../../components/publicComponent/post";

/**
   * Pagina que el componente de noticia individual
   * @param {*} props 
   * @returns 
*/
const NewsPage = () => {

    const [data, setData] = useState({});

    const { id } = useParams();

    const getData = () => {

        const url = `${newsUnique}/${id}`;

        axios.get(url).then(res => {
            setData(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <Banner />
            <Post news={data} seccion="main" />
        </>
       
    )
}

export default NewsPage;