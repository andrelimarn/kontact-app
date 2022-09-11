import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import './style.css';


function SignIn() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({ msg: '', show: false });

    function handleChangeForm(e) {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }

    async function handleSignIn(e) {
        e.preventDefault();
        const { email, password } = form

        try {
            const response = await api.post('/login', {
                email,
                senha: password
            })

            if (!response.error) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.usuario.id)
                localStorage.setItem('usuario', response.data.usuario.nome)
                navigate('/home')
            }

        } catch (error) {
            setError({ msg: error.response.data, show: true })
            setTimeout(() => {
                setError({ msg: '', show: false })
            }, 2000)
        }
    }

    const navigate = useNavigate();
    return (
        <div className='container-signin'>
            <div className='left'>

            </div>
            <div className='right'>
                <form className='form-container'>

                    <span>Bem vindo</span>
                    <h1>Faça o login com sua conta</h1>
                    <input
                        type='text'
                        placeholder='E-mail'
                        name='email'
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {error.msg.includes('e-mail') && <span className='login-error'>{error.msg}</span>}
                    <input
                        type='password'
                        placeholder='Senha'
                        name='password'
                        value={form.password}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {error.msg.includes('senha') && <span className='login-error'>{error.msg}</span>}
                    <button onClick={handleSignIn}>LOGIN</button>
                </form>
                <div className='link-signup'>
                    <span>Não tem cadastro?</span>
                    <strong onClick={() => navigate('/signup')}>Clique aqui!</strong>
                </div>
            </div>
        </div>
    )
}

export default SignIn;