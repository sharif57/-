'use client'

import { useEffect, useRef } from 'react'

export function IslamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Stars array
    const stars: Array<{ x: number; y: number; radius: number; opacity: number; twinkleSpeed: number }> = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    // Lanterns array
    const lanterns: Array<{ x: number; y: number; phase: number; speed: number; size: number }> = []
    for (let i = 0; i < 5; i++) {
      lanterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4) + canvas.height * 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.005,
        size: Math.random() * 20 + 15,
      })
    }

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 1

      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a1a2e')
      gradient.addColorStop(0.3, '#16213e')
      gradient.addColorStop(0.6, '#0f3460')
      gradient.addColorStop(1, '#1a4d6d')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        ctx.fillStyle = `rgba(255, 255, 200, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw crescent moon
      const moonX = canvas.width * 0.85
      const moonY = canvas.height * 0.15
      const moonRadius = 50
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 1.5)
      moonGlow.addColorStop(0, 'rgba(255, 200, 87, 0.3)')
      moonGlow.addColorStop(1, 'rgba(255, 200, 87, 0)')
      ctx.fillStyle = moonGlow
      ctx.fillRect(moonX - moonRadius * 1.5, moonY - moonRadius * 1.5, moonRadius * 3, moonRadius * 3)

      // Crescent shape
      ctx.fillStyle = '#ffc857'
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#0a1a2e'
      ctx.beginPath()
      ctx.arc(moonX + 15, moonY, moonRadius - 5, 0, Math.PI * 2)
      ctx.fill()

      // Star on moon
      ctx.fillStyle = '#ffc857'
      ctx.font = 'bold 20px Arial'
      ctx.fillText('✨', moonX - 5, moonY + 8)

      // Draw mosque silhouettes
      const mosques = [
        { x: 50, y: canvas.height * 0.65, scale: 0.7 },
        { x: canvas.width * 0.5, y: canvas.height * 0.7, scale: 1 },
        { x: canvas.width - 120, y: canvas.height * 0.68, scale: 0.8 },
      ]

      mosques.forEach((mosque) => {
        // Base
        ctx.fillStyle = 'rgba(10, 26, 46, 0.9)'
        ctx.fillRect(mosque.x - 40 * mosque.scale, mosque.y, 80 * mosque.scale, 50 * mosque.scale)

        // Domes
        ctx.fillStyle = 'rgba(10, 26, 46, 0.95)'
        ctx.beginPath()
        ctx.arc(mosque.x - 20 * mosque.scale, mosque.y - 10 * mosque.scale, 20 * mosque.scale, 0, Math.PI)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mosque.x + 20 * mosque.scale, mosque.y - 10 * mosque.scale, 20 * mosque.scale, 0, Math.PI)
        ctx.fill()

        // Center dome (slightly larger)
        ctx.beginPath()
        ctx.arc(mosque.x, mosque.y - 20 * mosque.scale, 25 * mosque.scale, 0, Math.PI)
        ctx.fill()

        // Crescent on top
        ctx.fillStyle = '#ffc857'
        ctx.font = `${12 * mosque.scale}px Arial`
        ctx.fillText('☪', mosque.x - 6 * mosque.scale, mosque.y - 35 * mosque.scale)

        // Minaret
        ctx.strokeStyle = 'rgba(10, 26, 46, 0.95)'
        ctx.lineWidth = 3 * mosque.scale
        ctx.beginPath()
        ctx.moveTo(mosque.x + 35 * mosque.scale, mosque.y - 5 * mosque.scale)
        ctx.lineTo(mosque.x + 35 * mosque.scale, mosque.y - 40 * mosque.scale)
        ctx.stroke()

        // Minaret top
        ctx.fillStyle = '#ffc857'
        ctx.beginPath()
        ctx.arc(mosque.x + 35 * mosque.scale, mosque.y - 42 * mosque.scale, 4 * mosque.scale, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw floating lanterns
      lanterns.forEach((lantern) => {
        lantern.phase += lantern.speed

        const floatY = lantern.y + Math.sin(lantern.phase) * 30
        const bobX = lantern.x + Math.cos(lantern.phase * 0.5) * 20

        // Lantern glow
        const lanternGlow = ctx.createRadialGradient(bobX, floatY, 0, bobX, floatY, lantern.size * 2)
        lanternGlow.addColorStop(0, `rgba(255, 200, 87, 0.4)`)
        lanternGlow.addColorStop(1, `rgba(255, 200, 87, 0)`)
        ctx.fillStyle = lanternGlow
        ctx.fillRect(bobX - lantern.size * 2, floatY - lantern.size * 2, lantern.size * 4, lantern.size * 4)

        // Lantern body
        ctx.fillStyle = 'rgba(255, 200, 87, 0.7)'
        ctx.fillRect(bobX - lantern.size / 2, floatY - lantern.size / 2, lantern.size, lantern.size)

        // Lantern decorations
        ctx.strokeStyle = 'rgba(255, 200, 87, 0.9)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(bobX - lantern.size / 2, floatY)
        ctx.lineTo(bobX + lantern.size / 2, floatY)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(bobX, floatY - lantern.size / 2)
        ctx.lineTo(bobX, floatY + lantern.size / 2)
        ctx.stroke()
      })

      // Islamic pattern lines (subtle)
      ctx.strokeStyle = 'rgba(15, 52, 96, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath()
        ctx.moveTo(i, canvas.height * 0.6)
        ctx.quadraticCurveTo(i + 50, canvas.height * 0.55, i + 100, canvas.height * 0.6)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  )
}
