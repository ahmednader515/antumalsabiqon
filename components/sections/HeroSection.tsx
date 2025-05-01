"use client"

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [dripping, setDripping] = useState(false)
  const [dripLeft, setDripLeft] = useState(false) 
  const [dripRight, setDripRight] = useState(false)
  const [hoverDrip, setHoverDrip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // We can track scroll position here if needed in the future
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Trigger blood drip animation more frequently for the primary button with staggered effect
  useEffect(() => {
    // Main central drip animation
    const mainDripInterval = setInterval(() => {
      setDripping(true)
      
      setTimeout(() => {
        setDripping(false)
      }, 2500)
    }, 4000) // Every 4 seconds
    
    // Left drip animation with offset timing
    const leftDripInterval = setInterval(() => {
      setDripLeft(true)
      
      setTimeout(() => {
        setDripLeft(false)
      }, 1800)
    }, 6500) // Less frequent
    
    // Right drip animation with different offset timing
    const rightDripInterval = setInterval(() => {
      setDripRight(true)
      
      setTimeout(() => {
        setDripRight(false)
      }, 2000)
    }, 5700) // Different timing for natural look

    return () => {
      clearInterval(mainDripInterval)
      clearInterval(leftDripInterval)
      clearInterval(rightDripInterval)
    }
  }, [])

  const handlePrimaryButtonHover = () => {
    // Only trigger if not already dripping
    if (!dripping) {
      setDripping(true)
      setTimeout(() => setDripping(false), 2500)
    }
    
    setHoverDrip(true)
    setTimeout(() => setHoverDrip(false), 2200)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <PlaceholderImage 
            name="hero-bg"
            fill
            alt="خلفية منافسات الرماية"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </video>
      </div>
      
      {/* Simple black overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center max-w-4xl">
        <div 
          className="transform transition-all duration-1000 animate-floating"
          style={{ 
            animationDuration: '6s'
          }}
        >
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-3 sm:mb-4 md:mb-5 text-white">
            <span className="text-[#8b0000] animate-pulse" style={{ animationDuration: '1s', textShadow: '0 0 5px rgba(255, 100, 100, 0.3)' }}>انتم</span> <span className="opacity-95">السابقون</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto text-white/90 mb-6 sm:mb-8 md:mb-10 px-2">
          لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد، استعد لأجواء مشحونة بالتوتر،  ومهام بقاء تتطلب التعاون
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5 mt-10 sm:mt-12 md:mt-14 opacity-85">
            {/* Primary bloody button with enhanced drips */}
            <div className="relative mb-3 sm:mb-0 w-full sm:w-auto">
              <Button 
                className="bloody-btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-4 h-auto relative group w-full sm:w-auto"
                onMouseEnter={handlePrimaryButtonHover}
                asChild
              >
                <Link href="https://store.steampowered.com/app/3666640/_/" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">ألعب الآن</span>
                  <span className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px] rounded-full bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute -bottom-[5px] -left-[5px] w-[8px] h-[8px] rounded-full bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  
                  {/* Multiple drip elements */}
                  <span className={`drip-left ${dripLeft ? 'animate-drip-left' : ''}`}></span>
                  <span className={`drip-right ${dripRight ? 'animate-drip-right' : ''}`}></span>
                </Link>
              </Button>
              
              {/* Properly positioned blood drip SVG that appears below the button */}
              <div 
                className={`absolute top-[100%] left-1/2 transform -translate-x-1/2 w-full h-[60px] overflow-hidden pointer-events-none ${(dripping || hoverDrip) ? 'animate-dripping' : 'opacity-0'}`}
                style={{ transformOrigin: 'top center' }}
              >
              </div>
              
              {/* Button texture overlay */}
              <div className="absolute inset-0 rounded-md overflow-hidden opacity-20 mix-blend-multiply pointer-events-none">
                <Image 
                  src="/bloody-texture.svg" 
                  alt="" 
                  width={200} 
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Secondary button without blood dripping effect */}
            <div className="relative w-full sm:w-auto">
              <Button 
                className="bloody-outline-btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-4 h-auto relative group w-full sm:w-auto"
                asChild
              >
                <Link href="https://store.steampowered.com/app/3666640/_/" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">العرض التشويقي</span>
                  <span className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute -bottom-[3px] -right-[3px] w-[7px] h-[7px] rounded-full bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
              {/* Button texture overlay - more subtle for outlined button */}
              <div className="absolute inset-0 rounded-md overflow-hidden opacity-10 mix-blend-multiply pointer-events-none">
                <Image 
                  src="/bloody-texture.svg" 
                  alt="" 
                  width={200} 
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - hide on smallest screens */}

      </div>
    </section>
  )
}