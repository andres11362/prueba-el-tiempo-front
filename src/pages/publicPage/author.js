import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsListAuthor } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Category from "../../components/publicComponent/main";

/**
   * Pagina que llama la lista de noticias por autor
   * @param {*} props 
   * @returns 
*/
const AuthorPage = () => {

    const [data, setData] = useState([]);

    const { author } = useParams();

    const getData = () => {

        const url = `${newsListAuthor}/${author}`;

        axios.get(url).then(res => {
            setData(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getData();
    }, [author]);

    return(
        <>
            <Banner />
            <Category news={data} />
        </>
       
    )
}

export default AuthorPage;