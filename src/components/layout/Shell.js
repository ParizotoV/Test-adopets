import React, { useState, useEffect } from 'react';

import { Layout, Button } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const Shell = ({ children }) => {

  const [logado, setLogado] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogado(true)
    } else {
      setLogado(false)
    }
  })
  
  const logout = () => {
    localStorage.removeItem('token')
    setLogado(false)
    window.location.reload()
  }

  return (
    <Layout>
      <Header style={{ zIndex: 1, width: '100%', backgroundColor: 'white', boxShadow: '0 4px 15px rgba(200,200,210,.3)' }}>
        <div style={{ display: 'inline' }}>
          Test AdoPets
          <div style={{ float: 'right' }}>
            {logado && (
              <Button shape="circle" icon="logout" size={20} onClick={logout} />
            )}
          </div>
        </div>
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  )

}

export default Shell;

