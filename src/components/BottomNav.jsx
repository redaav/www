import { useLocation, useNavigate } from 'react-router-dom'
import { Chrome as Home, Clock, User, CreditCard } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/payment', icon: CreditCard, label: 'Payment' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-100 px-2 pb-1 pt-1">
      <div className="flex justify-around items-center">
        {tabs.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
              isActive(path)
                ? 'text-primary-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive(path) ? 2.5 : 1.8} />
            <span className={`text-[10px] mt-0.5 ${isActive(path) ? 'font-semibold' : 'font-medium'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
