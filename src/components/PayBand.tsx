import { COMPANY } from '../data/company'
import { newEventId, trackMeta } from '../lib/metaPixel'

export function PayBand() {
  return (
    <section id="pay" className="border-b-4 border-acid bg-acid px-4 py-14 text-ink md:px-8 md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">efawateercom · settle</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold md:text-5xl">{COMPANY.pay.titleAr}</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/80 md:text-lg">{COMPANY.pay.bodyAr}</p>
        </div>
        <a
          href={COMPANY.whatsappUrl}
          className="shrink-0 border-2 border-ink bg-ink px-6 py-4 font-display text-base font-extrabold text-acid hard-shadow transition-transform duration-100 hover:translate-x-1 hover:translate-y-1"
          onClick={() => trackMeta('Contact', { content_name: 'pay_whatsapp' }, newEventId())}
        >
          {COMPANY.pay.ctaAr}
        </a>
      </div>
    </section>
  )
}
