import React, { useEffect, useState } from 'react';

import { 
  useAuth 
} from '../../utils';
import { Redirect } from 'react-router-dom';

import { Button, Input, Alert, Typography, Avatar, Row, Col } from 'antd';

const { Title } = Typography;

const Login = () => {
  const url_session_register = "https://test.adopets.app/v1/auth/session-register";
  const [logged, setLogged] = useState(false);
  const [postData, singIn] = useAuth(url_session_register);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogged(true)
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
      setLogged(true)
    }
  }, [postData])
  if (logged) {
    return <Redirect to='/' />
  }
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={5}>
        <div className="content_login">
          <Title level={3}>LOGIN</Title>
          <Avatar size={48} icon="user" style={{ marginTop: '4px' }} />
          <Input placeholder="E-mail" type="text" name="email" value={form.email} onChange={handleChangeForm} style={{ marginTop: '15px' }} />
          <Input placeholder="Password" type="password" name="password" value={form.password} onChange={handleChangeForm} style={{ marginTop: '8px' }} />
          <Button type="primary" onClick={login} style={{ marginTop: '15px', width: '100%' }}>Login</Button>
          {postData.data.status === 100 && (
            <Alert
              message="Erro"
              description={postData.data.message}
              type="error"
              style={{ marginTop: '18px' }}
            />
          )}
        </div>
      </Col>
    </Row>


  )

}

export default Login;