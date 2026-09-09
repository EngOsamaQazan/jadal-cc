import { useMemo, useState } from 'react'
import { DOC_ITEMS, readinessLabel } from '../lib/docsChecklist'

export function ReadyQuiz() {
  const [answers, setAnswers] = useState<Set<string>>(() => new Set())
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  const current = DOC_ITEMS[index]
  const selectedCount = answers.size
  const progress = done ? DOC_ITEMS.length : index + 1

  const summary = useMemo(() => readinessLabel(selectedCount), [selectedCount])

  function answer(yes: boolean) {
    if (!current) return
    setAnswers((prev) => {
      const next = new Set(prev)
      if (yes) next.add(current.id)
      else next.delete(current.id)
      return next
    })
    if (index >= DOC_ITEMS.length - 1) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
  }

  function back() {
    if (done) {
      setDone(false)
      return
    }
    if (index > 0) setIndex((i) => i - 1)
  }

  function reset() {
    setAnswers(new Set())
    setIndex(0)
    setDone(false)
  }

  return (
    <section id="ready" className="scroll-mt-28 border-b-4 border-acid bg-paper px-4 py-16 text-ink md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">docs · readiness</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">جاهزية الطلب</h2>
        <p className="mt-3 text-ink/65">
          أجب بنعم أو لا. القسط عند جدل موحّد ({' '}
          <strong>10 د.أ / الشهر</strong>
          ) — التوثيق يسرّع الاعتماد ولا يغيّر رقم القسط المعروض.
        </p>
        <p className="mt-4 font-mono text-xs text-ink/45">
          {progress} / {DOC_ITEMS.length}
        </p>

        {!done && current ? (
          <div className="mt-8 border-4 border-ink bg-ink p-6 text-paper md:p-8">
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">{current.question}</h3>
            {current.hint ? <p className="mt-2 text-sm text-mute">{current.hint}</p> : null}
            {current.extra ? (
              <span className="mt-3 inline-block border-2 border-acid px-2 py-0.5 font-display text-xs font-extrabold text-acid">
                حصري
              </span>
            ) : null}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => answer(true)}
                className="border-2 border-ink bg-acid py-4 font-display text-lg font-extrabold text-ink"
              >
                نعم
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="border-2 border-paper py-4 font-display text-lg font-extrabold text-paper hover:bg-paper hover:text-ink"
              >
                لا
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 border-4 border-ink bg-acid p-6 md:p-8">
            <p className="font-display text-2xl font-extrabold md:text-3xl">{summary}</p>
            <p className="mt-3 text-ink/80">
              اخترت {selectedCount} من {DOC_ITEMS.length} بنود توثيق. بعد الإرسال ندرس الطلب ونحدد المسار النهائي.
            </p>
            <ul className="mt-5 space-y-1 text-sm">
              {DOC_ITEMS.filter((d) => answers.has(d.id)).map((d) => (
                <li key={d.id} className="font-bold">
                  ✓ {d.label}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex border-2 border-ink bg-ink px-6 py-3 font-display text-base font-extrabold text-acid"
            >
              المتابعة لطلب التقسيط
            </a>
            <button type="button" onClick={reset} className="mt-4 block text-sm font-bold underline">
              إعادة الأسئلة
            </button>
          </div>
        )}

        {(index > 0 || done) && (
          <button type="button" onClick={back} className="mt-4 font-display text-sm font-bold underline">
            رجوع
          </button>
        )}
      </div>
    </section>
  )
}
