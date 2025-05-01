"use client"

import { useState, useEffect } from 'react'

interface FlashlightProps {
  enabled: boolean;
  excludeSections?: string[];
}

export function Flashlight({ enabled = true, excludeSections = ['hero'] }: FlashlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [mouseInHero, setMouseInHero] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Track current section
  useEffect(() => {
    const checkCurrentSection = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSectionId = null;
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });
      
      setCurrentSection(currentSectionId);
    };
    
    checkCurrentSection();
    window.addEventListener('scroll', checkCurrentSection);
    
    return () => {
      window.removeEventListener('scroll', checkCurrentSection);
    };
  }, []);
  
  // Track mouse position and check if in hero section
  useEffect(() => {
    if (isMobile || !enabled) {
      setIsVisible(false);
      return;
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      // Check if mouse is in hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const buffer = 20; // 20px buffer zone for smoother transition
        const isInHero = 
          e.clientY >= heroRect.top - buffer && 
          e.clientY <= heroRect.bottom + buffer && 
          e.clientX >= heroRect.left - buffer && 
          e.clientX <= heroRect.right + buffer;
        
        setMouseInHero(isInHero);
        setIsVisible(!isInHero);
      } else {
        setMouseInHero(false);
        setIsVisible(true);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, enabled]);
  
  // Check if we should show flashlight in current section
  const shouldShowInCurrentSection = !excludeSections.includes(currentSection || '');
  
  // Completely hide on mobile or when disabled
  if (isMobile || !enabled) {
    return null;
  }
  
  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-300"
      style={{ 
        opacity: isVisible && !mouseInHero && shouldShowInCurrentSection ? 1 : 0 
      }}
    >
      {/* Main flashlight effect - reduced intensity */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 20%, rgba(0,0,0,0.7) 100%)`,
        }}
      />
      
      {/* Subtle white glow around flashlight */}
      <div 
        className="absolute inset-0 opacity-60 mix-blend-lighten"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.9), transparent 80%)`,
        }}
      />
      
      {/* Moderate inner bright core */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-lighten"
        style={{
          background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.9), transparent 85%)`,
        }}
      />
    </div>
  );
} 