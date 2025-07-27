'use client'

import { useEffect, useState } from 'react'

export default function CursorLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Main cursor light */}
      <div
        className="fixed pointer-events-none z-[-1] transition-transform duration-300 ease-out"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary ambient glow */}
      <div
        className="fixed pointer-events-none z-[-1] transition-transform duration-500 ease-out"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 223, 204, 0.15) 0%, rgba(236, 223, 204, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Inner bright core */}
      <div
        className="fixed pointer-events-none z-[-1] transition-transform duration-200 ease-out"
        style={{
          left: mousePosition.x - 75,
          top: mousePosition.y - 75,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
    </>
  )
}