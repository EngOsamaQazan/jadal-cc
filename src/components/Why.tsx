import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Smartphone, ShieldCheck, Sparkles } from 'lucide-react'

const stats = [
  { value: 'جوالات فقط', label: 'لا نمّول سيارات أو أثاث أو قروض عامة' },
  { value: 'أقساط شفافة', label: 'تعرف قيمة القسط قبل التوقيع' },
  { value: 'مسار سريع', label: 'من الطلب إلى استلام الجهاز بخطوات واضحة' },
]

const reasons = [
  {
    icon: Smartphone,
    title: 'تركيز على الخلوي',
    body: 'كل منتجنا وعملياتنا مبنية حول تقسيط الهواتف والأجهزة الخلوية — لا تشتت، لا فئات أخرى.',
  },
  {
    icon: ShieldCheck,
    title: 'ثقة ووضوح الرسوم',
    body: 'نوضح الشروط والأقساط مقدماً. لا رسوم مخفية ولا وعود تمويل خارج نطاق الجوالات.',
  },
  {
    icon: BadgeCheck,
    title: 'تجربة عميل مرتبة',
    body: 'طلب، دراسة، موافقة، واستلام الجهاز — مسار واحد مفهوم للجوالات فقط.',
  },
  {
    icon: Sparkles,
    title: 'هوية حديثة',
    body: 'واجهة وعلامة تجارية تعكس جدية التمويل الاستهلاكي للجوال، بلمسة بوتيك تقنية.',
  },
]

export function TrustStrip() {
  const reduce = useReducedMotion()
  return (
    <section className="border-y border-white/10 bg-surface/60 py-10" aria-label="مؤشرات الثقة">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <p className="font-display text-2xl text-primary md:text-3xl">{s.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function WhyJadal() {
  const reduce = useReducedMotion()
  return (
    <section id="why" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-accent">لماذا جدل</p>
        <h2 className="mt-3 max-w-2xl text-3xl text-fg md:text-5xl">
          تمويل جوالات… بلا توسّع خارج التخصص
        </h2>
        <p className="mt-4 max-w-2xl text-muted md:text-lg">
          لسنا منصة تقسيط لكل شيء. جدل مخصّص لمن يريد جهازاً خلوياً بخطة أقساط مفهومة.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-accent/40 hover:bg-white/[0.05] md:p-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <r.icon className="size-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-5 text-xl text-fg">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{r.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
