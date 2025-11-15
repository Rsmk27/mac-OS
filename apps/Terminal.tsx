'use client'

import { useState, useEffect } from 'react'

interface TerminalProps {
  windowId: string
}

interface CommandHistory {
  command: string
  output: string
}

const COMMANDS = {
  help: () => `Available commands:
  help     - Show this help message
  ls       - List files
  cd       - Change directory (simulated)
  echo     - Print text
  clear    - Clear terminal
  date     - Show current date and time
  whoami   - Show current user`,
  ls: () => `Documents  Downloads  Pictures  Music  Desktop`,
  cd: (args: string) => args ? `Changed directory to ${args}` : 'Usage: cd <directory>',
  echo: (args: string) => args || '',
  clear: () => '__CLEAR__',
  date: () => new Date().toString(),
  whoami: () => 'guest',
}

export default function Terminal({ windowId }: TerminalProps) {
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', output: 'Web Terminal v1.0\nType "help" for available commands.\n' }
  ])
  const [input, setInput] = useState('')

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) {
      setHistory(prev => [...prev, { command: '', output: '' }])
      return
    }

    const [command, ...args] = trimmed.split(' ')
    const argsStr = args.join(' ')

    let output = ''
    if (command in COMMANDS) {
      const result = (COMMANDS as any)[command](argsStr)
      if (result === '__CLEAR__') {
        setHistory([])
        setInput('')
        return
      }
      output = result
    } else {
      output = `Command not found: ${command}\nType "help" for available commands.`
    }

    setHistory(prev => [...prev, { command: trimmed, output }])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(input)
    }
  }

  return (
    <div className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 overflow-y-auto">
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.command && (
            <div className="flex items-center">
              <span className="text-blue-400">guest@macos</span>
              <span className="text-white mx-2">$</span>
              <span className="text-gray-300">{item.command}</span>
            </div>
          )}
          {item.output && (
            <pre className="whitespace-pre-wrap mt-1">{item.output}</pre>
          )}
        </div>
      ))}
      
      {/* Input line */}
      <div className="flex items-center">
        <span className="text-blue-400">guest@macos</span>
        <span className="text-white mx-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-gray-300"
          autoFocus
        />
      </div>
    </div>
  )
}
