import axios from "axios";
import { useEffect, useState } from "react";
import { newsList } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Main from "../../components/publicComponent/main";

/**
   * Pagina que llama la lista de noticias
   * @param {*} props 
   * @returns 
*/
const PublicPage = () => {

    const [data, setData] = useState([]);

    const getData = () => {
        axios.get(newsList).then(res => {
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
            <Main news={data} seccion="main" />
        </>
       
    )
}

export default PublicPage;