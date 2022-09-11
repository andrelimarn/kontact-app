import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRegister from '../DeleteRegister';
import './style.css';

function EditRegister({ setShowEditModal, id }) {

    const { arrayTransaction, setUpdateList } = useContext(UserContext)
    const item = arrayTransaction.find(item => item.id === id)
    const [error, setError] = useState({ msg: '', show: false })
    const [checkEleitor, setCheckEleitor] = useState(item.eleitor);
    const [checkEvangelico, setCheckEvangelico] = useState(item.evangelico);
    const [checkCac, setCheckCac] = useState(item.cac);
    const [checkContato, setCheckContato] = useState(item.primeiro_contato);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [form, setForm] = useState({
        name: item.nome,
        email: !item.email ? '' : item.email,
        phone: item.telefone,
        profissao: item.profissao,
        municipio: item.municipio,
        observacoes: item.observacoes
    })

    function handleChangeForm(e) {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }



    async function handleAddRegister(e) {
        e.preventDefault()
        const { name, email, phone, profissao, municipio, observacoes } = form

        try {
            if (!name || !phone) {
                setError({ msg: 'Os campos nome e telefone são obrigatórios', show: true })
                setTimeout(() => {
                    setError({ msg: '', show: false })
                }, 5000)
                return;
            }

            const response = await api.put('/contatos/' + item.id, {
                nome: name,
                email: email,
                telefone: phone,
                profissao,
                municipio,
                observacoes,
                primeiro_contato: checkContato,
                eleitor: checkEleitor,
                evangelico: checkEvangelico,
                cac: checkCac

            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            setUpdateList(true)
            setShowEditModal(true)

        } catch (error) {
            setError({ msg: error.response.data, show: true })
            setTimeout(() => {
                setError({ msg: '', show: false })
            }, 5000)
        }
    }

    return (
        <div className='modal-edit-container'>
            <div className='modal-edit-register'>
                <div className='modal-edit-header'>
                    <div>
                        <span>Atendeu?</span>
                        <Switch
                            checked={checkContato}
                            onChange={(e) => setCheckContato(!checkContato)}
                            name="checkContato"
                            inputProps={{ "arial-label": "controlled" }}
                        />
                    </div>
                    <div>
                        <a href={`sip:` + item.telefone.trim()}>
                            <PhoneIcon className='telefone' />
                        </a>
                        <DeleteIcon className='lixeira' onClick={() => setShowDeleteModal(true)} />
                        <CloseIcon className='edit-close' onClick={() => setShowEditModal(false)} />
                        {showDeleteModal && <DeleteRegister
                            id={item.id}
                            nome={item.nome}
                            setShowDeleteModal={setShowDeleteModal}
                            setShowEditModal={setShowEditModal} />
                        }
                    </div>

                </div>

                <span className='edit-title'>Editar Contato</span>

                <form className='edit-register'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Nome'
                        value={form.name}
                        onChange={(e) => handleChangeForm(e)}
                    />

                    <input
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />

                    <input
                        type='text'
                        name='phone'
                        placeholder='Telefone'
                        value={form.phone}
                        onChange={(e) => handleChangeForm(e)}
                    />

                    <input
                        type='text'
                        name='profissao'
                        placeholder='Profissão'
                        value={form.profissao}
                        onChange={(e) => handleChangeForm(e)}
                    />

                    <input
                        type='text'
                        name='municipio'
                        placeholder='Cidade'
                        value={form.municipio}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <div className='switch-container'>
                        <div>
                            <span>Voto?</span>
                            <Switch
                                checked={checkEleitor}
                                onChange={(e) => setCheckEleitor(!checkEleitor)}
                                name="checkEleitor"
                                inputProps={{ "arial-label": "controlled" }}
                            />
                        </div>
                        <div>
                            <span>Evangélico?</span>
                            <Switch
                                checked={checkEvangelico}
                                onChange={(e) => setCheckEvangelico(!checkEvangelico)}
                                name="checkEvangelico"
                                inputProps={{ "arial-label": "controlled" }}
                            />
                        </div>
                        <div>
                            <span>CAC?</span>
                            <Switch
                                checked={checkCac}
                                onChange={(e) => setCheckCac(!checkCac)}
                                name="checkCac"
                                inputProps={{ "arial-label": "controlled" }}
                            />
                        </div>
                    </div>

                    <textarea className='add-text-area' cols="30" rows="4"
                        value={form.observacoes}
                        name="observacoes"
                        placeholder='Observações'
                        onChange={(e) => handleChangeForm(e)}
                    />

                    {error && <span className='edit-error'>{error.msg}</span>}
                    <Button onClick={handleAddRegister} variant="contained">SALVAR</Button>
                </form>

            </div>
        </div>
    )
}

export default EditRegister;