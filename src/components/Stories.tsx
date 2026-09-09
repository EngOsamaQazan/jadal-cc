import { ArrowLeft } from 'lucide-react'
import { MONTHLY_INSTALLMENT_LABEL } from '../data/company'

export function Stories() {
  return (
    <section
      id="start"
      className="border-b-4 border-acid px-4 py-12 md:px-8 md:py-16"
      aria-label="الشراء والاعتماد"
    >
      <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2">
        <article className="flex flex-col justify-between border-4 border-acid bg-paper p-6 text-ink hard-shadow md:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">شراء</p>
            <h3 className="mt-2 font-display text-3xl font-extrabold">قدّم طلب تقسيط</h3>
            <p className="mt-3 text-ink/70">اختر جهازاً من المخزون الحي وابدأ الطلب خلال دقائق.</p>
            <p className="mt-4 border-2 border-ink bg-acid px-3 py-2 font-display text-sm font-extrabold">
              {MONTHLY_INSTALLMENT_LABEL}
            </p>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 self-start font-display text-lg font-extrabold underline"
          >
            ابدأ الطلب
            <ArrowLeft className="size-4" aria-hidden="true" />
          </a>
        </article>

        <article className="flex flex-col justify-between border-4 border-acid bg-ink p-6 text-paper hard-shadow md:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">الاعتماد</p>
            <h3 className="mt-2 font-display text-3xl font-extrabold">جهّز وثائقك</h3>
            <p className="mt-3 text-mute">
              أجب بنعم أو لا على أسئلة التوثيق — نوضح جاهزية طلبك قبل التوقيع.
            </p>
          </div>
          <a
            href="#ready"
            className="mt-8 inline-flex items-center gap-2 self-start font-display text-lg font-extrabold text-acid underline"
          >
            افحص الجاهزية
            <ArrowLeft className="size-4" aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  )
}
