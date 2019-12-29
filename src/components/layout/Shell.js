import React, { useState, useEffect } from 'react';

import { Layout, Button } from 'antd';

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
      <Header className='appbar'>
        <div style={{ display: 'inline' }}>
          ADOPETS
          <div style={{ float: 'right' }}>
            {logado && (
              <Button shape='circle' icon='logout' onClick={logout} title='Logout' />
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

