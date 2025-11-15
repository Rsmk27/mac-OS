'use client'

import { useState } from 'react'

interface CalendarProps {
  windowId: string
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  color: string
}

const SAMPLE_EVENTS: Event[] = [
  { id: '1', title: 'Team Meeting', date: '2024-01-15', time: '10:00 AM', color: 'blue' },
  { id: '2', title: 'Project Deadline', date: '2024-01-16', time: '5:00 PM', color: 'red' },
  { id: '3', title: 'Lunch with Client', date: '2024-01-17', time: '12:30 PM', color: 'green' },
]

export default function Calendar({ windowId }: CalendarProps) {
  const [view, setView] = useState<'month' | 'list'>('month')
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const days = getDaysInMonth(selectedDate)
  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold ml-2">{monthName}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded text-sm ${view === 'month' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1 rounded text-sm ${view === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {view === 'month' ? (
          <div>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square border border-gray-200 dark:border-gray-700 rounded p-2 ${
                    day ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : ''
                  }`}
                >
                  {day && (
                    <div className="text-sm">
                      <div className="font-medium">{day}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map(event => (
              <div
                key={event.id}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`inline-block w-2 h-2 rounded-full mr-2 bg-${event.color}-500`} />
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
