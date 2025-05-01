import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-background/50 border-t border-border/20 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <Image
                src="/logo.png"
                alt="logo"
                width={128}
                height={128}
                className="rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">
            لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">روابط</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300">
                  ميزات اللعبة
                </Link>
              </li>
              <li>
                <Link href="#characters" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300">
                  الشخصيات
                </Link>
              </li>
              <li>
                <Link href="#how-to-play" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300">
                  كيف تلعب
                </Link>
              </li>
              <li>
                <Link href="#news" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300">
                  الأخبار
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">تواصل معنا</h4>
            <p className="text-xs text-muted-foreground pt-2">
              الأستوديو المطور: <a href="https://www.mordesustudio.com/" className="hover:text-primary transition-colors hover:underline">MordesuStudio.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Image
              src="/logo.png"
              alt="عالم الكوابيس"
              width={24}
              height={24}
              className="rounded-sm object-contain group-hover:rotate-12 transition-transform duration-300"
            />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} استوديو مورديسيو. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 