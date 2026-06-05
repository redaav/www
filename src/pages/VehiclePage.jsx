import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Star } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

export default function VehiclePage() {
  const navigate = useNavigate()
  const { vehicles, selectedVehicle, setSelectedVehicle, pickup, dropoff, calculatePrice, confirmRide } = useAppStore()

  const basePrice = 22

  const handleConfirm = () => {
    confirmRide()
    navigate('/tracking')
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <div>
            <h1 className="font-bold text-lg text-gray-800">Choose your ride</h1>
            <p className="text-xs text-gray-400">{pickup?.name} → {dropoff?.name}</p>
          </div>
        </div>
      </div>

      {/* Route summary */}
      <div className="bg-primary-50 px-5 py-3 flex items-center gap-3">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-2 h-2 rounded-full bg-primary-500" />
          <div className="w-0.5 h-3 bg-primary-300" />
          <div className="w-2 h-2 rounded-sm bg-accent-500" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-600">{pickup?.address}</div>
          <div className="text-xs text-gray-600 mt-1">{dropoff?.address}</div>
        </div>
        <div className="text-xs text-gray-400">7.3 mi</div>
      </div>

      {/* Vehicle options */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {vehicles.map((v) => {
          const isSelected = selectedVehicle === v.id
          const price = +(basePrice * v.priceMultiplier).toFixed(2)

          return (
            <button
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              className={`w-full card p-4 flex items-center gap-4 transition-all duration-200 ${
                isSelected ? 'ring-2 ring-primary-500 shadow-md' : 'hover:shadow-sm'
              }`}
            >
              {/* Vehicle icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-colors ${
                isSelected ? 'bg-primary-50' : 'bg-gray-50'
              }`}>
                {v.icon}
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{v.name}</span>
                  {v.id === 'premium' && (
                    <span className="text-[10px] bg-warning-100 text-warning-700 px-1.5 py-0.5 rounded-full font-semibold">
                      LUXURY
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{v.description}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Users size={12} /> {v.capacity}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {v.eta}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800">${price}</div>
                {v.priceMultiplier > 1 && (
                  <div className="text-[10px] text-gray-400 line-through">${basePrice}</div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Payment & Confirm */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Payment</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-blue-600 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
            <span className="text-sm font-medium text-gray-700">•••• 4242</span>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!selectedVehicle}
          className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
            selectedVehicle
              ? 'btn-primary shadow-md shadow-primary-500/30'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedVehicle ? `Confirm ${vehicles.find(v => v.id === selectedVehicle)?.name} — $${calculatePrice()}` : 'Select a vehicle'}
        </button>
      </div>
    </div>
  )
}
