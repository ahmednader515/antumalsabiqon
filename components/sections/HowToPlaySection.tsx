"use client"

import { useRef, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

// Game maps data
const gameMaps = [
  {
    id: 'haunted-house',
    name: 'المنزل المسكون',
    description: 'بيت يملؤه الظلام، يملؤه الخوف والهمسات الغامضة. مهمتك هي العثور على القربان الملعون وحرقه قبل أن يتمكن الوحش من القضاء عليكم! منزل قديم مليء بالممرات المتعرجة والغرف المظلمة، يتميز بأبواب متحركة ومخابئ سرية.',
    images: ['house-1.png', 'house-2.png', 'house-3.png', 'house-4.png', 'house-5.png']
  },
  {
    id: 'abandoned-swamp',
    name: 'المستنقع المهجور',
    description: 'تغمره الضباب والمياه الراكدة، حيث يتردد صدى صرخات الماضي. مهمتك هي البحث بين الطين والجذوع الملتوية عن جثث من سبقوك، واستعادة ثلاثة أجهزة ضرورية للنجاة. لكن احذر، فالوحش يراقبك في الظلال، وكل خطوة قد تكون الأخيرة. اجمع الأجهزة، تفادى الخطر، وانجُ قبل أن تصبح أنت التالي! منطقة خارجية واسعة مع مسارات ضيقة وأشجار متعفنة توفر أماكن للاختباء.',
    images: ['swamp.png', 'swamp-2.png', 'swamp-3.png', 'swamp-4.png', 'swamp-5.png']
  }
]

export function HowToPlaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section 
      id="how-to-play" 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-black"
    >
      <div className="container relative z-30 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-[#8b0000]">خرائط</span> اللعبة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          تقدّم اللعبة مجموعة متنوعة من الخرائط المصممة بعناية لتناسب جميع أساليب اللعب.
          </p>
        </div>
      
        
        {/* Game Maps Section */}
        <div className="mt-20 mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {gameMaps.map((map) => (
              <MapCard 
                key={map.id}
                map={map}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
        
        {/* Additional gameplay tips */}
        <div className={`mt-20 bg-background/30 backdrop-blur-sm border border-primary/10 rounded-lg p-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h3 className="text-xl font-bold mb-4">نصائح اللعب</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-[#8b0000]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
                <h4 className="font-medium text-sm">للناجين</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  ابقَ في الظلال لتجنب الكشف عن طريق الوحوش
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  أحدث ضوضاء لتشتيت انتباه الوحوش بعيدًا عن الأهداف
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  نسق مع زملائك لإكمال الأهداف بشكل أسرع
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-[#8b0000]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M20.2 6 17 9.2l-3.2-3.2-4.8 4.8 3.2 3.2-3.2 3.2 4.8 4.8 3.2-3.2 3.2 3.2 4.8-4.8-3.2-3.2 3.2-3.2z"></path>
                </svg>
                <h4 className="font-medium text-sm">للوحوش</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  ركز على تعطيل الناجين الذين يحاولون تحقيق الأهداف
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  ضع الفخاخ بالقرب من طرق الهروب المحتملة
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  استخدم قدرات البيئة للصيد بفعالية
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-[#8b0000]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                </svg>
                <h4 className="font-medium text-sm">نصائح عامة</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  تعلم تخطيطات الخريطة للعثور على الطرق المختصرة المخفية
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  استخدم سماعات الرأس للحصول على وعي مكاني أفضل
                </li>
                <li className="flex items-start">
                  <span className="h-1 w-1 rounded-full bg-[#8b0000] mt-2 mr-2 flex-shrink-0"></span>
                  اكتشف القدرات الفريدة لكل شخصية
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface MapCardProps {
  map: typeof gameMaps[0]
  isVisible: boolean
}

function MapCard({ map, isVisible }: MapCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-swipe functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === map.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2500); // Change image every 3 seconds (was 4000)
      
      return () => clearInterval(interval);
    }
  }, [map.images.length, isPaused]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === map.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? map.images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <Card 
      className={`bg-background/40 backdrop-blur-sm border-primary/20 transition-all duration-700 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="relative aspect-video">
        <div className="absolute inset-0 overflow-hidden">
          {map.images.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                zIndex: currentImageIndex === index ? 1 : 0
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Image
                src={`/${image}`}
                alt={`${map.name} - ${index + 1}`}
                fill
                className="object-cover transform transition-transform duration-1000"
                style={{
                  transform: currentImageIndex === index ? 'scale(1)' : 'scale(1.05)'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation arrows - Switched for Arabic (right arrow for previous, left arrow for next) */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
        <button 
            onClick={previousImage}
            className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            aria-label="السابق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            aria-label="التالي"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {map.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
              aria-label={`صورة ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2">{map.name}</h4>
        <p className="text-sm text-muted-foreground">{map.description}</p>
      </div>
    </Card>
  );
} 