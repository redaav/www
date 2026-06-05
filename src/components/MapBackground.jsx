import { MapPin, Navigation } from 'lucide-react'

export default function MapBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Grid lines simulating streets */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal streets */}
        <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#008577" strokeWidth="2" />
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#008577" strokeWidth="3" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#008577" strokeWidth="2" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#008577" strokeWidth="3" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#008577" strokeWidth="2" />
        <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#008577" strokeWidth="2" />
        {/* Vertical streets */}
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#008577" strokeWidth="2" />
        <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#008577" strokeWidth="3" />
        <line x1="55%" y1="0" x2="55%" y2="100%" stroke="#008577" strokeWidth="2" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#008577" strokeWidth="3" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#008577" strokeWidth="2" />
        {/* Buildings blocks */}
        <rect x="18%" y="18%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="38%" y="18%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="58%" y="33%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="18%" y="48%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="78%" y="48%" width="10%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="38%" y="63%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="58%" y="63%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="18%" y="78%" width="14%" height="10%" rx="2" fill="#008577" opacity="0.1" />
        <rect x="78%" y="78%" width="10%" height="10%" rx="2" fill="#008577" opacity="0.1" />
      </svg>

      {/* Current location indicator */}
      <div className="absolute top-[40%] left-[45%] flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center animate-ping-slow">
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary-500 border-2 border-white shadow-lg flex items-center justify-center">
              <Navigation size={12} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Nearby car indicators */}
      <div className="absolute top-[25%] left-[30%] car-move">
        <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs font-medium text-gray-700 flex items-center gap-1">
          🚗 <span>2 min</span>
        </div>
      </div>
      <div className="absolute top-[55%] right-[20%] car-move" style={{animationDelay: '1s'}}>
        <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs font-medium text-gray-700 flex items-center gap-1">
          🚙 <span>4 min</span>
        </div>
      </div>
      <div className="absolute top-[70%] left-[60%] car-move" style={{animationDelay: '2s'}}>
        <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs font-medium text-gray-700 flex items-center gap-1">
          🏎️ <span>7 min</span>
        </div>
      </div>
    </div>
  )
}
