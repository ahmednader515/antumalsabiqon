"use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const webLeftRef = useRef<HTMLDivElement>(null)
  const webRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef)
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
    }
  }, [])

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Dark overlay with red gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Spider Web - Top Left */}
      <div 
        ref={webLeftRef}
        className="absolute top-0 left-0 w-80 h-80 z-20 transition-transform duration-300"
        style={{
          transform: 'rotate(-5deg) translate(-10px, -10px)',
        }}
      >
        <Image
          src="/web-left.png"
          alt="Spider web decoration"
          width={320}
          height={320}
          className="object-contain opacity-80"
        />
      </div>
      
      {/* Spider Web - Top Right */}
      <div 
        ref={webRightRef}
        className="absolute top-3 right-0 w-64 h-64 z-20 transition-transform duration-300"
        style={{
          transform: 'rotate(5deg) translate(10px, -10px)',
        }}
      >
        <Image
          src="/web-right.png"
          alt="Spider web decoration"
          width={256}
          height={256}
          className="object-contain opacity-80" // Flip horizontally with Tailwind
        />
      </div>

      {/* Spider Web - Bottom */}
      <div 
        ref={webRightRef}
        className="absolute bottom-0 left-1/2 w-128 h-128 z-20"
        style={{
          transform: 'translate(-50%, 50%)',
        }}
      >
        <Image
          src="/web-bottom.png"
          alt="Spider web decoration"
          width={512}
          height={512}
          className="object-contain opacity-80" // Flip horizontally with Tailwind
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-[#8b0000]">فكرة</span> اللعبة
          </h2>
          <p className="text-muted-foreground max-w-4xl mx-auto tracking-wide">
          تجربة رعب نفسية وتعاونية تنافسية، تمزج بين التوتر، التعاون، والخوف من المجهول في لعبة أونلاين مشوقة،
          في كل جولة يتم اختيار لاعب واحد لتجسيد الوحش – كائن غامض وقاتل، يطارد ضحاياه في الظلام.
          <br />
          <br />
          في الجانب الاخر يتعين علي البشر حل اللغز المطلوب منهم للنجاه و الأنتصار علي الوحش.
          </p>
        </div>
        
        {/* Game Mechanics Cards - Monsters vs Humans */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Monsters Card */}
          <Card className="relative overflow-hidden border-primary/20 bg-red-950/80 hover:bg-red-900/90 transition-all duration-300 h-full">
            <CardContent className="relative z-10 p-6">
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight animate-pulse" style={{ animationDuration: '1s', textShadow: '0 0 5px rgba(255, 100, 100, 0.3)' }}>الوحوش</h3>
              <p className="text-lg font-medium mb-4 text-red-200">اصطد ضحاياك و أسعى للانتقام</p>
              <ul className="space-y-2 text-red-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="tracking-wide">بعض الوحوش يعتمد على التخفي والبعض الآخر على الرعب المباشر</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="tracking-wide">الوحوش مصممة لتُربك، تُفاجئ، وتُرعب بأشكال مختلفة</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="tracking-wide">لا يمكنك التنبؤ بكيفية هجوم كل وحش، فكل منهم يفكر بطريقة مختلفة</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="tracking-wide">قدرات الوحوش تُجبر اللاعبين على تغيير استراتيجيتهم باستمرار</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Humans Card */}
          <Card className="relative overflow-hidden border-blue-400/20 bg-blue-950/80 hover:bg-blue-900/90 transition-all duration-300 h-full">
            <CardContent className="relative z-10 p-6">
              <h3 className="text-white font-bold text-2xl mb-3 animate-pulse" style={{ animationDuration: '1s', textShadow: '0 0 5px rgba(255, 100, 100, 0.3)' }}>البشر</h3>
              <p className="text-lg font-medium mb-4 text-blue-200">ابقَ على قيد الحياة والعمل معًا للهروب</p>
              <ul className="space-y-2 text-blue-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="tracking-wide">الناجون ليسوا مجرد فريسة بل يملكون أدوات وفرصًا للهرب</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="tracking-wide">التعاون بين الناجين هو المفتاح للنجاة من الوحش</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="tracking-wide">الانقسام خطر، لكن أحيانًا لا مفر منه</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="tracking-wide">الصمت هو أعز أصدقائك وأكبر سلاحك ضد الوحش</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="tracking-wide">النجاة ليست دائمًا للـأقوى، بل للأذكى</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 