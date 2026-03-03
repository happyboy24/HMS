// components/common/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', path: '/', roles: ['admin', 'doctor', 'receptionist'] },
  { label: 'Patients', path: '/patients', roles: ['admin', 'doctor', 'receptionist'] },
  { label: 'Doctors', path: '/doctors', roles: ['admin', 'receptionist'] },
  { label: 'Appointments', path: '/appointments', roles: ['admin', 'doctor', 'receptionist'] },
  { label: 'Billing', path: '/billing', roles: ['admin', 'receptionist'] },
]

export default function Sidebar() {
  const { user, hasRole } = useContext(AuthContext)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🏥 HMS</h2>
        <p className="sidebar-role">{user?.role?.toUpperCase()}</p>
      </div>
      <nav>
        {navItems
          .filter((item) => hasRole(...item.roles))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  )
}
