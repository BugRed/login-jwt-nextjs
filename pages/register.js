import { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';  
import { useRouter } from 'next/router'; 

import styles from '../styles/Login.module.css'

import LoginCard from "../src/components/loginCard/loginCard";
import Input from '../src/components/input/input';
import Button from '../src/components/button/button';

export default function RegisterPage (){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState({    })
    const router = useRouter()

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const hendleForm = (async event => {
       
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/register`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            console.log(response.status)
            if (response.status !== 201) throw new Error(json)
            
            setCookie('authorization', json)
            router.push('/')

        } catch (error) {
            setError(error.message)
        }
    })

    return (
        <div className={styles.background}>
            <LoginCard title='Crie sua conta'>
                <form onSubmit={hendleForm} className={styles.form}>
                    <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e)=> {handleFormEdit(e, 'name')}}/>
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e)=> {handleFormEdit(e, 'email')}}/>
                    <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e)=> {handleFormEdit(e, 'password')}}/>
                    <Button>Cadastrar</Button>
                    <Link href="/login">Já possui conta?</Link>
                </form>  
            </LoginCard>
        </div>
    )
}