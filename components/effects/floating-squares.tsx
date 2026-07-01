"use client"

import { useEffect, useRef } from "react"

export function FloatingSquares({ count = 30 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()

    const squares = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.12 + 0.03,
    }))

    let frameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of squares) {
        s.x += s.vx
        s.y += s.vy

        if (s.x < -s.size) s.x = canvas.width + s.size
        if (s.x > canvas.width + s.size) s.x = -s.size
        if (s.y < -s.size) s.y = canvas.height + s.size
        if (s.y > canvas.height + s.size) s.y = -s.size

        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${s.opacity})`
        ctx.fillRect(s.x, s.y, s.size, s.size)
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" />
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "224, 105, 0"
  return `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
}
