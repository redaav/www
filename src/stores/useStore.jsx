import { useState, useCallback } from 'react'

const VEHICLES = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable everyday rides',
    icon: '🚗',
    priceMultiplier: 1.0,
    capacity: '4 seats',
    eta: '3-5 min',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'More space & comfort',
    icon: '🚙',
    priceMultiplier: 1.4,
    capacity: '4 seats',
    eta: '5-8 min',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury & style',
    icon: '🏎️',
    priceMultiplier: 2.2,
    capacity: '4 seats',
    eta: '8-12 min',
  },
]

const DRIVERS = [
  {
    id: 'd1',
    name: 'James Wilson',
    rating: 4.9,
    trips: 2341,
    car: 'Toyota Camry 2023',
    plate: 'ABC 1234',
    phone: '+1 (555) 123-4567',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    id: 'd2',
    name: 'Sarah Chen',
    rating: 4.8,
    trips: 1856,
    car: 'Honda Accord 2024',
    plate: 'XYZ 5678',
    phone: '+1 (555) 987-6543',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    id: 'd3',
    name: 'Michael Brown',
    rating: 4.95,
    trips: 3102,
    car: 'BMW 5 Series 2024',
    plate: 'LUX 9012',
    phone: '+1 (555) 456-7890',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
]

const MOCK_HISTORY = [
  {
    id: 'r1',
    date: '2026-06-04T14:30:00',
    pickup: 'Central Park West',
    dropoff: 'JFK Airport Terminal 4',
    price: 52.50,
    vehicle: 'Comfort',
    status: 'completed',
    duration: '45 min',
    distance: '18.2 mi',
  },
  {
    id: 'r2',
    date: '2026-06-03T09:15:00',
    pickup: 'Brooklyn Heights',
    dropoff: 'Manhattan Financial District',
    price: 22.00,
    vehicle: 'Economy',
    status: 'completed',
    duration: '22 min',
    distance: '5.8 mi',
  },
  {
    id: 'r3',
    date: '2026-06-01T20:00:00',
    pickup: 'Times Square',
    dropoff: 'Upper East Side',
    price: 18.75,
    vehicle: 'Economy',
    status: 'completed',
    duration: '18 min',
    distance: '3.1 mi',
  },
  {
    id: 'r4',
    date: '2026-05-30T11:45:00',
    pickup: 'Grand Central Terminal',
    dropoff: 'LaGuardia Airport',
    price: 38.00,
    vehicle: 'Comfort',
    status: 'completed',
    duration: '35 min',
    distance: '9.4 mi',
  },
  {
    id: 'r5',
    date: '2026-05-28T16:20:00',
    pickup: 'SoHo',
    dropoff: 'Williamsburg',
    price: 45.00,
    vehicle: 'Premium',
    status: 'cancelled',
    duration: '--',
    distance: '4.2 mi',
  },
]

const LOCATIONS = [
  { id: 'l1', name: 'Current Location', address: '350 5th Ave, New York', icon: '📍' },
  { id: 'l2', name: 'JFK Airport', address: 'Queens, NY 11430', icon: '✈️' },
  { id: 'l3', name: 'Central Park', address: 'New York, NY 10024', icon: '🌳' },
  { id: 'l4', name: 'Times Square', address: 'Manhattan, NY 10036', icon: '🌃' },
  { id: 'l5', name: 'Brooklyn Bridge', address: 'New York, NY 10038', icon: '🌉' },
  { id: 'l6', name: 'Grand Central Terminal', address: '89 E 42nd St, New York', icon: '🚉' },
]

export function useStore() {
  const [pickup, setPickup] = useState(null)
  const [dropoff, setDropoff] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [rideState, setRideState] = useState('idle') // idle | selecting | confirmed | arriving | in_progress | completed
  const [currentDriver, setCurrentDriver] = useState(null)
  const [eta, setEta] = useState(null)
  const [rideHistory, setRideHistory] = useState(MOCK_HISTORY)
  const [paymentMethod, setPaymentMethod] = useState('visa')
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 000-1234',
    photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  })

  const calculatePrice = useCallback((basePrice = 22) => {
    if (!selectedVehicle) return basePrice
    const v = VEHICLES.find(v => v.id === selectedVehicle)
    return +(basePrice * v.priceMultiplier).toFixed(2)
  }, [selectedVehicle])

  const confirmRide = useCallback(() => {
    const driverIndex = selectedVehicle === 'premium' ? 2 : selectedVehicle === 'comfort' ? 1 : 0
    const driver = DRIVERS[driverIndex]
    setCurrentDriver(driver)
    setRideState('confirmed')
    setEta(selectedVehicle === 'premium' ? '8-12' : selectedVehicle === 'comfort' ? '5-8' : '3-5')
  }, [selectedVehicle])

  const cancelRide = useCallback(() => {
    setRideState('idle')
    setCurrentDriver(null)
    setEta(null)
    setSelectedVehicle(null)
    setPickup(null)
    setDropoff(null)
  }, [])

  const completeRide = useCallback(() => {
    const newRide = {
      id: 'r' + Date.now(),
      date: new Date().toISOString(),
      pickup: pickup?.name || 'Pickup',
      dropoff: dropoff?.name || 'Dropoff',
      price: calculatePrice(),
      vehicle: VEHICLES.find(v => v.id === selectedVehicle)?.name || 'Economy',
      status: 'completed',
      duration: '25 min',
      distance: '7.3 mi',
    }
    setRideHistory(prev => [newRide, ...prev])
    setRideState('idle')
    setCurrentDriver(null)
    setEta(null)
    setSelectedVehicle(null)
    setPickup(null)
    setDropoff(null)
  }, [pickup, dropoff, selectedVehicle, calculatePrice])

  return {
    pickup, setPickup,
    dropoff, setDropoff,
    selectedVehicle, setSelectedVehicle,
    rideState, setRideState,
    currentDriver,
    eta,
    rideHistory,
    paymentMethod, setPaymentMethod,
    profile, setProfile,
    calculatePrice,
    confirmRide,
    cancelRide,
    completeRide,
    vehicles: VEHICLES,
    drivers: DRIVERS,
    locations: LOCATIONS,
  }
}
