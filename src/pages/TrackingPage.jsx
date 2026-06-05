import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, MessageSquare, X, Star, Shield, Navigation } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

export default function TrackingPage() {
  const navigate = useNavigate()
  const {
    rideState, setRideState,
    currentDriver, eta,
    pickup, dropoff,
    selectedVehicle, vehicles,
    cancelRide, completeRide,
    calculatePrice,
  } = useAppStore()

  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (rideState === 'confirmed') {
      const t1 = setTimeout(() => setRideState('arriving'), 3000)
      return () => clearTimeout(t1)
    }
    if (rideState === 'arriving') {
      const t2 = setTimeout(() => setRideState('in_progress'), 3000)
      return () => clearTimeout(t2)
    }
    if (rideState === 'in_progress') {
      const timer = setInterval(() => setElapsed(e => e + 1), 1)
      const t3 = setTimeout(() => {
        clearInterval(timer)
        setRideState('completed')
      }, 6000)
      return () => {
        clearInterval(timer)
        clearTimeout(t3)
      }
    }
  }, [rideState, setRideState])

  const statusConfig = {
    confirmed: { label: 'Driver assigned', color: 'bg-primary-500', subtext: 'Your driver is on the way' },
    arriving: { label: 'Driver arriving', color: 'bg-warning-500', subtext: `${eta} min away` },
    in_progress: { label: 'On the ride', color: 'bg-primary-500', subtext: 'Heading to destination' },
    completed: { label: 'Ride complete', color: 'bg-success-500', subtext: 'You have arrived!' },
  }

  const config = statusConfig[rideState] || statusConfig.confirmed
  const vehicleName = vehicles.find(v => v.id === selectedVehicle)?.name || 'Economy'

  if (rideState === 'completed') {
    return (
      <div className="page-container items-center justify-center p-6">
        <div className="card p-8 text-center w-full max-w-sm">
          <div className="w-20 h-20 rounded-full bg-success-100 mx-auto mb-4 flex items-center justify-center">
            <Shield size={40} className="text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Ride Complete!</h2>
          <p className="text-gray-400 mb-6">You've arrived at your destination</p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Vehicle</span>
              <span className="text-sm font-medium">{vehicleName}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Distance</span>
              <span className="text-sm font-medium">7.3 mi</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Duration</span>
              <span className="text-sm font-medium">{elapsed > 0 ? `${Math.floor(elapsed / 60) + 25} min` : '25 min'}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="text-xl font-bold text-primary-600">${calculatePrice()}</span>
            </div>
          </div>

          {/* Rate driver */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Rate your driver</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} className="p-1 hover:scale-110 transition-transform">
                  <Star size={28} className={s <= 4 ? 'text-warning-400 fill-warning-400' : 'text-gray-200'} />
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { completeRide(); navigate('/') }} className="btn-primary w-full">
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Map area with route */}
      <div className="relative h-[45%] bg-gradient-to-b from-primary-50 to-gray-100">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Route line */}
          <path
            d="M 80 180 C 120 120, 200 80, 280 60"
            stroke="#008577"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="animate-route"
          />
          {/* Pickup dot */}
          <circle cx="80" cy="180" r="8" fill="#008577" stroke="white" strokeWidth="3" />
          {/* Dropoff dot */}
          <circle cx="280" cy="60" r="8" fill="#D81B60" stroke="white" strokeWidth="3" />
          {/* Driver car position */}
          {rideState === 'confirmed' && (
            <g>
              <circle cx="120" cy="150" r="16" fill="white" stroke="#008577" strokeWidth="2" />
              <text x="120" y="155" textAnchor="middle" fontSize="14">🚗</text>
            </g>
          )}
          {(rideState === 'arriving' || rideState === 'in_progress') && (
            <g>
              <circle cx="170" cy="110" r="16" fill="white" stroke="#008577" strokeWidth="2" />
              <text x="170" y="115" textAnchor="middle" fontSize="14">🚗</text>
            </g>
          )}
          {/* Grid streets */}
          <line x1="0" y1="60" x2="100%" y2="60" stroke="#008577" strokeWidth="1" opacity="0.15" />
          <line x1="0" y1="120" x2="100%" y2="120" stroke="#008577" strokeWidth="1" opacity="0.15" />
          <line x1="0" y1="180" x2="100%" y2="180" stroke="#008577" strokeWidth="1" opacity="0.15" />
          <line x1="80" y1="0" x2="80" y2="100%" stroke="#008577" strokeWidth="1" opacity="0.15" />
          <line x1="180" y1="0" x2="180" y2="100%" stroke="#008577" strokeWidth="1" opacity="0.15" />
          <line x1="280" y1="0" x2="280" y2="100%" stroke="#008577" strokeWidth="1" opacity="0.15" />
        </svg>

        {/* Status pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div className={`${config.color} text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2`}>
            {rideState === 'in_progress' && <Navigation size={14} className="animate-pulse" />}
            <span className="text-sm font-semibold">{config.label}</span>
          </div>
        </div>

        {/* Cancel button */}
        {rideState !== 'in_progress' && (
          <button
            onClick={() => { cancelRide(); navigate('/') }}
            className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <X size={18} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Driver info bottom sheet */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 shadow-2xl p-5 relative z-10">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* ETA */}
        <div className="text-center mb-4">
          <p className="text-gray-400 text-xs">{config.subtext}</p>
        </div>

        {/* Driver card */}
        {currentDriver && (
          <div className="card p-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={currentDriver.photo}
                alt={currentDriver.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{currentDriver.name}</div>
                <div className="text-xs text-gray-400">{currentDriver.car}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={12} className="text-warning-400 fill-warning-400" />
                  <span className="text-xs font-medium text-gray-600">{currentDriver.rating}</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">{currentDriver.trips} trips</span>
                </div>
              </div>
              <div className="bg-primary-50 px-3 py-2 rounded-xl">
                <span className="text-xs font-bold text-primary-700">{currentDriver.plate}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-primary-50 py-2.5 rounded-xl hover:bg-primary-100 transition-colors">
                <Phone size={16} className="text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Call</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                <MessageSquare size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Message</span>
              </button>
            </div>
          </div>
        )}

        {/* Route info */}
        <div className="flex items-stretch gap-3 mb-3">
          <div className="flex flex-col items-center py-2 gap-0.5">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
            <div className="w-0.5 flex-1 bg-gray-300 min-h-[12px]" />
            <div className="w-2 h-2 rounded-sm bg-accent-500" />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <div className="text-xs text-gray-400">Pickup</div>
              <div className="text-sm font-medium text-gray-700">{pickup?.name || 'Pickup'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Destination</div>
              <div className="text-sm font-medium text-gray-700">{dropoff?.name || 'Destination'}</div>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">Estimated fare</span>
          <span className="font-bold text-primary-600">${calculatePrice()}</span>
        </div>
      </div>
    </div>
  )
}
