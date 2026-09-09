import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { COMPANY, storeOpenStatus, type OpenStatus } from '../data/company'

export function Visit() {
  const [status, setStatus] = useState<OpenStatus>(() => storeOpenStatus())

  useEffect(() => {
    const tick = () => setStatus(storeOpenStatus())
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="visit" className="border-b-4 border-acid bg-paper px-4 py-16 text-ink md:px-8 md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">visit · amman</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            {COMPANY.cityAr}
            <br />
            <span className="text-ink/70">{COMPANY.streetAddressAr}</span>
          </h2>
          <a
            href={COMPANY.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border-2 border-ink bg-acid px-4 py-2.5 font-display text-sm font-extrabold hard-shadow-ink transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            <MapPin className="size-4" aria-hidden="true" />
            افتح في الخرائط
          </a>
        </div>
        <p className="max-w-md border-4 border-ink bg-ink p-5 text-paper md:p-6">
          <strong className="block font-display text-lg font-extrabold">أوقات الدوام</strong>
          <span
            className={`mt-2 inline-block border-2 px-2 py-0.5 font-display text-xs font-extrabold ${
              status.open ? 'border-acid bg-acid text-ink' : 'border-paper/40 text-mute'
            }`}
          >
            {status.label}
          </span>
          <span className="mt-3 block text-sm text-mute">{COMPANY.hours.daysAr}</span>
          <span className="mt-1 block text-sm text-paper">{COMPANY.hours.clockAr}</span>
        </p>
      </div>
    </section>
  )
}
