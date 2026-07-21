import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, HandCoins, Smartphone } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'اختر جهازك الخلوي',
    body: 'حدد الهاتف أو الجهاز الخلوي الذي تريده من الشركاء المعتمدين.',
  },
  {
    icon: HandCoins,
    title: 'اختر خطة الأقساط',
    body: 'اطّلع على قيمة القسط والمدة بوضوح — للجوالات فقط، بلا فئات أخرى.',
  },
  {
    icon: Smartphone,
    title: 'استلم جوالك',
    body: 'بعد الموافقة تستلم جهازك وتبدأ جدول الأقساط المتفق عليه.',
  },
]

const plans = [
  {
    name: 'مرن',
    note: 'للأجهزة متوسطة الفئة',
    points: ['مدة أقساط مناسبة', 'قسط شهري واضح', 'مناسب لأول جوال بالتقسيط'],
  },
  {
    name: 'الأكثر طلباً',
    note: 'للهواتف الأكثر مبيعاً',
    highlight: true,
    points: ['توازن بين المدة والقسط', 'مسار موافقة أسرع', 'دعم استلام منظم'],
  },
  {
    name: 'فلاجشيب',
    note: 'لأحدث الأجهزة الخلوية',
    points: ['تمويل أجهزة عالية المواصفات', 'خطط أطول عند الحاجة', 'متابعة عميل مخصّصة'],
  },
]

export function HowItWorks() {
  const reduce = useReducedMotion()
  return (
    <section id="how" className="scroll-mt-28 border-t border-white/10 bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-accent">كيف يعمل</p>
        <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">ثلاث خطوات لجوالك</h2>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative rounded-3xl border border-white/10 bg-ink/50 p-6 md:p-7"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <s.icon className="mt-4 size-7 text-fg" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Plans() {
  const reduce = useReducedMotion()
  return (
    <section id="plans" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-accent">خطط الأقساط</p>
        <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">مسارات مصمّمة للجوالات</h2>
        <p className="mt-4 max-w-2xl text-muted md:text-lg">
          الأرقام النهائية تعتمد على الجهاز ومدة الخطة. هنا نوضح الاتجاه — التفاصيل عند طلب العرض.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              className={`rounded-3xl border p-7 transition-all duration-200 ${
                p.highlight
                  ? 'border-primary/50 bg-gradient-to-b from-primary/15 to-white/[0.03] shadow-lg shadow-primary/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20'
              }`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              {p.highlight && (
                <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  الأكثر طلباً
                </span>
              )}
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted">{p.note}</p>
              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-fg/90">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  p.highlight
                    ? 'bg-accent text-white hover:brightness-110'
                    : 'border border-white/15 hover:bg-white/5'
                }`}
              >
                اطلب عرضاً لجهازك
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
