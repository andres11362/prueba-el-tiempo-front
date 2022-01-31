import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userProfile } from "../../api/users";
import { apiKey } from "../../constants/apiKey";

const Profile = () => {

    const [user, setUser] = useState({});

    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
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
        <div class="flex justify-center items-center w-50">
            {/* <!-- component --> */}
            <div class="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-gray-800">
                <img alt="banner" src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
                <div class="flex justify-center -mt-8">
                    <img alt="profile" src="https://i.imgur.com/8Km9tLL.jpg" class="rounded-full border-solid border-white border-2 -mt-3" />
                </div>
                <div class="text-center px-3 pb-6 pt-2">
                    <h3 class="text-white text-sm bold font-sans">
                        { user.name }
                    </h3>
                    <p class="mt-2 font-sans font-light text-white">
                        { user.email }
                    </p>
                </div>
                <div class="flex justify-center pb-3 text-white">
                    <div class="text-center mr-3 border-r pr-3">
                        <Link to="/edit-profile" >Editar perfil</Link>
                    </div>
                    <div class="text-center">
                        <Link to="/my-news">Tus publicaciones</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;