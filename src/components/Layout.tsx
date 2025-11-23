import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const menuItems = [
    { path: '/statistics', label: 'PDD下单统计图' },
    { path: '/phones', label: '手机管理' },
    { path: '/orders', label: 'PDD下单任务看板' },
  ]

  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          <ul className="menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
