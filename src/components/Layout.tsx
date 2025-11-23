import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import type { MenuProps } from 'antd'

const { Sider, Content, Header } = AntLayout

interface LayoutProps {
  children: ReactNode
}

const menuItems: MenuProps['items'] = [
  {
    key: '/statistics',
    label: 'PDD下单统计图',
  },
  {
    key: '/phones',
    label: '手机管理',
  },
  {
    key: '/orders',
    label: 'PDD下单任务看板',
  },
  {
    key: '/videos',
    label: '视频演示',
  },
]

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold'
        }}>
          PDD管理
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <AntLayout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>PDD下单管理后台</h1>
        </Header>
        <Content style={{ margin: '24px', background: '#fff', padding: 24, borderRadius: 8 }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
