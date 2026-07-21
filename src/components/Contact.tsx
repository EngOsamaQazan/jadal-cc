import { useState, type FormEvent } from 'react'
import { LogoWordmark } from './Logo'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-28 border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-accent">تواصل</p>
          <h2 className="mt-3 text-3xl md:text-5xl">جاهز لجوالك بالتقسيط؟</h2>
          <p className="mt-4 max-w-lg text-muted md:text-lg">
            أخبرنا عن الجهاز الخلوي الذي تريده. فريق جدل يرد عليك بمسار الأقساط المناسب —
            للجوالات فقط.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            <li>النطاق: أجهزة خلوية / هواتف ذكية</li>
            <li>خارج النطاق: سيارات، أثاث، تمويل عام</li>
            <li>
              نظام العمليات:{' '}
              <a className="text-primary underline-offset-4 hover:underline" href="https://jadal.aqssat.co">
                jadal.aqssat.co
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-xl shadow-black/30 md:p-8"
          noValidate
        >
          {sent ? (
            <p className="py-10 text-center text-lg text-fg" role="status">
              شكراً لك. استلمنا طلبك وسنتواصل قريباً بخصوص تقسيط جهازك الخلوي.
            </p>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted">الاسم</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-fg outline-none transition focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted">الجوال</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-fg outline-none transition focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted">الجهاز المطلوب</span>
                <input
                  required
                  name="device"
                  placeholder="مثال: iPhone 16 / Galaxy S25"
                  className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-fg outline-none transition placeholder:text-muted/50 focus:border-primary"
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
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

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <LogoWordmark />
          <p className="mt-3 max-w-sm text-sm text-muted">
            جدل — علامة متخصصة في تقسيط الأجهزة الخلوية. jadal.cc
          </p>
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} جدل · جميع الحقوق محفوظة</p>
      </div>
    </footer>
  )
}
