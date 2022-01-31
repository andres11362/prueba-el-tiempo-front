import axios from "axios";
import { useEffect, useState } from "react";
import { userProfile } from "../../api/users";
import EditUser from "../../components/form/author/EditUser";
import Loader from "../../utils/loader";
/**
 * Llama los datos del usuario
 * para ser enviados al formulario de edición de perfil
 * @returns 
 */
const EditProfile = () => {

    const [user, setUser] = useState({});

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    const getUserProfile = () => {
        axios.get(userProfile, config).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getUserProfile();
    }, []);
    
    return (
        <>
            { user && Object.keys(user).length ? (<EditUser user={user} />) : <Loader /> }
        </>
    );
}

export default EditProfile;