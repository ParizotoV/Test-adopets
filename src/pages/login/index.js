import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/useAuth';

import { Button, Input, Alert, Typography, Avatar } from 'antd';
import 'antd/dist/antd.css';
import './login.css';

import { Redirect } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const url_session_register = "https://test.adopets.app/v1/auth/session-register";
  const [logado, setLogado] = useState(false);
  const [postData, singIn] = useAuth(url_session_register);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setLogado(true)
      window.location.reload()
    }
  })

  const handleChangeForm = ({ target }) => {
    setForm(
      prev => {
        return {
          ...prev,
          [target.name]: target.value
        }
      }
    )
  }
  const login = async () => {
    await singIn({
      organization_user: { ...form }
    })
  }
  useEffect(() => {
    if (Object.keys(postData.data).length > 0 && postData.data.status !== 100) {
      localStorage.setItem('token', postData.data.data.access_key)
      setLogado(true)
    }
  }, [postData])
  if (logado) {
    return <Redirect to='/' />
  }
  return (
    <div className="container">
      <div style={{ width: '350px', maxHeight: '400px', padding: '15px', border: '1px solid rgba(211,211,211,0.5)', borderRadius: '5px'}}>
        <Title level={3}>Login</Title>
        <Avatar size={48} icon="user" style={{ marginTop: '4px' }}/>
        <Input placeholder="E-mail" type="text" name="email" value={form.email} onChange={handleChangeForm} style={{ marginTop: '15px' }} />
        <Input placeholder="Password" type="password" name="password" value={form.password} onChange={handleChangeForm} style={{ marginTop: '8px' }} />
        <Button type="primary" onClick={() => login()} style={{ marginTop: '15px', width: '100%' }}>Logar</Button>
        {postData.data.status === 100 && (
          <Alert
            message="Erro"
            description={postData.data.message}
            type="error"
            style={{ marginTop: '18px' }}
          />
        )}
      </div>
    </div>

  )

}

export default Login;