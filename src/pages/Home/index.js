import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddRegister from '../../components/AddRegister';
import userContext from '../../contexts/UserContext';
import api from '../../services/api';
import './style.css';
import ContactCard from '../../components/ContactCard';
import AvatarIcon from '../../assets/avatar.jpg'

function Home() {

    const navigate = useNavigate();
    const [arrayTransaction, setArrayTransaction] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [updateList, setUpdateList] = useState(false)

    async function loadTransaction() {

        try {
            const response = await api.get('/contatos?page=' + localStorage.getItem('id') + '&limit=1500', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setUpdateList(false)
            setArrayTransaction(response.data)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        loadTransaction()

    }, [updateList])

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('id');
        navigate("/");
    }

    return (

        <userContext.Provider value={{ arrayTransaction, setShowModal, setUpdateList }}>

            <div className='home-container'>
                <div className='menu-bar'>
                    <div className='user-container'>
                        <img className='avatar-icon' src={AvatarIcon}></img>
                        <span className='user-login'>
                            {localStorage.getItem('usuario')}
                        </span>
                    </div>
                    <div className='exit-icon'>
                        <ExitToAppIcon onClick={() => handleLogout()} />
                    </div>
                </div>
                <div>
                    <ContactCard />
                </div>
                {showModal && <AddRegister />}

            </div>
        </userContext.Provider >
    )
}

export default Home;