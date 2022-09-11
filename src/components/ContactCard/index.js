import './style.css'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import PhoneIcon from '@mui/icons-material/Phone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import EditRegister from '../EditRegister';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function ContactCard() {
    const { arrayTransaction } = useContext(UserContext)
    const [id, setId] = useState()
    const [showEditModal, setShowEditModal] = useState(false)
    const [page, setpage] = useState(1);
    const [array, setArray] = useState([])

    function handleEditRegister(id) {
        setId(id)
        setShowEditModal(true)
    }

    function pagination(arrayTransaction, pageNumber) {
        const arrayPagination = arrayTransaction.slice((pageNumber - 1) * 16, pageNumber * 16);
        setArray(arrayPagination)
    }

    useEffect(() => {

        if (page < 1) {
            setpage(94);
        }

        if (page > 94) {
            setpage(1);
        }
        pagination(arrayTransaction, page)

    }, [page, arrayTransaction])

    return (
        <>
            <div className='card-container'>
                {showEditModal && <EditRegister
                    id={id}
                    setShowEditModal={setShowEditModal} />}
                {
                    array.map((item) => (

                        <div onClick={() => handleEditRegister(item.id)} className="card" key={item.id}>

                            <div className='card-header'>
                                <div className='id'>
                                    <Typography variant="subtitle2" color='primary'>
                                        {item.id}
                                    </Typography>

                                </div>
                                <div className='eleitor'>
                                    <Typography variant="string">
                                        Eleitor:
                                    </Typography>
                                    {item.eleitor && <ThumbUpIcon className='card-icon' fontSize='small' color='success' />}

                                </div>
                                <div className='atendeu'>
                                    <Typography variant="string">
                                        Atendeu:
                                    </Typography>
                                    {item.primeiro_contato && <CheckCircleIcon className='card-icon' fontSize='small' color='success' />}
                                </div>

                            </div>
                            <div className='card-name'>
                                <AccountBoxIcon color='primary' />
                                <Typography variant="subtitle2" marginLeft='5px'>
                                    {item.nome}
                                </Typography>

                            </div>
                            <div className='card-number'>
                                <PhoneIcon color='primary' />
                                <Typography variant="subtitle2" marginLeft='5px'>
                                    {item.telefone}
                                </Typography>
                            </div>
                        </div>
                    ))
                }
            </div >
            <div className='pagination-container'>
                <div className='pagination-left'>
                    <ArrowCircleLeftOutlinedIcon className='arrow-icon' fontSize='large' color='primary' onClick={() => setpage(page - 1)} />

                </div>
                <div className='pagination-right'>
                    <ArrowCircleRightOutlinedIcon className='arrow-icon' fontSize='large' color='primary' onClick={() => setpage(page + 1)} />
                </div>
            </div>
        </>
    )
}

export default ContactCard;