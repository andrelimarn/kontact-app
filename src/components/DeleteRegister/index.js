import { useContext } from 'react'
import Close from '../../assets/close.png'
import UserContext from '../../contexts/UserContext'
import api from '../../services/api'
import './style.css'

function DeleteRegister({ setShowDeleteModal, setShowEditModal, id, nome }) {

    const { setUpdateList } = useContext(UserContext)


    async function handleDeleteRegister(id) {
        setShowEditModal(false)
        try {

            const response = await api.delete('/contatos/' + id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setUpdateList(true)
            setShowDeleteModal(false)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='modal-delete-container'>
            <div className='modal-delete-register'>
                <img onClick={() => setShowDeleteModal(false)} src={Close} alt='fechar' />
                <span className='delete-title'>Confirma a Exclusão</span>
                <div>
                    <span className='confirm-msg'>Deseja excluir o contato, {nome}?</span>
                </div>

                <div className='btn-delete-container'>
                    <button className='btn-delete' onClick={() => handleDeleteRegister(id)}>Excluir</button>
                    <button className='btn-delete-cancel' onClick={() => setShowDeleteModal(false)}>CANCELAR</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteRegister;