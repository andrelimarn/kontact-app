import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import './style.css';

function SignUp() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState({ msg: '', show: false })

    function handleChangeForm(e) {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }

    function handleReset() {
        setForm({
            name: '',
            email: '',
            password: ''
        })
    }

    async function handleSignUp(e) {
        e.preventDefault();
        const { name, email, password } = form

        try {
            if (!name || !email || !password) {
                setError({ msg: 'Todos os campos são obrigatórios', show: true })
                setTimeout(() => {
                    setError({ msg: '', show: false })
                }, 5000)
                return;
            }

            const response = await api.post('/usuarios', {
                nome: name,
                email,
                senha: password
            })

            if (!response.error) {
                navigate('/')
            }

        } catch (error) {
            setError({ msg: error.response.data, show: true })
            setTimeout(() => {
                setError({ msg: '', show: false })
            }, 5000)
        }

    }

    return (
        <div className='container-signup'>
            <div className='signup-left'>

                <form className='form-signup-container'>
                    <h1>Cadastre-se</h1>
                    <input
                        type='text'
                        placeholder='Nome'
                        name="name"
                        value={form.name}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <input
                        type='text'
                        placeholder='E-mail'
                        name="email"
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        name="password"
                        value={form.password}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {error && <span className='login-error'>{error.msg}</span>}
                    <button className='register' onClick={handleSignUp}>CADASTRAR</button>
                    <button className='cancel' type="button" onClick={() => handleReset()}>CANCELAR</button>
                    <div className='link-signin'>
                        <span>Já tem cadastro?</span>
                        <strong onClick={() => navigate('/')}>Clique aqui!</strong>
                    </div>
                </form>
            </div>

            <div className='signup-right'>

            </div>
        </div>
    )
}

export default SignUp;