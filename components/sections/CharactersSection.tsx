"use client"

import { useState, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'

// Character data for the game in Arabic
const characters = [
  {
    id: 'survivor1',
    name: 'مارفي',
    type: 'ناجية',
    description: 'تمتاز بالشجاعة والقدرة على التفكير السريع تحت الضغط. قادرة على التحليل السريع للمواقف واتخاذ القرارات التي تنقذ حياتها وحياة زملائها. رغم ماضيها المظلم، تبقى دائمًا رمزًا للأمل في أوقات الخطر',
    image: 'survivor-1.png',
  },
  {
    id: 'survivor2',
    name: 'اميراس',
    type: 'ناجية',
    description: 'سريعة وذكية، مع قدرة فريدة على التنقل في البيئات المعقدة. تعتمد على المهارات الجسدية والتكتيك لتجاوز الوحوش والبقاء على قيد الحياة. لم تكن يومًا في موقع ضعف، حتى حين كانت في مواجهة أقوى المخاطر',
    image: 'survivor-3.png',
  },
  {
    id: 'survivor3',
    name: 'نرمين',
    type: 'ناجية',
    description: 'منذ الصغر، تعلمت كيفية النجاة في الظروف القاسية. تتمتع بقدرة غير عادية على التسلل والاختفاء، مما يجعلها مميزة في الهروب من أخطر المواقف. حريصة على حماية الآخرين وتقديم الدعم في اللحظات الحاسمة',
    image: 'survivor-2.png',
  },
  {
    id: 'entity1',
    name: 'الساحرة',
    type: 'وحش',
    description: '',
    abilities: ['يمكنها الهجوم بعد التخفي', 'سرعة عالية في التحرك', 'تستطيع التمويه على شكل لاعب'],
    weaknesses: ['تفتقر إلى تقنيات هجومية متنوعة', 'تحتاج ضربات عديدة للقضاء علي البشري', 'ضعيفة في الهجوم'],
    image: 'monster-3.png',
  },
  {
    id: 'entity2',
    name: 'شينكوما',
    type: 'وحش',
    abilities: ['يربك اللاعبين بحركاته المفاجئة', 'سرعة عالية في التنقل', 'قدرة على الاختفاء والظهور فجأة'],
    weaknesses: ['لا يستطيع الهجوم أثناء الاختفاء', 'يحتاج 4 ثواني لاستعادة حركته بعد الظهور', 'ضعيف في القوة البدنية'],
    image: 'monster-2.png',
  },
  {
    id: 'entity3',
    name: 'كابوت',
    type: 'وحش',
    abilities: ['يتحمل الأضرار بشكل كبير', 'قوة ضرب عالية، أقوى وحش في الدمج', 'رؤية ليلية ممتازة في الظلام'],
    weaknesses: ['صعب المناورة في الأماكن الضيقة', 'ضعيف في الإضاءة', 'بطء في الحركة'],
    image: 'monster-1.png',
  },
  {
    id: 'entity4',
    name: 'شولح',
    type: 'وحش',
    abilities: ['النسخة تستطيع مطاردة اللاعبين', 'سريع الحركة', 'يستطيع استنساخ نفسه لخلق نسخة تهدد اللاعبين'],
    weaknesses: ['لا يري جيدا في الظلام', 'يمكنه استنساخ نفسه مرة واحدة فقط', 'ضعيف في القوة الجسدية'],
    image: 'monster-4.png',
  },
]

// Type definitions to fix type errors
type Survivor = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
}

type Entity = {
  id: string;
  name: string;
  type: string;
  description: string;
  abilities: string[];
  weaknesses: string[];
  image: string;
}

// These types are used for type checking, don't remove them

export function CharactersSection() {
  const [expandedChar, setExpandedChar] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null);
  
  // Separate survivors and entities
  const survivors = characters.filter(char => char.type === 'ناجي' || char.type === 'ناجية') as Survivor[]
  const entities = characters.filter(char => char.type === 'وحش') as Entity[]
  
  return (
    <section id="characters" className="relative py-24 bg-black" ref={sectionRef}>
      {/* Content container */}
      <div className="container relative z-30 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter section-title text-white">
            <span className="text-[#8b0000]">الشخص</span>يات
          </h2>
          <p className="text-gray-300 max-w-4xl mx-auto">
            اختر من بين الناجين الفريدين ذوي القدرات الخاصة، أو العب كأحد الوحشات المرعبة التي تطاردهم.
          </p>
        </div>
        
        {/* Survivors Section */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold mb-8 text-center title text-white">
            <span className="text-white/80">الـ</span>
            <span className="text-[#8b0000]">بشر</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center mx-auto max-w-5xl">
            {survivors.map((character) => (
              <SurvivorCard 
                key={character.id}
                character={character}
                isExpanded={expandedChar === character.id}
                onToggle={() => setExpandedChar(expandedChar === character.id ? null : character.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Entities Section */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center title text-white">
            <span className="text-white/80">الـ</span>
            <span className="text-[#8b0000]">وحوش</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-auto max-w-6xl">
            {entities.map((character) => (
              <EntityCard 
                key={character.id}
                character={character}
                isExpanded={expandedChar === character.id}
                onToggle={() => setExpandedChar(expandedChar === character.id ? null : character.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface SurvivorCardProps {
  character: Survivor;
  isExpanded: boolean;
  onToggle: () => void;
}

function SurvivorCard({ character, isExpanded, onToggle }: SurvivorCardProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Use isExpanded to control the open state
  useEffect(() => {
    setOpen(isExpanded);
  }, [isExpanded]);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div 
          className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 h-[380px] w-full max-w-[280px] hover:shadow-lg hover:shadow-blue-500/10 border border-blue-500/20 hover:border-blue-500/30"
          onClick={() => {
            setOpen(!open)
            onToggle()
          }}
        >
          {/* Character Image */}
          <div className="absolute inset-0 bg-black">
            <Image
              src={`/${character.image}`}
              alt={character.name}
              fill
              style={{ 
                objectFit: 'cover', 
                objectPosition: 'center top',
                filter: 'brightness(1.05)',
                transition: 'all 0.5s ease'
              }}
              className="group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Animated glow overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000">
            <div className="absolute inset-0 bg-blue-900/5 animate-pulse-slow"></div>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Character stats and decorative elements */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-900/50 text-blue-200 border border-blue-400/30">
              {character.type}
            </span>
            
            {/* Decorative corner elements */}
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-blue-500/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-blue-500/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          {/* Character name and details */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold mt-1 text-white">{character.name}</h3>
              </div>
              
              <div 
                className="px-3 py-1 rounded-md flex items-center justify-center transition-colors bg-blue-900/40 text-blue-200 border border-blue-400/30 opacity-80 group-hover:opacity-100 text-xs font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(!open)
                  onToggle()
                }}
              >
                التفاصيل
              </div>
            </div>
          </div>
          
          {/* Inner border glow effect on hover */}
          <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-500/40 pointer-events-none"></div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent 
        side={isMobile ? "bottom" : "right"} 
        align={isMobile ? "center" : "start"} 
        className="w-80 bg-background/95 backdrop-blur-sm border-primary/20 max-w-[calc(100vw-2rem)] md:max-w-md"
        sideOffset={isMobile ? 5 : 10}
        alignOffset={isMobile ? 0 : -20}
        avoidCollisions={true}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="px-2 py-1 text-xs rounded-md mr-2 bg-blue-900/50 text-blue-200">
                {character.type}
              </span>
              <h4 className="text-sm font-semibold">{character.name}</h4>
            </div>
            {/* Close button */}
            <button 
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-full flex items-center justify-center bg-blue-900/20 text-blue-200 hover:bg-blue-900/40 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{character.description}</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface EntityCardProps {
  character: Entity;
  isExpanded: boolean;
  onToggle: () => void;
}

function EntityCard({ character, isExpanded, onToggle }: EntityCardProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Use isExpanded to control the open state
  useEffect(() => {
    setOpen(isExpanded);
  }, [isExpanded]);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div 
          className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 h-[350px] w-full max-w-[240px] hover:shadow-lg hover:shadow-primary/10 border border-primary/20 hover:border-primary/30"
          onClick={() => {
            setOpen(!open)
            onToggle()
          }}
        >
          {/* Character Image */}
          <div className="absolute inset-0 bg-black">
            <Image
              src={`/${character.image}`}
              alt={character.name}
              fill
              style={{ 
                objectFit: 'cover', 
                objectPosition: 'center top',
                filter: 'grayscale(20%) contrast(120%) brightness(0.9)',
                transition: 'all 0.5s ease'
              }}
              className="group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Animated glow overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000">
            <div className="absolute inset-0 bg-primary/5 animate-pulse-slow"></div>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Character stats and decorative elements */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between">
            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
              {character.type}
            </span>
            
            {/* Decorative corner elements */}
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          {/* Character name and details */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold mt-1 text-primary">{character.name}</h3>
              </div>
              
              <div 
                className="px-3 py-1 rounded-md flex items-center justify-center transition-colors bg-primary/20 text-primary border border-primary/50 opacity-80 group-hover:opacity-100 text-xs font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(!open)
                  onToggle()
                }}
              >
                التفاصيل
              </div>
            </div>
          </div>
          
          {/* Inner border glow effect on hover */}
          <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/40 pointer-events-none"></div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent 
        side={isMobile ? "bottom" : "right"} 
        align={isMobile ? "center" : "start"} 
        className="w-80 bg-background/95 backdrop-blur-sm border-primary/20 max-w-[calc(100vw-2rem)] md:max-w-md"
        sideOffset={isMobile ? 5 : 10}
        alignOffset={isMobile ? 0 : -20}
        avoidCollisions={true}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="px-2 py-1 text-xs rounded-md mr-2 bg-primary/20 text-primary">
                {character.type}
              </span>
              <h4 className="text-sm font-semibold">{character.name}</h4>
            </div>
            {/* Close button */}
            <button 
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/20 text-primary hover:bg-primary/40 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{character.description}</p>
          
          <div className="pt-2">
            <span className="text-xs font-medium text-primary">القدرات</span>
            <ul className="mt-2 space-y-1.5">
              {character.abilities.map((ability, idx) => (
                <li key={idx} className="text-xs flex items-center text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  {ability}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2">
            <span className="text-xs font-medium text-primary">نقاط الضعف</span>
            <ul className="mt-2 space-y-1.5">
              {character.weaknesses.map((weakness, idx) => (
                <li key={idx} className="text-xs flex items-center text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 