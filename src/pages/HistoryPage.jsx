import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

export default function HistoryPage() {
  const navigate = useNavigate()
  const { rideHistory } = useAppStore()

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const today = new Date()
    const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    if (diff < 7) return `${diff} days ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-lg text-gray-800">Ride History</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-500 p-4 mx-4 mt-4 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-primary-100 text-xs font-medium">Total Rides</div>
            <div className="text-2xl font-bold">{rideHistory.filter(r => r.status === 'completed').length}</div>
          </div>
          <div>
            <div className="text-primary-100 text-xs font-medium">Total Spent</div>
            <div className="text-2xl font-bold">
              ${rideHistory.filter(r => r.status === 'completed').reduce((s, r) => s + r.price, 0).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-primary-100 text-xs font-medium">Avg. Fare</div>
            <div className="text-2xl font-bold">
              ${(rideHistory.filter(r => r.status === 'completed').reduce((s, r) => s + r.price, 0) / rideHistory.filter(r => r.status === 'completed').length).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Ride list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {rideHistory.map(ride => (
          <div key={ride.id} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">{formatDate(ride.date)} · {formatTime(ride.date)}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                ride.status === 'completed'
                  ? 'bg-success-50 text-success-600'
                  : 'bg-error-50 text-error-600'
              }`}>
                {ride.status === 'completed' ? 'Completed' : 'Cancelled'}
              </span>
            </div>

            <div className="flex items-stretch gap-3 mb-3">
              <div className="flex flex-col items-center py-1 gap-0.5">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <div className="w-0.5 flex-1 bg-gray-200 min-h-[8px]" />
                <div className="w-2 h-2 rounded-sm bg-accent-500" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="text-sm text-gray-700">{ride.pickup}</div>
                <div className="text-sm text-gray-700">{ride.dropoff}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} /> {ride.duration}
                </span>
                <span className="text-xs text-gray-400">{ride.distance}</span>
                <span className="text-xs text-gray-400">{ride.vehicle}</span>
              </div>
              <span className={`font-bold ${ride.status === 'completed' ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                ${ride.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
