import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsUnique } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Main from "../../components/publicComponent/main";
import Post from "../../components/publicComponent/post";

const NewsPage = () => {

    const [data, setData] = useState({});

    const { id } = useParams();

    const getData = () => {

        const url = `${newsUnique}/${id}`;

        axios.get(url).then(res => {
            setData(res.data);
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