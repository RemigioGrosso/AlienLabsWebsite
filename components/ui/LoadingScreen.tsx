'use client'

import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const bootSequence = [
    'alien@labs:~$ sudo systemctl stop windows.service',
    '[sudo] password for alien: ********',
    'Stopping Windows services... [OK]',
    'alien@labs:~$ sudo mount /dev/sda1 /mnt/alienlabs',
    'Mounting Alien Labs OS partition... [OK]',
    'alien@labs:~$ sudo chroot /mnt/alienlabs',
    'Switching to Alien Labs environment...',
    'Welcome to Alien Labs OS',
    'alien@labs:~$ _'
  ]

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0

    const typeNextChar = () => {
      if (lineIndex >= bootSequence.length) {
        setTimeout(() => onComplete(), 300)
        return
      }

      const currentBootLine = bootSequence[lineIndex]

      if (charIndex < currentBootLine.length) {
        setCurrentLine(currentBootLine.substring(0, charIndex + 1))
        setIsTyping(true)
        charIndex++
        setTimeout(typeNextChar, Math.random() * 10 + 5)
      } else {
        setTerminalLines(prev => [...prev, currentBootLine])
        setCurrentLine('')
        setIsTyping(false)
        lineIndex++
        charIndex = 0
        setTimeout(typeNextChar, Math.random() * 50 + 25)
      }
    }

    const startDelay = setTimeout(typeNextChar, 200)
    return () => clearTimeout(startDelay)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-start justify-start z-50 font-win95-mono p-4">
      {/* Terminal scanlines for CRT effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(105, 117, 101, 0.1) 2px, rgba(105, 117, 101, 0.1) 4px)'
          }}
        ></div>
      </div>

      {/* Linux terminal */}
      <div className="w-full max-w-5xl bg-black text-earthy-medium relative z-10">
        {/* Terminal content with ambient glow */}
        <div className="text-sm leading-relaxed pl-2" style={{ textShadow: '0 0 10px rgba(105, 117, 101, 0.5), 0 0 20px rgba(105, 117, 101, 0.3), 0 0 30px rgba(105, 117, 101, 0.1)' }}>
          {/* Completed lines */}
          {terminalLines.map((line, index) => (
            <div key={index} className="mb-1">
              {line === '' ? '\u00A0' : (
                <span>
                  {line.includes('alien@labs:~$') ? (
                    <>
                      <span className="text-earthy-light" style={{ textShadow: '0 0 8px rgba(236, 223, 204, 0.6)' }}>alien@labs</span>
                      <span className="text-earthy-medium">:</span>
                      <span className="text-blue-400" style={{ textShadow: '0 0 8px rgba(96, 165, 250, 0.4)' }}>~</span>
                      <span className="text-earthy-medium">$ </span>
                      <span className="text-earthy-light">{line.split('$ ')[1]}</span>
                    </>
                  ) : line.includes('[OK]') ? (
                    <>
                      <span>{line.split('[OK]')[0]}</span>
                      <span className="text-green-400" style={{ textShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }}>[OK]</span>
                    </>
                  ) : line.includes('password') ? (
                    <span className="text-yellow-400" style={{ textShadow: '0 0 8px rgba(250, 204, 21, 0.5)' }}>{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              )}
            </div>
          ))}

          {/* Current typing line */}
          {currentLine && (
            <div className="mb-1">
              {currentLine.includes('alien@labs:~$') ? (
                <>
                  <span className="text-earthy-light" style={{ textShadow: '0 0 8px rgba(236, 223, 204, 0.6)' }}>alien@labs</span>
                  <span className="text-earthy-medium">:</span>
                  <span className="text-blue-400" style={{ textShadow: '0 0 8px rgba(96, 165, 250, 0.4)' }}>~</span>
                  <span className="text-earthy-medium">$ </span>
                  <span className="text-earthy-light">{currentLine.split('$ ')[1] || ''}</span>
                </>
              ) : currentLine.includes('[OK]') ? (
                <>
                  <span>{currentLine.split('[OK]')[0]}</span>
                  <span className="text-green-400" style={{ textShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }}>[OK]</span>
                </>
              ) : currentLine.includes('password') ? (
                <span className="text-yellow-400" style={{ textShadow: '0 0 8px rgba(250, 204, 21, 0.5)' }}>{currentLine}</span>
              ) : (
                <span>{currentLine}</span>
              )}
              {isTyping && <span className="animate-pulse bg-earthy-medium text-black w-2 h-4 inline-block ml-1">_</span>}
            </div>
          )}

          {/* Cursor */}
          {!isTyping && terminalLines.length < bootSequence.length && (
            <div className="flex items-center">
              <span className="animate-pulse bg-earthy-medium text-black w-2 h-4 inline-block">_</span>
            </div>
          )}
        </div>

        {/* Ambient glow overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-earthy-medium/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-earthy-medium/3 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}