import mark from '../assets/mark.png'

const phones = [
  'iPhone 16 Pro',
  'Galaxy S25 Ultra',
  'Pixel 9 Pro',
  'Xiaomi 15',
  'Honor Magic7',
  'OnePlus 13',
  'Galaxy Z Fold',
  'iPhone 16',
]

export function BrandMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <img
      src={mark}
      alt="شعار جدل"
      className={`bg-paper object-contain p-1 ${className}`}
      width={64}
      height={64}
    />
  )
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-acid bg-ink">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <BrandMark className="h-11 w-11 border-2 border-ink" />
          <span className="font-display text-2xl font-extrabold tracking-tight text-paper md:text-3xl">
            جدل
          </span>
        </a>
        <nav className="hidden items-center gap-6 font-display text-sm font-bold uppercase tracking-wide md:flex" aria-label="القائمة">
          <a href="#story" className="text-paper transition-colors duration-100 hover:text-acid">
            القصة
          </a>
          <a href="#only" className="text-paper transition-colors duration-100 hover:text-acid">
            التخصص
          </a>
          <a href="#flow" className="text-paper transition-colors duration-100 hover:text-acid">
            المسار
          </a>
          <a href="#contact" className="text-paper transition-colors duration-100 hover:text-acid">
            تواصل
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://jadal.aqssat.co"
            className="hidden border-2 border-paper px-3 py-2 font-display text-xs font-bold text-paper transition-colors duration-100 hover:bg-paper hover:text-ink sm:inline-block"
          >
            دخول
          </a>
          <a
            href="#contact"
            className="border-2 border-ink bg-acid px-4 py-2 font-display text-sm font-extrabold text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1"
          >
            قسّط جوالك
          </a>
        </div>
      </div>
    </header>
  )
}

export function Marquee() {
  const row = [...phones, ...phones]
  return (
    <div className="overflow-hidden border-y-4 border-acid bg-acid py-3 text-ink" aria-hidden="true">
      <div className="marquee-track flex gap-10 whitespace-nowrap font-display text-xl font-extrabold md:text-2xl">
        {row.map((p, i) => (
          <span key={`${p}-${i}`} className="inline-flex items-center gap-10">
            {p}
            <span className="text-ink/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function HeroBrutal() {
  return (
    <section id="top" className="slash-bg border-b-4 border-acid pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-8 md:py-20">
        <div>
          <p className="mb-6 inline-block border-2 border-acid bg-ink px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-acid">
            cellular installments only
          </p>
          <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-paper">
            جوالك
            <br />
            <span className="bg-acid px-2 text-ink">اليوم.</span>
            <br />
            القسط
            <br />
            لاحقاً.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute md:text-xl">
            جدل ليست منصة تقسيط لكل شيء. نمّول{' '}
            <strong className="text-acid">الأجهزة الخلوية فقط</strong> — بخطط
            واضحة وحدود صريحة بلا وعود خارج الجوالات.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="border-2 border-ink bg-acid px-6 py-4 font-display text-lg font-extrabold text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
            >
              ابدأ طلب التقسيط
            </a>
            <a
              href="#only"
              className="border-2 border-paper px-6 py-4 font-display text-lg font-bold text-paper transition-colors duration-100 hover:bg-paper hover:text-ink"
            >
              لماذا جوالات فقط؟
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rotate-2 border-4 border-signal opacity-60" aria-hidden="true" />
          <div className="-rotate-2 border-4 border-acid bg-paper p-4 hard-shadow md:p-6">
            <img src={mark} alt="" className="mx-auto w-full max-w-sm bg-paper" />
            <p className="mt-4 border-t-4 border-ink pt-4 font-display text-2xl font-extrabold text-ink md:text-3xl">
              إشارة واضحة.
              <br />
              تمويل أوضح.
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink/60">
              mark · signal · braid
            </p>
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  )
}
