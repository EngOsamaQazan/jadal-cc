import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Smartphone, Shield, Zap, Ban } from 'lucide-react'

const MARK = '/mark.png'

/** 21st: ekmas/marquee + phone names */
const PHONE_ITEMS = [
  'iPhone 16 Pro',
  'Galaxy S25 Ultra',
  'Pixel 9 Pro',
  'Xiaomi 15',
  'Honor Magic7',
  'OnePlus 13',
  'Galaxy Z Fold6',
  'iPhone 16',
]

/** 21st hero-3 marquee pattern — local phone cards (no hotlink) */
const PHONE_CARDS = [
  { name: 'iPhone 16 Pro', tone: 'bg-acid text-ink' },
  { name: 'Galaxy S25', tone: 'bg-signal text-ink' },
  { name: 'Pixel 9 Pro', tone: 'bg-paper text-ink' },
  { name: 'Xiaomi 15', tone: 'bg-acid text-ink' },
  { name: 'Honor Magic', tone: 'bg-paper text-ink' },
  { name: 'OnePlus 13', tone: 'bg-signal text-ink' },
]

const testimonials = [
  {
    quote: 'قسّطت جهازي خلال يومين — والشرط واضح: جوالات فقط، بلا لفّ ودوران.',
    author: 'سارة م.',
    role: 'عميلة',
  },
  {
    quote: 'أخيراً جهة تعرف حدودها. ما حاولوا يبيعوني تمويل سيارة أو أثاث.',
    author: 'خالد ع.',
    role: 'عميل',
  },
  {
    quote: 'القسط معروف قبل التوقيع. تجربة مرتبة لتخصص خلوي بحت.',
    author: 'نورة ح.',
    role: 'عميلة',
  },
]

function NeoMarquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative flex w-full overflow-x-hidden border-y-4 border-ink bg-acid text-ink">
      <div className="animate-marquee flex whitespace-nowrap py-5">
        {loop.map((item, i) => (
          <span key={`a-${i}`} className="mx-6 font-display text-2xl font-extrabold md:text-4xl">
            {item}
            <span className="mx-6 text-ink/35">◆</span>
          </span>
        ))}
      </div>
      <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap py-5">
        {loop.map((item, i) => (
          <span key={`b-${i}`} className="mx-6 font-display text-2xl font-extrabold md:text-4xl">
            {item}
            <span className="mx-6 text-ink/35">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-acid bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={MARK} alt="" className="h-11 w-11 border-2 border-acid bg-paper object-contain p-0.5" />
          <span className="font-display text-2xl font-extrabold text-paper md:text-3xl">جدل</span>
        </a>
        <nav className="hidden gap-7 font-display text-sm font-bold md:flex" aria-label="القائمة">
          {[
            ['#only', 'التخصص'],
            ['#bento', 'لماذا'],
            ['#voices', 'آراء'],
            ['#contact', 'تواصل'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-paper transition-colors duration-100 hover:text-acid">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          <a
            href="https://jadal.aqssat.co"
            className="hidden border-2 border-paper px-3 py-2 font-display text-xs font-bold sm:inline-block"
          >
            دخول
          </a>
          <a
            href="#contact"
            className="border-2 border-ink bg-acid px-4 py-2 font-display text-sm font-extrabold text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            قسّط جوالك
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const cards = [...PHONE_CARDS, ...PHONE_CARDS]

  return (
    <section id="top" className="slash-bg relative min-h-[100svh] overflow-hidden pt-20">
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-4 pb-52 pt-14 text-center md:px-8 md:pb-60 md:pt-16">
        <p className="mb-5 border-2 border-acid px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-acid">
          cellular installments only
        </p>

        <h1 className="font-display text-[clamp(3rem,11vw,8rem)] font-extrabold leading-[0.92] tracking-tight text-paper">
          جوالك
          <span className="mx-2 inline-block bg-acid px-2 text-ink">اليوم</span>
          <br />
          القسط لاحقاً
        </h1>

        <p className="mt-7 max-w-2xl text-lg text-mute md:text-xl">
          جدل يموّل <strong className="text-acid">الأجهزة الخلوية فقط</strong>. لا سيارات. لا أثاث.
          لا تمويل عام — مسار أقساط واضح لجوالك.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-ink bg-acid px-7 py-4 font-display text-lg font-extrabold text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            ابدأ طلب التقسيط
            <ArrowLeft className="size-5" aria-hidden="true" />
          </a>
          <a
            href="#only"
            className="border-2 border-paper px-7 py-4 font-display text-lg font-bold transition-colors duration-100 hover:bg-paper hover:text-ink"
          >
            حدود التخصص
          </a>
        </div>
      </div>

      {/* 21st animated marquee hero pattern — phone cards */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_90%,transparent)]">
        <motion.div
          className="flex gap-4 px-4"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 28, repeat: Infinity }}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.name}-${index}`}
              className={`flex aspect-[3/4] h-44 shrink-0 flex-col justify-between border-4 border-ink p-4 hard-shadow md:h-56 ${card.tone}`}
              style={{ rotate: `${index % 2 === 0 ? -4 : 5}deg` }}
            >
              <Smartphone className="size-8" aria-hidden="true" />
              <p className="font-display text-left text-xl font-extrabold leading-tight md:text-2xl">
                {card.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function OnlyPhones() {
  return (
    <section id="only" className="border-b-4 border-acid bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
        <div className="relative flex justify-center">
          {/* 21st minimalist-hero yellow circle → acid */}
          <div className="absolute z-0 h-[260px] w-[260px] rounded-full bg-acid md:h-[380px] md:w-[380px]" aria-hidden="true" />
          <img
            src={MARK}
            alt="شعار جدل"
            className="relative z-10 w-48 border-4 border-ink bg-paper p-3 hard-shadow-ink md:w-64"
          />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">scope lock</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
            تخصص واحد.
            <br />
            جوالات فقط.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            لسنا سوبرماركت تمويل. جدل مبنية حول تقسيط الهواتف والأجهزة الخلوية —
            كل رسالة، كل خطة، كل مسار خدمة.
          </p>
          <ul className="mt-8 space-y-3 font-display text-lg font-bold">
            <li className="flex items-center gap-3 border-2 border-ink bg-acid px-4 py-3">
              <Smartphone className="size-5" aria-hidden="true" /> داخل النطاق: أجهزة خلوية
            </li>
            <li className="flex items-center gap-3 border-2 border-ink px-4 py-3">
              <Ban className="size-5" aria-hidden="true" /> خارج النطاق: سيارات · أثاث · قروض عامة
            </li>
          </ul>
        </div>
      </div>
      <NeoMarquee items={PHONE_ITEMS} />
    </section>
  )
}

function BentoWhy() {
  const items = [
    {
      className: 'span-2 span-2-row bg-acid text-ink',
      title: 'وضوح القسط',
      body: 'تعرف قيمة القسط والمدة قبل التوقيع — بلا مفاجآت بعد استلام الجهاز.',
      icon: Shield,
    },
    {
      className: 'bg-ink text-paper border-acid',
      title: 'مسار سريع',
      body: 'طلب → دراسة → موافقة → استلام الجوال.',
      icon: Zap,
    },
    {
      className: 'bg-signal text-ink',
      title: 'إشارة واضحة',
      body: 'هوية بصرية تعكس تخصص الخلوي لا تمويل كل شيء.',
      icon: Smartphone,
    },
    {
      className: 'span-2 bg-paper text-ink',
      title: 'حدود صريحة',
      body: 'نقول لا لما هو خارج الجوالات. التخصص قوتنا — لا توسيع عشوائي للمنتجات.',
      icon: Ban,
    },
  ]

  return (
    <section id="bento" className="border-b-4 border-acid px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-10 font-display text-4xl font-extrabold md:text-6xl">لماذا جدل</h2>
        {/* 21st BrutalistBentoGrid pattern */}
        <div className="bento-grid">
          {items.map((it) => (
            <article
              key={it.title}
              className={`border-4 border-ink p-6 transition-transform duration-100 hover:translate-x-1 hover:translate-y-1 md:p-8 ${it.className}`}
            >
              <it.icon className="size-8" strokeWidth={2.25} aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-extrabold md:text-3xl">{it.title}</h3>
              <p className="mt-3 text-base leading-relaxed opacity-80">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Voices() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section id="voices" className="border-b-4 border-acid bg-paper px-4 py-16 text-ink md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">voices</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">من جرّب التقسيط</h2>

        {/* 21st editorial-testimonial adapted */}
        <div className="mt-12 flex items-start gap-6 md:gap-10">
          <span className="select-none font-display text-[100px] font-extrabold leading-none text-ink/10 md:text-[140px]">
            {String(active + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 pt-4">
            <blockquote className="font-display text-2xl font-bold leading-snug md:text-3xl">
              «{current.quote}»
            </blockquote>
            <p className="mt-8 font-bold">{current.author}</p>
            <p className="text-sm text-ink/55">{current.role} · تقسيط جوال</p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`شهادة ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1 transition-all duration-200 ${i === active ? 'w-12 bg-ink' : 'w-6 bg-ink/25 hover:bg-ink/40'}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="السابق"
              className="border-2 border-ink p-2 hover:bg-acid"
              onClick={() => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))}
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              aria-label="التالي"
              className="border-2 border-ink p-2 hover:bg-acid"
              onClick={() => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))}
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">
            جاهز
            <br />
            <span className="bg-acid px-2 text-ink">لجوالك؟</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-mute">
            اكتب الجهاز الخلوي الذي تريده — نرد بمسار الأقساط. للجوالات فقط.
          </p>
          <p className="mt-6 font-mono text-xs text-mute">
            ops →{' '}
            <a className="text-acid underline" href="https://jadal.aqssat.co">
              jadal.aqssat.co
            </a>
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border-4 border-acid bg-paper p-6 text-ink hard-shadow md:p-8"
        >
          {sent ? (
            <p className="py-12 text-center font-display text-2xl font-extrabold" role="status">
              وصل طلبك. سنتواصل بخصوص تقسيط جهازك الخلوي.
            </p>
          ) : (
            <div className="space-y-4">
              {(
                [
                  ['name', 'الاسم', 'text'],
                  ['phone', 'الجوال', 'tel'],
                  ['device', 'الجهاز المطلوب', 'text'],
                ] as const
              ).map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="mb-1 block font-display text-sm font-bold">{label}</span>
                  <input
                    required
                    name={name}
                    type={type}
                    placeholder={name === 'device' ? 'مثال: iPhone 16 Pro' : undefined}
                    className="w-full border-2 border-ink bg-paper px-4 py-3 outline-none focus:bg-acid/30"
                  />
                </label>
              ))}
              <button
                type="submit"
                className="mt-2 w-full border-2 border-ink bg-acid py-4 font-display text-lg font-extrabold hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
              >
                أرسل طلب تقسيط الجوال
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t-4 border-acid px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={MARK} alt="" className="h-10 w-10 border-2 border-acid bg-paper object-contain" />
          <div>
            <p className="font-display text-xl font-extrabold">جدل</p>
            <p className="text-sm text-mute">تقسيط أجهزة خلوية فقط · jadal.cc</p>
          </div>
        </div>
        <p className="font-mono text-xs text-mute">© {new Date().getFullYear()} JADAL</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-svh bg-ink text-paper">
      <Header />
      <main>
        <Hero />
        <OnlyPhones />
        <BentoWhy />
        <Voices />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
