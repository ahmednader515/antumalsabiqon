"use client"

import Image, { ImageProps } from 'next/image'

// Function to map placeholder images using Unsplash
const getPlaceholderImage = (imageName: string): string => {
  const imageMappings: Record<string, string> = {
    // Hero section
    'hero-bg': 'https://images.unsplash.com/photo-1541480551145-2370a440d585?q=80&w=2069&auto=format&fit=crop',
    'fog': 'https://images.unsplash.com/photo-1513569143478-b38b2c0ef97f?q=80&w=2069&auto=format&fit=crop',
    
    // Features section
    'feature-survival': 'https://images.unsplash.com/photo-1534007199813-c6561151d8de?q=80&w=2069&auto=format&fit=crop',
    'feature-multiplayer': 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=1974&auto=format&fit=crop',
    'feature-atmosphere': 'https://images.unsplash.com/photo-1605806616949-59450419c3c5?q=80&w=1972&auto=format&fit=crop',
    'feature-enemies': 'https://images.unsplash.com/photo-1566936440121-d8467a5dabd6?q=80&w=1974&auto=format&fit=crop',
    
    // Characters section
    'character-survivor1': 'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?q=80&w=1974&auto=format&fit=crop',
    'character-survivor2': 'https://images.unsplash.com/photo-1536766768598-e09213fdcf22?q=80&w=1974&auto=format&fit=crop',
    'character-survivor3': 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1976&auto=format&fit=crop',
    'character-entity1': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1974&auto=format&fit=crop',
    'character-entity2': 'https://images.unsplash.com/photo-1566694271452-5f847e62426d?q=80&w=1974&auto=format&fit=crop',
    
    // How to play section
    'how-to-play-bg': 'https://images.unsplash.com/photo-1518070588484-2b53926cba76?q=80&w=2070&auto=format&fit=crop',
    'gameplay-screenshot': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop',
    
    // News section
    'dark-pattern': 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1974&auto=format&fit=crop',
  }
  
  // Return the mapped URL or a default dark image if not found
  return imageMappings[imageName] || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop'
}

// Omit the src from required props since we'll generate it
type PlaceholderImageProps = Omit<ImageProps, 'src'> & {
  name: string;
  src?: string; // Make src optional
};

export function PlaceholderImage({ name, alt, ...props }: PlaceholderImageProps) {
  const imageUrl = getPlaceholderImage(name)
  
  return <Image {...props} src={props.src || imageUrl} alt={alt || name} />
} 