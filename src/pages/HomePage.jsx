import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronRight, Menu } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'
import MapBackground from '../components/MapBackground'
import LocationSearch from '../components/LocationSearch'

export default function HomePage() {
  const navigate = useNavigate()
  const { pickup, dropoff, setPickup, setDropoff, setRideState } = useAppStore()
  const [showSearch, setShowSearch] = useState(false)
  const [searchType, setSearchType] = useState('pickup')

  const openSearch = (type) => {
    setSearchType(type)
    setShowSearch(true)
  }

  const handleBookRide = () => {
    if (pickup && dropoff) {
      setRideState('selecting')
      navigate('/vehicles')
    }
  }

  return (
    <div className="page-container relative">
      {/* Map */}
      <div className="flex-1 relative">
        <MapBackground />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm font-semibold text-primary-600">BookIt</span>
          </div>
          <div className="w-10 h-10" /> {/* spacer */}
        </div>

        {/* Pickup/Dropoff bottom sheet */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-5 z-10">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800 mb-4">Where are you going?</h2>

          <div className="flex items-stretch gap-3 mb-4">
            {/* Route dots */}
            <div className="flex flex-col items-center py-3 gap-0.5">
              <div className="w-3 h-3 rounded-full bg-primary-500 border-2 border-primary-200" />
              <div className="w-0.5 flex-1 bg-gray-300 min-h-[20px]" />
              <div className="w-3 h-3 rounded-sm bg-accent-500 border-2 border-accent-200" />
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-2">
              <button
                onClick={() => openSearch('pickup')}
                className="w-full text-left bg-gray-50 rounded-xl px-4 py-3 transition-all hover:bg-gray-100"
              >
                <span className={`text-sm ${pickup ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                  {pickup ? pickup.name : 'Pickup location'}
                </span>
              </button>
              <button
                onClick={() => openSearch('dropoff')}
                className="w-full text-left bg-gray-50 rounded-xl px-4 py-3 transition-all hover:bg-gray-100"
              >
                <span className={`text-sm ${dropoff ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                  {dropoff ? dropoff.name : 'Where to?'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick destinations */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {[
              { icon: '🏠', label: 'Home', sub: 'Park Ave', name: 'Home', address: '123 Park Avenue, NY' },
              { icon: '🏢', label: 'Office', sub: 'Wall St', name: 'Office', address: '456 Wall Street, NY' },
              { icon: '✈️', label: 'Airport', sub: 'JFK', name: 'JFK Airport', address: 'Queens, NY 11430' },
            ].map((q, i) => (
              <button
                key={i}
                className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 min-w-fit hover:bg-gray-100 transition-colors"
                onClick={() => {
                  if (!pickup) {
                    setPickup({ name: q.name, address: q.address })
                  } else if (!dropoff) {
                    setDropoff({ name: q.name, address: q.address })
                  }
                }}
              >
                <span className="text-base">{q.icon}</span>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-700">{q.label}</div>
                  <div className="text-[10px] text-gray-400">{q.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Book button */}
          <button
            onClick={handleBookRide}
            disabled={!pickup || !dropoff}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
              pickup && dropoff
                ? 'btn-primary shadow-md shadow-primary-500/30'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {pickup && dropoff ? 'Choose Ride' : 'Set pickup & destination'}
          </button>
        </div>
      </div>

      {/* Location search overlay */}
      {showSearch && (
        <LocationSearch
          type={searchType}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  )
}
