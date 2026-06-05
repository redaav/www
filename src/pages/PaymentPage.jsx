import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Plus, Check, Trash2 } from 'lucide-react'
import { useAppStore } from '../stores/StoreContext'

const PAYMENT_METHODS = [
  { id: 'visa', type: 'Visa', last4: '4242', expiry: '12/28', icon: '💳', color: 'bg-blue-600' },
  { id: 'mastercard', type: 'Mastercard', last4: '8888', expiry: '06/27', icon: '💳', color: 'bg-red-500' },
  { id: 'apple', type: 'Apple Pay', last4: '', expiry: '', icon: '🍎', color: 'bg-gray-800' },
]

export default function PaymentPage() {
  const navigate = useNavigate()
  const { paymentMethod, setPaymentMethod } = useAppStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' })

  const handleAddCard = () => {
    if (newCard.number.length >= 15) {
      setShowAdd(false)
      setNewCard({ number: '', expiry: '', cvv: '' })
    }
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-lg text-gray-800">Payment Methods</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Wallet balance */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-5 text-white">
          <div className="text-primary-100 text-xs font-medium">BookIt Wallet</div>
          <div className="text-3xl font-bold mt-1">$124.50</div>
          <div className="text-primary-200 text-xs mt-1">Available balance</div>
        </div>

        {/* Payment methods */}
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4">Your Cards</h3>
        {PAYMENT_METHODS.map(pm => (
          <button
            key={pm.id}
            onClick={() => setPaymentMethod(pm.id)}
            className={`w-full card p-4 flex items-center gap-3 transition-all ${
              paymentMethod === pm.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className={`w-10 h-7 ${pm.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
              {pm.type === 'Apple Pay' ? '🍎' : pm.type.slice(0, 4).toUpperCase()}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-800">
                {pm.type} {pm.last4 ? `•••• ${pm.last4}` : ''}
              </div>
              {pm.expiry && <div className="text-xs text-gray-400">Exp {pm.expiry}</div>}
            </div>
            {paymentMethod === pm.id && (
              <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}

        {/* Add new card */}
        <button
          onClick={() => setShowAdd(true)}
          className="w-full card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
        >
          <div className="w-10 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <Plus size={18} className="text-gray-400" />
          </div>
          <span className="text-sm font-medium text-primary-500">Add new card</span>
        </button>

        {/* Add card form */}
        {showAdd && (
          <div className="card p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">New Card</h3>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Card Number</label>
              <input
                type="text"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                placeholder="1234 5678 9012 3456"
                className="input-field"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-400 font-medium mb-1 block">Expiry</label>
                <input
                  type="text"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value.slice(0, 5)})}
                  placeholder="MM/YY"
                  className="input-field"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-gray-400 font-medium mb-1 block">CVV</label>
                <input
                  type="text"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                  placeholder="123"
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleAddCard} className="btn-primary flex-1">Add Card</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
