import { useMemo, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Smartphone, Shield, Zap, Ban } from 'lucide-react'
import { availabilityLabel, type CatalogItem } from './data/catalog'
import { DevicePicker } from './components/DevicePicker'
import { FloatActions } from './components/FloatActions'
import { PayBand } from './components/PayBand'
import { ReadyQuiz } from './components/ReadyQuiz'
import { Stories } from './components/Stories'
import { Visit } from './components/Visit'
import { COMPANY, MONTHLY_INSTALLMENT_LABEL } from './data/company'
import { useLiveCatalog } from './lib/useLiveCatalog'
import { applyQueryWithUtm, metaClickIds, newEventId, trackMeta } from './lib/metaPixel'

const MARK = '/mark.png'

function uniqueModels(items: CatalogItem[]): CatalogItem[] {
  return items
    .filter((item) => item.qty > 0)
    .filter((item, index, list) => list.findIndex((row) => row.model === item.model) === index)
}

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

function ramLabel(item: CatalogItem) {
  return item.ramGb.includes('+') ? `${item.ramGb} جيجا (ذاكرة موسّعة)` : `${item.ramGb} جيجا رام`
}

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
          <span className="font-display text-2xl font-extrabold text-paper md:text-3xl">{COMPANY.tradeNameAr}</span>
        </a>
        <nav className="hidden gap-7 font-display text-sm font-bold md:flex" aria-label="القائمة">
          {[
            ['#stock', 'الأجهزة'],
            ['#visit', 'موقعنا'],
            ['#ready', 'الجاهزية'],
            ['#pay', 'سداد الأقساط'],
            ['#contact', 'اطلب'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-paper transition-colors duration-100 hover:text-acid">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          <a
            href={COMPANY.whatsappUrl}
            className="hidden border-2 border-paper px-3 py-2 font-display text-xs font-bold sm:inline-block"
          >
            واتساب {COMPANY.phone}
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

function Hero({ catalog }: { catalog: CatalogItem[] }) {
  const reduce = useReducedMotion()
  const models = uniqueModels(catalog)
  const cards = [...models, ...models]

  return (
    <section id="top" className="slash-bg relative min-h-[100svh] overflow-hidden pt-20">
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-4 pb-52 pt-14 text-center md:px-8 md:pb-60 md:pt-16">
        <p className="mb-5 border-2 border-acid px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-acid">
          {COMPANY.cityAr} · {COMPANY.countryAr}
        </p>

        <h1 className="font-display text-[clamp(2rem,7vw,5rem)] font-extrabold leading-[0.95] text-paper">
          جوالك
          <span className="mx-2 inline-block bg-acid px-2 text-ink">اليوم</span>
          <br />
          القسط لاحقاً
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-mute md:text-xl">
          نموّل <strong className="text-acid">الأجهزة الخلوية فقط</strong> من مستودع جدل. لا سيارات ولا أثاث.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#stock"
            className="inline-flex items-center gap-2 border-2 border-ink bg-acid px-7 py-4 font-display text-lg font-extrabold text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            الأجهزة المتوفرة
            <ArrowLeft className="size-5" aria-hidden="true" />
          </a>
          <a
            href="#about"
            className="border-2 border-paper px-7 py-4 font-display text-lg font-bold transition-colors duration-100 hover:bg-paper hover:text-ink"
          >
            بيانات الشركة
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_90%,transparent)]">
        <motion.div
          className="flex gap-4 px-4"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 36, repeat: Infinity }}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="flex aspect-[3/4] h-44 shrink-0 flex-col justify-between border-4 border-ink bg-paper p-0 text-ink hard-shadow md:h-56"
              style={{ rotate: `${index % 2 === 0 ? -4 : 5}deg` }}
            >
              <img src={card.image} alt="" className="h-[62%] w-full object-contain bg-paper" />
              <div className="px-3 pb-3">
                <p className="font-display text-left text-sm font-extrabold leading-tight md:text-base">{card.title}</p>
                <p className="mt-1 font-display text-left text-xs font-extrabold text-ink/80">{MONTHLY_INSTALLMENT_LABEL}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Stock({ catalog, onRequestDevice }: { catalog: CatalogItem[]; onRequestDevice: (item: CatalogItem) => void }) {
  const [brand, setBrand] = useState('الكل')
  const [query, setQuery] = useState('')
  const brands = useMemo(() => ['الكل', ...Array.from(new Set(catalog.map((i) => i.brand)))], [catalog])
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (brand === 'الكل' ? catalog : catalog.filter((i) => i.brand === brand))
      .filter((i) => {
        if (!q) return true
        const hay = `${i.title} ${i.brand} ${i.model} ${i.storageGb ?? ''} ${i.ramGb}`.toLowerCase()
        return hay.includes(q)
      })
      .slice()
      .sort((a, b) => {
        if ((a.qty > 0) !== (b.qty > 0)) return a.qty > 0 ? -1 : 1
        if (a.qty <= 3 && b.qty > 3) return -1
        if (b.qty <= 3 && a.qty > 3) return 1
        return a.qty - b.qty
      })
  }, [brand, catalog, query])

  return (
    <section id="stock" className="scroll-mt-28 border-b-4 border-acid bg-paper px-4 py-16 text-ink md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">warehouse · jadal</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold md:text-6xl">الأجهزة في المستودع</h2>
        <label className="mt-6 block max-w-xl">
          <span className="sr-only">ابحث في الأجهزة</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث: سامسونج، ريدمي، 128…"
            className="w-full border-2 border-ink bg-paper px-4 py-3 font-display outline-none focus:bg-acid/30"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              className={`border-2 border-ink px-3 py-1.5 font-display text-sm font-bold ${
                brand === b ? 'bg-acid' : 'bg-paper hover:bg-acid/40'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {rows.length === 0 ? (
            <p className="col-span-full border-2 border-ink px-4 py-8 text-center font-display text-lg font-bold">
              لا نتائج مطابقة — جرّب بحثاً أقصر أو غيّر العلامة.
            </p>
          ) : null}
          {rows.map((item) => {
            const available = item.qty > 0
            const scarce = item.qty > 0 && item.qty <= 3
            const capacity =
              item.storageGb != null ? `${item.storageGb} جيجا · رام ${ramLabel(item)}` : ramLabel(item)
            return (
            <article
              key={item.id}
              className={`flex flex-col border-4 border-ink bg-paper hard-shadow-ink ${available ? '' : 'opacity-70'}`}
            >
              <div className="flex h-64 items-center justify-center border-b-4 border-ink bg-ink/5 p-4">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-extrabold leading-tight">{item.title}</h3>
                  <span
                    className={`shrink-0 border-2 border-ink px-2 py-1 font-display text-xs font-extrabold ${
                      !available ? 'bg-ink text-paper' : scarce ? 'bg-signal text-ink' : 'bg-acid text-ink'
                    }`}
                  >
                    {availabilityLabel(item.qty)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-ink/60">{capacity}</p>
                <p className="mt-3 border-2 border-ink bg-acid px-3 py-2 font-display text-lg font-extrabold">
                  {MONTHLY_INSTALLMENT_LABEL}
                </p>
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">التخزين</dt>
                    <dd className="font-bold">{item.storageGb ? `${item.storageGb} جيجا` : '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">الذاكرة</dt>
                    <dd className="font-bold">{ramLabel(item)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">الشاشة</dt>
                    <dd className="text-left font-bold">{item.display}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">البطارية</dt>
                    <dd className="font-bold">{item.battery}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">الكاميرا</dt>
                    <dd className="text-left font-bold">{item.camera}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">النظام</dt>
                    <dd className="font-bold">{item.os}</dd>
                  </div>
                </dl>
                {available ? (
                  <a
                    href="#contact"
                    onClick={() => {
                      onRequestDevice(item)
                      const eventId = newEventId()
                      trackMeta(
                        'ViewContent',
                        {
                          content_ids: [item.sku || String(item.id)],
                          content_name: item.title,
                          content_type: 'product',
                          currency: 'JOD',
                        },
                        eventId,
                      )
                    }}
                    className="mt-5 border-2 border-ink bg-acid py-3 text-center font-display text-sm font-extrabold hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    اطلب تقسيط هذا الجهاز
                  </a>
                ) : (
                  <p className="mt-5 border-2 border-ink py-3 text-center font-display text-sm font-bold text-ink/55">
                    غير متوفر حالياً
                  </p>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="border-b-4 border-acid px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">الشركة</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">عن الشركة</h2>
          <p className="mt-5 text-lg leading-relaxed text-mute">
            {COMPANY.tradeNameAr} متخصصة في تقسيط وبيع الأجهزة الخلوية من مستودعها في عمّان.
          </p>
          <p className="mt-4 border-4 border-acid bg-paper p-5 font-display text-2xl font-extrabold leading-snug text-ink">
            {COMPANY.tradeNameAr}
          </p>
        </div>
        <dl className="space-y-4 border-4 border-acid bg-paper p-6 text-ink md:p-8">
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">النشاط</dt>
            <dd className="mt-1 font-display text-xl font-bold">{COMPANY.activityAr}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">العنوان</dt>
            <dd className="mt-1 text-lg font-bold">
              <a className="underline" href={COMPANY.mapsUrl}>
                {COMPANY.addressAr}
              </a>
              <span className="block text-base font-medium text-ink/70">{COMPANY.countryAr}</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">واتساب</dt>
            <dd className="mt-1">
              <a className="font-display text-xl font-extrabold underline" href={COMPANY.whatsappUrl}>
                {COMPANY.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">البريد</dt>
            <dd className="mt-1">
              <a className="text-lg font-bold underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">ساعات الدوام</dt>
            <dd className="mt-1 text-lg font-bold">
              {COMPANY.hours.daysAr}
              <span className="block text-base font-medium text-ink/70">{COMPANY.hours.clockAr}</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-ink/45">الضمان الاجتماعي</dt>
            <dd className="mt-1 font-mono text-lg">{COMPANY.socialSecurity}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function OnlyPhones({ catalog }: { catalog: CatalogItem[] }) {
  return (
    <section id="only" className="border-b-4 border-acid bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
        <div className="relative flex justify-center">
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
            لسنا سوبرماركت تمويل. جدل مبنية حول تقسيط الهواتف والأجهزة الخلوية من المخزون المعروض أعلاه.
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
      <NeoMarquee items={uniqueModels(catalog).map((item) => item.title)} />
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
      title: 'مخزون حقيقي',
      body: 'نعرض ما هو موجود في المستودع، لا هواتف وهمية للواجهة.',
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

function Contact({
  catalog,
  selectedDeviceId,
  onSelectDevice,
  deviceFocusNonce = 0,
}: {
  catalog: CatalogItem[]
  selectedDeviceId: number | null
  onSelectDevice: (id: number | null) => void
  deviceFocusNonce?: number
}) {
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError('')
    setBusy(true)
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    if (selectedDeviceId == null) {
      setFormError('اختر جهازاً من المخزون المتوفر.')
      setBusy(false)
      return
    }
    const device = String(data.get('device') ?? '').trim()
    const eventId = newEventId()
    try {
      const res = await fetch('/apply-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', name, phone, device, eventId, ...metaClickIds() }),
      })
      const json = (await res.json()) as { ok?: boolean; id?: string; token?: string }
      if (!res.ok || !json.ok || !json.id || !json.token) {
        setFormError('تعذّر حفظ الطلب. راسل واتساب أو أعد المحاولة.')
        return
      }
      trackMeta('Lead', { content_name: 'financing_inquiry', content_category: 'financing' }, eventId)
      window.location.assign(applyQueryWithUtm(json.id, json.token))
    } catch {
      setFormError('تعذّر الاتصال. تحقق من الشبكة ثم أعد المحاولة.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">
            جاهز
            <br />
            <span className="bg-acid px-2 text-ink">لجوالك؟</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-mute">
            راسلنا على واتساب أو البريد. نرد بمسار الأقساط للأجهزة المتوفرة في المستودع.
          </p>
          <ul className="mt-6 space-y-2 text-paper">
            <li>
              واتساب:{' '}
              <a
                className="text-acid underline"
                href={COMPANY.whatsappUrl}
                onClick={() => trackMeta('Contact', { content_name: 'whatsapp' }, newEventId())}
              >
                {COMPANY.phone}
              </a>
            </li>
            <li>
              بريد:{' '}
              <a className="text-acid underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </li>
            <li>
              عنوان:{' '}
              <a className="text-acid underline" href={COMPANY.mapsUrl}>
                {COMPANY.addressAr}
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={(e) => void onSubmit(e)} className="border-4 border-acid bg-paper p-6 text-ink hard-shadow md:p-8">
          <div className="space-y-4">
              {(
                [
                  ['name', 'الاسم', 'text'],
                  ['phone', 'الجوال', 'tel'],
                ] as const
              ).map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="mb-1 block font-display text-sm font-bold">{label}</span>
                  <input
                    required
                    name={name}
                    type={type}
                    className="w-full border-2 border-ink bg-paper px-4 py-3 outline-none focus:bg-acid/30"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1 block font-display text-sm font-bold">الجهاز المطلوب</span>
                <DevicePicker
                  catalog={catalog}
                  selectedId={selectedDeviceId}
                  onSelect={onSelectDevice}
                  focusNonce={deviceFocusNonce}
                />
                <span className="mt-1 block font-display text-sm font-extrabold">{MONTHLY_INSTALLMENT_LABEL}</span>
              </label>
              {formError ? <p className="text-sm text-rose-700">{formError}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full border-2 border-ink bg-acid py-4 font-display text-lg font-extrabold hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1 disabled:opacity-60"
              >
                {busy ? 'جارٍ الحفظ…' : 'أرسل طلب تقسيط الجوال'}
              </button>
              <p className="text-xs text-ink/55">بعد الإرسال ننقلك لتعبئة بياناتك الشخصية.</p>
            </div>
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
            <p className="font-display text-xl font-extrabold">{COMPANY.tradeNameAr}</p>
            <p className="text-sm text-mute">
              {COMPANY.addressAr} · {COMPANY.phone} · {COMPANY.email}
            </p>
            <p className="text-sm text-mute">
              <a className="underline" href="/privacy.html">سياسة الخصوصية</a>
              {' · '}
              <a className="underline" href="/terms.html">شروط الخدمة</a>
            </p>
          </div>
        </div>
        <p className="font-mono text-xs text-mute">
          © {new Date().getFullYear()} {COMPANY.tradeNameAr} · jadal.cc
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const catalog = useLiveCatalog()
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null)
  const [deviceFocusNonce, setDeviceFocusNonce] = useState(0)
  return (
    <div className="min-h-svh bg-ink text-paper">
      <Header />
      <main>
        <Hero catalog={catalog} />
        <Stories />
        <Visit />
        <Stock
          catalog={catalog}
          onRequestDevice={(item) => {
            setSelectedDeviceId(item.id)
            setDeviceFocusNonce((n) => n + 1)
          }}
        />
        <ReadyQuiz />
        <About />
        <OnlyPhones catalog={catalog} />
        <BentoWhy />
        <Voices />
        <PayBand />
        <Contact
          catalog={catalog}
          selectedDeviceId={selectedDeviceId}
          onSelectDevice={setSelectedDeviceId}
          deviceFocusNonce={deviceFocusNonce}
        />
      </main>
      <Footer />
      <FloatActions />
    </div>
  )
}
