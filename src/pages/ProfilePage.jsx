import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, Camera, ChevronRight, Shield, Heart, HelpCircle, LogOut } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { profile, setProfile } = useAppStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  const handleSave = () => {
    setProfile(form)
    setEditing(false)
  }

  const menuItems = [
    { icon: Shield, label: 'Safety', color: 'text-primary-500', bg: 'bg-primary-50' },
    { icon: Heart, label: 'Favorites', color: 'text-error-500', bg: 'bg-error-50' },
    { icon: HelpCircle, label: 'Help & Support', color: 'bg-warning-50 text-warning-600', bg: 'bg-warning-50' },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-lg text-gray-800">Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile card */}
        <div className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                <Camera size={12} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800">{profile.name}</h2>
              <p className="text-sm text-gray-400">{profile.email}</p>
            </div>
            <button
              onClick={() => { setForm(profile); setEditing(true) }}
              className="text-primary-500 text-sm font-semibold"
            >
              {editing ? '' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <div className="bg-white mx-4 mt-3 rounded-2xl p-5 shadow-sm space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditing(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} className="btn-primary flex-1">Save</button>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="bg-white mx-4 mt-3 rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon size={18} className={item.color} />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-gray-700">{item.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <div className="mx-4 mt-3 mb-4">
          <button className="w-full flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm hover:bg-gray-50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <LogOut size={18} className="text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
