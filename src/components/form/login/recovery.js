import { useParams } from "react-router-dom";


const RecoveryPassword = () => {
    let  { token } = useParams();

    console.log(token);

    return(
        <h1>{token}</h1>
    )
}

export default RecoveryPassword;