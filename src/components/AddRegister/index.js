import { useContext, useState } from 'react';
import Close from '../../assets/close.png';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import './style.css';

function AddRegister() {

    const [checkEleitor, setCheckEleitor] = useState(false);
    const [checkEvangelico, setCheckEvangelico] = useState(false);
    const [checkCac, setCheckCac] = useState(false);
    const { setShowModal, setUpdateList } = useContext(UserContext)
    const formDefault = ({
        name: '',
        email: '',
        phone: '',
        profissao: '',
        municipio: '',
        observacoes: '',

    })

    const [error, setError] = useState({ msg: '', show: false })
    const [form, setForm] = useState(formDefault)

    function handleChangeForm(e) {
        setCheckEleitor(!checkEleitor)
        setCheckEvangelico(!checkEvangelico)
        setCheckCac(!checkCac)
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }

    async function handleAddRegister(e) {
        e.preventDefault()

        const { name, email, phone, profissao, municipio, observacoes } = form

        try {
            if (!name || !phone) {
                setError({ msg: 'Os campos nome e tefefone são obrigatórios', show: true })
                setTimeout(() => {
                    setError({ msg: '', show: false })
                }, 5000)
                return;
            }

            const response = await api.post('/contatos', {
                nome: name,
                email: email,
                telefone: phone,
                profissao,
                municipio,
                observacoes,
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
            setShowModal(false)

        } catch (error) {
            setError({ msg: error.response.data, show: true })
            setTimeout(() => {
                setError({ msg: '', show: false })
            }, 5000)
        }
    }

    return (
        <div className='modal-add-container'>
            <div className='modal-add-register'>
                <img onClick={() => setShowModal(false)} src={Close} alt='fechar' />
                <span className='add-title'>Novo Contato</span>

                <form className='add-register'>
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
                                value={form.checkEleitor}
                                onChange={(e) => setCheckEleitor(!checkEleitor)}
                                name="checkEleitor"
                                inputProps={{ "arial-label": "test switch" }}
                            />
                        </div>
                        <div>
                            <span>Evangélico?</span>
                            <Switch
                                value={form.checkEvangelico}
                                onChange={(e) => setCheckEvangelico(!checkEvangelico)}
                                name="checkEvangelico"
                                inputProps={{ "arial-label": "test switch" }}
                            />
                        </div>
                        <div>
                            <span>CAC?</span>
                            <Switch
                                value={form.checkCac}
                                onChange={(e) => setCheckCac(!checkCac)}
                                name="checkCac"
                                inputProps={{ "arial-label": "test switch" }}
                            />
                        </div>
                    </div>

                    <textarea className='add-text-area' cols="30" rows="4"
                        value={form.observacoes}
                        name="observacoes"
                        placeholder='Observações'
                        onChange={(e) => handleChangeForm(e)}
                    />


                    {error && <span className='login-error'>{error.msg}</span>}
                    <Button onClick={handleAddRegister} variant="contained">ADICIONAR</Button>

                </form>

            </div>
        </div>
    )
}

export default AddRegister;