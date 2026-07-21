import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { LogoMark } from './Logo'

const fade = (delay: number, reduce: boolean | null) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: 'easeOut' as const },
      }

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="hero-glow relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:justify-center md:pb-24 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,#0B1220_92%)]" />
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute -right-10 top-10 h-80 w-80 rounded-full bg-primary/15 blur-[110px]" />
        <div className="absolute left-1/2 top-[16%] -translate-x-1/2 opacity-[0.12] md:left-[10%] md:top-[18%] md:translate-x-0 md:opacity-[0.16]">
          <LogoMark className="h-[min(58vw,340px)] w-[min(58vw,340px)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.p
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
          {...fade(0.05, reduce)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          متخصصون في تقسيط الأجهزة الخلوية فقط
        </motion.p>

        <motion.h1
          className="max-w-3xl text-4xl leading-[1.25] text-fg sm:text-5xl md:text-6xl lg:text-7xl"
          {...fade(0.12, reduce)}
        >
          جوالك اليوم.
          <br />
          <span className="text-primary">أقساط واضحة</span> بلا تعقيد.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          {...fade(0.2, reduce)}
        >
          جدل يموّل شراء الهواتف والأجهزة الخلوية فقط — خطط أقساط شفافة، موافقة
          سريعة، وبدون وعود خارج نطاق الجوالات.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...fade(0.28, reduce)}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          >
            ابدأ طلب التقسيط
            <ArrowLeft className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#how"
            className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-fg transition-all duration-200 hover:border-white/25 hover:bg-white/10"
          >
            كيف تحصل على جوالك
          </a>
        </motion.div>
      </div>
    </section>
  )
}
