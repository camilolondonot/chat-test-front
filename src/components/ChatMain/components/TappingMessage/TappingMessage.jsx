import React, { useState } from 'react'

const TappingMessage = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() === '') return
    onSend(message.trim())
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className={`transition-all duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <label htmlFor="message">
        <div className="relative">
          <input
            disabled={disabled}
            type="text"
            placeholder="Escribir..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-4 py-3 rounded-b-lg border-none pe-10 shadow-md sm:text-sm transition-all duration-300 ${
              disabled ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />

          <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
            <button
              type="button"
              aria-label="Submit"
              onClick={handleSend}
              disabled={disabled}
              className={`rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100 duration-300 ${
                disabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-send" viewBox="0 0 16 16" height={16} width={16}>
                <path d="M15.854 0.146a0.5 0.5 0 0 1 0.11 0.54l-5.819 14.547a0.75 0.75 0 0 1 -1.329 0.124l-3.178 -4.995L0.643 7.184a0.75 0.75 0 0 1 0.124 -1.33L15.314 0.037a0.5 0.5 0 0 1 0.54 0.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787 -8.201L1.591 6.602l4.339 2.76z" strokeWidth={1} />
              </svg>
            </button>
          </span>
        </div>
      </label>
    </div>
  )
}

export default TappingMessage