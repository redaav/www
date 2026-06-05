import { useState } from 'react'
import { MapPin, Search, X, Clock } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

export default function LocationSearch({ type, onClose }) {
  const { locations, pickup, setPickup, dropoff, setDropoff } = useAppStore()
  const [query, setQuery] = useState('')

  const filtered = locations.filter(l =>
    l.name.toLowerCase().includes(query.toLowerCase()) ||
    l.address.toLowerCase().includes(query.toLowerCase())
  )

  const recentLocations = [
    { name: 'Home', address: '123 Park Avenue, NY', icon: '🏠' },
    { name: 'Office', address: '456 Wall Street, NY', icon: '🏢' },
  ]

  const selectLocation = (loc) => {
    const location = { name: loc.name, address: loc.address }
    if (type === 'pickup') setPickup(location)
    else setDropoff(location)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
          <h2 className="font-semibold text-lg text-gray-800">
            {type === 'pickup' ? 'Set Pickup' : 'Set Destination'}
          </h2>
        </div>
      </div>

      {/* Search input */}
      <div className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={type === 'pickup' ? 'Search pickup location...' : 'Where to?'}
            className="input-field pl-10"
            autoFocus
          />
        </div>
      </div>

      {/* Route indicator */}
      <div className="px-6 pb-4 flex items-center gap-3">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-primary-200" />
          <div className="w-0.5 h-4 bg-gray-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-500 border-2 border-accent-200" />
        </div>
        <div className="flex-1 space-y-2">
          <div className={`text-sm ${pickup ? 'text-gray-700' : 'text-gray-400'}`}>
            {pickup ? pickup.name : 'Pickup point'}
          </div>
          <div className={`text-sm ${dropoff ? 'text-gray-700' : 'text-gray-400'}`}>
            {dropoff ? dropoff.name : 'Destination'}
          </div>
        </div>
      </div>

      {/* Saved locations */}
      {!query && (
        <div className="px-4 pb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Saved</h3>
          {recentLocations.map((loc, i) => (
            <button
              key={i}
              onClick={() => selectLocation(loc)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{loc.icon}</span>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-800">{loc.name}</div>
                <div className="text-xs text-gray-400">{loc.address}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search results / Suggestions */}
      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
          {query ? 'Results' : 'Suggestions'}
        </h3>
        {filtered.map(loc => (
          <button
            key={loc.id}
            onClick={() => selectLocation(loc)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
              <MapPin size={16} className="text-primary-500" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-800">{loc.name}</div>
              <div className="text-xs text-gray-400">{loc.address}</div>
            </div>
          </button>
        ))}
        {query && filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No locations found
          </div>
        )}
      </div>
    </div>
  )
}
