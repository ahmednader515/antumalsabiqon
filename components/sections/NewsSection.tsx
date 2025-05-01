"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// News data for the game in Arabic
const newsItems = [
  {
    id: 'news1',
    title: 'تكلفة تطوير اللعبة وفترة العمل عليها',
    date: '2024-01-01',
    tag: 'معلومة',
    excerpt: 'بلغت تكلفة تطوير اللعبة 10,000 دولار، واستغرق العمل عليها أكثر من عام كامل من التخطيط والبرمجة والتصميم لتقديم تجربة فريدة من نوعها.',
    content: 'بدأ تطوير اللعبة منذ أكثر من سنة، وتم استثمار 10,000 دولار في تصميم الشخصيات، البرمجة، الرسوميات، وأصوات اللعبة. عمل الفريق بلا توقف لتقديم تجربة رعب استثنائية تعكس هذا الجهد الكبير.',
  },
  {
    id: 'news2',
    title: 'انطلاق حملة الترويج للعبة',
    date: '2024-04-01',
    tag: 'إعلان',
    excerpt: 'بدأنا حملة ترويجية ضخمة على وسائل التواصل الاجتماعي، تشمل مقاطع دعائية، صور من داخل اللعبة، وتحديات للاعبين الجدد لجذب أكبر عدد من المهتمين.',
    content: 'تشمل الحملة الترويجية الحالية إعلانات على يوتيوب وإنستغرام، إضافة إلى التعاون مع مؤثرين في مجال الألعاب. سيتم إطلاق مسابقات وجوائز أسبوعية لزيادة التفاعل مع الجمهور وجذب انتباه اللاعبين الجدد.',
  },
  {
    id: 'news3',
    title: 'موعد إصدار اللعبة على ستيم',
    date: '2024-05-15',
    tag: 'إعلان',
    excerpt: 'اقترب موعد نشر اللعبة رسمياً على منصة Steam، ترقبوا التجربة الكاملة قريباً مع كافة المميزات والتحديثات.',
    content: 'يسعدنا الإعلان أن اللعبة سيتم نشرها رسميًا على ستيم بتاريخ 15 مايو 2024. ستكون متاحة لجميع اللاعبين مع محتوى متكامل يشمل جميع التحديثات والإضافات الجديدة، بالإضافة إلى خصومات خاصة في أول أسبوع من الإصدار.',
  },
  {
    id: 'news4',
    title: 'إضافات جديدة: شخصيات ووحوش',
    date: '2024-03-01',
    tag: 'تحديث',
    excerpt: 'تم إضافة شخصيات جديدة بقدرات مميزة ووحوش بمهارات هجومية فريدة تضيف تحديات جديدة وتجربة لعب أكثر تشويقاً.',
    content: 'في هذا التحديث، أضفنا 3 شخصيات جديدة كل منها بقدرات فريدة، إلى جانب وحوش جديدة تتحدى اللاعبين بأساليب هجوم غير مسبوقة. هذه الإضافات تفتح الباب لتكتيكات جديدة وتزيد من تنوع أسلوب اللعب.',
  },
];

export function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      id="news" 
      className="relative py-24 bg-black overflow-hidden"
      ref={sectionRef}
    >
      <div className="container relative z-30 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-[#8b0000]">الأخبار</span> والتحديثات
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ابق على اطلاع بأحدث التطورات والأحداث والتحديثات.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <NewsCard 
              key={item.id}
              news={item}
              isSelected={selectedNews === item.id}
              onClick={() => setSelectedNews(selectedNews === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface NewsCardProps {
  news: typeof newsItems[0]
  isSelected: boolean
  onClick: () => void
}

function NewsCard({ news, isSelected, onClick }: NewsCardProps) {
  // Format date to display

  
  return (
    <Card 
      className={`border-border/10 transition-all duration-300 hover:border-primary/30 cursor-pointer overflow-hidden relative z-30 ${
        isSelected ? 'bg-primary/5 border-primary/30' : 'bg-background/60 border-primary/20'
      } hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] border-2`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            news.tag === 'تحديث' 
              ? 'bg-blue-500/20 text-blue-400' 
              : news.tag === 'معلومة' 
                ? 'bg-green-500/20 text-green-400'
                : news.tag === 'مجتمع'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-primary/20 text-primary'
          }`}>
            {news.tag}
          </span>
        </div>
        <CardTitle className="text-lg font-bold mt-3">{news.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {isSelected ? news.content : news.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          {isSelected ? 'اقرأ أقل' : 'اقرأ المزيد'}
        </Button>
      </CardFooter>
    </Card>
  )
} 