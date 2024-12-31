'use client'

import { cn } from '@/lib/utils'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface ScratchToMintProps {
  children: React.ReactNode
  width: number
  height: number
  minScratchPercentage?: number
  className?: string
  onComplete?: () => void
  overlayImage: string
  disabled?: boolean
  onClick?: () => void
}

const ScratchToMint: React.FC<ScratchToMintProps> = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  overlayImage,
  disabled = false,
  onClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  const controls = useAnimation()

  useEffect(() => {
    if (overlayImage) {
      const img = new Image()
      img.src = overlayImage
      img.onload = () => {
        setImage(img)
      }
    }
  }, [overlayImage])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      ctx.fillStyle = '#ccc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      }
    }
  }, [image])

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return
      scratch(event.clientX, event.clientY)
    }

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return
      const touch = event.touches[0]
      scratch(touch.clientX, touch.clientY)
    }

    const handleDocumentMouseUp = () => {
      setIsScratching(false)
      checkCompletion()
    }

    const handleDocumentTouchEnd = () => {
      setIsScratching(false)
      checkCompletion()
    }

    document.addEventListener('mousemove', handleDocumentMouseMove)
    document.addEventListener('touchmove', handleDocumentTouchMove)
    document.addEventListener('mouseup', handleDocumentMouseUp)
    document.addEventListener('touchend', handleDocumentTouchEnd)
    document.addEventListener('touchcancel', handleDocumentTouchEnd)

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove)
      document.removeEventListener('touchmove', handleDocumentTouchMove)
      document.removeEventListener('mouseup', handleDocumentMouseUp)
      document.removeEventListener('touchend', handleDocumentTouchEnd)
      document.removeEventListener('touchcancel', handleDocumentTouchEnd)
    }
  }, [isScratching])

  const handleMouseDown = (event: React.MouseEvent) => {
    if (disabled) return
    setIsScratching(true)
    onClick && onClick()
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    if (disabled) return
    setIsScratching(true)
    onClick && onClick()
  }

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const checkCompletion = () => {
    if (isComplete) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      const totalPixels = pixels.length / 4
      let clearPixels = 0

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++
      }

      const percentage = (clearPixels / totalPixels) * 100

      if (percentage >= minScratchPercentage) {
        setIsComplete(true)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        startAnimation()
        if (onComplete) {
          onComplete()
        }
      }
    }
  }

  const startAnimation = () => {
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    })
  }

  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{
        width,
        height,
        cursor: disabled
          ? 'not-allowed'
          : "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto"
      }}
      animate={controls}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <canvas ref={canvasRef} width={width} height={height} className='absolute left-0 top-0'></canvas>
      {children}
    </motion.div>
  )
}

export default ScratchToMint
