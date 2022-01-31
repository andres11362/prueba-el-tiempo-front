import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsListSection } from "../../api/public";
import Banner from "../../components/publicComponent/banner";
import Category from "../../components/publicComponent/main";

const CategoryPage = () => {

    const [data, setData] = useState([]);

    const { seccion } = useParams();

    const getData = () => {

        const url = `${newsListSection}/${seccion}`;

        axios.get(url).then(res => {
            setData(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getData();
    }, [seccion]);

    return(
        <>
            <Banner />
            <Category news={data} />
        </>
       
    )
}

export default CategoryPage;