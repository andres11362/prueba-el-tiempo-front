import axios from "axios";
import { useEffect, useState } from "react";
import { newsList } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Main from "../../components/publicComponent/main";

const PublicPage = () => {

    const [data, setData] = useState([]);

    const getData = () => {
        axios.get(newsList).then(res => {
            setData(res.data);
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