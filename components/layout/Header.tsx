"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const navigationLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الميزات', href: '#features' },
  { name: 'الشخصيات', href: '#characters' },
  { name: 'كيفية اللعب', href: '#how-to-play' },
  { name: 'الأخبار', href: '#news' },
]

// Portal component to render content at the root level
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<Element | null>(null)
  
  useEffect(() => {
    ref.current = document.querySelector('#portal-root')
    if (!ref.current) {
      const div = document.createElement('div')
      div.id = 'portal-root'
      document.body.appendChild(div)
      ref.current = div
    }
    setMounted(true)
    
    return () => {
      // Clean up only if we created the div
      if (ref.current && ref.current.id === 'portal-root' && ref.current.childNodes.length === 0) {
        document.body.removeChild(ref.current)
      }
    }
  }, [])
  
  return mounted && ref.current ? createPortal(children, ref.current) : null
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use useCallback to optimize the scroll handler
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  }, [scrolled])

  useEffect(() => {
    // Initial check on mount
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      
      // Apply styles to lock scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position when closing the menu
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }
    
    return () => {
      // Clean up styles when component unmounts
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])
  
  // Toggle mobile menu with proper handling
  const toggleMobileMenu = useCallback((value: boolean) => {
    setMobileMenuOpen(value)
  }, [])

  // Handle navigation link clicks to close menu and smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setMobileMenuOpen(false)
      
      // Small delay for better animation
      setTimeout(() => {
        const element = document.getElementById(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300) // Increased delay to allow menu closing animation to complete
    } else {
      setMobileMenuOpen(false)
    }
  }

  // Render the mobile menu using Portal
  const renderMobileMenu = () => {
    return (
      <Portal>
        <div 
          className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg z-[9999] md:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => toggleMobileMenu(false)}
          style={{ isolation: 'isolate' }}
        >
          {/* Adding a solid black background overlay for consistency */}
          <div className="absolute inset-0 bg-black opacity-90"></div>
          
          <div 
            className={`fixed inset-y-0 right-0 w-[80%] sm:w-80 bg-black border-l border-[#3d0d10] shadow-xl transition-transform duration-300 ease-in-out transform ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } h-full max-h-[100vh] overflow-auto flex flex-col`}
            onClick={(e) => e.stopPropagation()}
            style={{ isolation: 'isolate', willChange: 'transform' }}
          >
            {/* Sidebar header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#3d0d10] sticky top-0 bg-black z-10">
              <div className="relative h-8 sm:h-10 w-32 sm:w-36">
                <Image 
                  src="/logo.png" 
                  alt="انتم السابقون" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="filter drop-shadow-glow-red"
                />
              </div>
              <button 
                className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full bg-[#2a0707] text-gray-300 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu(false);
                }}
                aria-label="Close menu"
              >
                <X size={20} className="sm:hidden" />
                <X size={22} className="hidden sm:block" />
              </button>
            </div>
            
            {/* Sidebar navigation */}
            <div className="p-4 sm:p-5 flex flex-col space-y-4 sm:space-y-5 flex-grow">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="py-3 sm:py-4 px-4 sm:px-5 text-lg sm:text-xl text-gray-300 hover:text-white hover:bg-[#2a0707] rounded-md transition-colors border-l-2 border-transparent hover:border-[#851212] text-right"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Sidebar footer */}
            <div className="p-4 sm:p-5 border-t border-[#3d0d10] sticky bottom-0 bg-black">
              <Button 
                className="w-full bg-[#851212] hover:bg-[#a01616] text-white py-6 sm:py-7 text-base sm:text-lg bloody-btn"
                onClick={() => toggleMobileMenu(false)}
                asChild
              >
                <Link href="https://store.steampowered.com/app/3666640/_/" target="_blank" rel="noopener noreferrer">
                  ألعب الآن
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm bg-black/90' : 'bg-black'
      } border-b border-[#3d0d10]/60`}>
        <div className="container mx-auto relative flex h-24 md:h-24 lg:h-24 xl:h-20 2xl:h-25 items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center mr-4">
            <Link href="/" className="relative h-10 md:h-11 lg:h-11 xl:h-10 2xl:h-14 w-40 md:w-44 lg:w-44 xl:w-40 2xl:w-52 overflow-hidden hover:opacity-90 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="انتم السابقون" 
                fill
                style={{ objectFit: 'contain' }}
                className="filter drop-shadow-glow-red"
                priority
              />
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-y-0 space-x-8 md:space-x-8 lg:space-x-8 xl:space-x-8 2xl:space-x-12 mx-auto">
            {navigationLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-base md:text-base lg:text-base xl:text-base 2xl:text-lg font-medium text-gray-300 hover:text-primary transition-colors mx-3 md:mx-3 lg:mx-3 xl:mx-3 2xl:mx-4 py-2 px-1 hover:border-b hover:border-[#851212]"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Register Button - Full Height */}
          <div className="hidden md:flex items-center h-full">
            <Button 
              className="h-16 lg:h-16 xl:h-16 2xl:h-24 px-6 md:px-6 lg:px-6 xl:px-6 2xl:px-10 bg-[#851212] hover:bg-[#a01616] text-white text-base md:text-base lg:text-base xl:text-base 2xl:text-xl font-medium border-0 rounded-none"
              asChild
            >
              <Link href="https://store.steampowered.com/app/3666640/_/" target="_blank" rel="noopener noreferrer">
                ألعب الآن
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button - New horror-themed design */}
          <div className="md:hidden flex items-center ml-4">
            <button 
              className="relative overflow-hidden w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-b from-[#400808] to-[#200404] border border-[#5a0d0d] rounded text-gray-200 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#851212] shadow-lg flex items-center justify-center"
              onClick={() => toggleMobileMenu(true)}
              aria-label="Toggle menu"
            >
              {/* Blood drip effect from top */}
              <div className="absolute top-0 left-1/2 w-[1px] h-3 bg-red-700 transform -translate-x-1/2 group-hover:h-4 transition-all duration-300 shadow-glow-sm"></div>
              
              {/* Main menu icon with slash styling */}
              <div className="relative w-6 sm:w-7 h-6 sm:h-7 flex flex-col justify-center items-center">
                {/* Diagonal slash effect */}
                <div className="absolute w-full h-[1.5px] bg-red-600 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-glow-sm"></div>
                
                {/* Menu lines with X transform effect */}
                <span className="absolute w-full h-[1.5px] bg-current top-1 transform transition-transform duration-300 group-hover:rotate-45 group-hover:top-[11px] group-hover:w-[120%]"></span>
                <span className="absolute w-full h-[1.5px] bg-current top-[11px] transition-opacity duration-300 group-hover:opacity-0"></span>
                <span className="absolute w-full h-[1.5px] bg-current top-[21px] transform transition-transform duration-300 group-hover:-rotate-45 group-hover:top-[11px] group-hover:w-[120%]"></span>
                
                {/* Blood splatter dots */}
                <span className="absolute top-0 right-0 w-1 h-1 rounded-full bg-red-700 opacity-0 group-hover:opacity-80 transition-all duration-300 group-hover:w-[3px] group-hover:h-[3px]"></span>
                <span className="absolute bottom-1 left-1 w-[3px] h-[3px] rounded-full bg-red-800 opacity-0 group-hover:opacity-60 transition-all duration-500 delay-100 group-hover:w-[4px] group-hover:h-[4px]"></span>
                <span className="absolute bottom-0 right-[40%] w-[2px] h-[2px] rounded-full bg-red-900 opacity-0 group-hover:opacity-70 transition-all duration-700 delay-200"></span>
              </div>
              
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Render mobile menu */}
      {renderMobileMenu()}
    </>
  )
} 