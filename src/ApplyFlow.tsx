import { useEffect, useState, type FormEvent } from 'react'
import { COMPANY, MONTHLY_INSTALLMENT_LABEL } from './data/company'
import { metaClickIds, newEventId, trackMeta } from './lib/metaPixel'

const MARK = '/mark.png'
const INPUT = 'w-full border-2 border-ink bg-paper px-4 py-3 outline-none focus:bg-acid/30'

type Profile = Record<string, string>

function field(
  label: string,
  value: string,
  set: (v: string) => void,
  extra?: { required?: boolean; type?: string; dir?: 'ltr' | 'rtl'; hint?: string; name?: string },
) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-sm font-bold">
        {label}
        {extra?.required ? ' *' : ''}
      </span>
      <input
        required={extra?.required}
        name={extra?.name}
        type={extra?.type ?? 'text'}
        dir={extra?.dir}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={INPUT}
      />
      {extra?.hint ? <span className="mt-1 block text-xs text-ink/50">{extra.hint}</span> : null}
    </label>
  )
}

export function ApplyFlow() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id') ?? ''
  const token = params.get('t') ?? ''
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [device, setDevice] = useState('')
  const [p, setP] = useState<Profile>({
    fullName: '',
    idNumber: '',
    phone: '',
    gender: '',
    birthDate: '',
    employerName: '',
    salary: '',
    isSocialSecurity: 'yes',
    socialSecurityNumber: '',
    homeCity: 'عمّان',
    homeStreet: '',
  })

  function patch(key: string, value: string) {
    setP((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    if (!id || !token) {
      setLoading(false)
      return
    }
    void (async () => {
      try {
        const res = await fetch(`/apply-api.php?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`, {
          cache: 'no-store',
        })
        const data = (await res.json()) as {
          ok?: boolean
          item?: { name?: string; phone?: string; device?: string; profile?: Record<string, unknown>; stage?: string }
        }
        if (!res.ok || !data.ok || !data.item) {
          setError('تعذّر فتح الطلب. تواصل معنا على واتساب.')
          return
        }
        setDevice(data.item.device ?? '')
        const prof = (data.item.profile ?? {}) as Record<string, unknown>
        setP((prev) => ({
          ...prev,
          fullName: String(prof.fullName ?? data.item?.name ?? prev.fullName),
          idNumber: String(prof.idNumber ?? prev.idNumber),
          phone: String(prof.phone ?? data.item?.phone ?? prev.phone),
          gender: String(prof.gender ?? prev.gender),
          birthDate: String(prof.birthDate ?? prev.birthDate),
          employerName: String(prof.employerName ?? prev.employerName),
          salary: String(prof.salary ?? prev.salary),
          isSocialSecurity: prof.isSocialSecurity === false || prof.isSocialSecurity === 'no' ? 'no' : 'yes',
          socialSecurityNumber: String(prof.socialSecurityNumber ?? prev.socialSecurityNumber),
          homeCity: String(prof.homeCity ?? prev.homeCity),
          homeStreet: String(prof.homeStreet ?? prev.homeStreet),
        }))
        if (data.item.stage === 'profile') setDone(true)
      } catch {
        setError('تعذّر الاتصال. حاول مرة أخرى.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id, token])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const eventId = newEventId()
    try {
      const res = await fetch('/apply-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'profile',
          id,
          token,
          eventId,
          ...metaClickIds(),
          profile: {
            fullName: p.fullName,
            idNumber: p.idNumber,
            phone: p.phone,
            gender: p.gender,
            birthDate: p.birthDate,
            nationality: 'أردني',
            city: p.homeCity,
            employerName: p.employerName,
            salary: p.salary,
            isSocialSecurity: p.isSocialSecurity === 'yes',
            socialSecurityNumber: p.socialSecurityNumber,
            homeCity: p.homeCity,
            homeStreet: p.homeStreet,
          },
        }),
      })
      const data = (await res.json()) as { ok?: boolean }
      if (!res.ok || !data.ok) {
        setError('أكمل الحقول المطلوبة ثم أعد الإرسال.')
        return
      }
      trackMeta('CompleteRegistration', { content_name: 'financing_profile', status: true }, eventId)
      setDone(true)
    } catch {
      setError('تعذّر الحفظ. حاول مرة أخرى.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-svh bg-ink text-paper">
      <header className="flex items-center gap-3 border-b-4 border-acid px-4 py-3">
        <a href="/" className="flex items-center gap-3">
          <img src={MARK} alt="" className="h-10 w-10 border-2 border-acid bg-paper object-contain" />
          <span className="font-display text-xl font-extrabold">{COMPANY.tradeNameAr}</span>
        </a>
      </header>
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="font-display text-3xl font-extrabold">بياناتك</h1>
        <p className="mt-2 text-sm text-mute">نحتاج هذه المعلومات لدراسة التقسيط. سنتواصل معك بعد المراجعة.</p>
        {device ? (
          <p className="mt-4 border-2 border-acid bg-paper px-3 py-2 font-display text-sm font-bold text-ink">
            الجهاز: {device}
            <span className="mt-1 block text-ink/70">{MONTHLY_INSTALLMENT_LABEL}</span>
          </p>
        ) : null}

        {loading ? <p className="mt-8">جاري التحميل…</p> : null}
        {error && (loading || done) ? <p className="mt-6 border-2 border-acid px-4 py-3 text-acid">{error}</p> : null}

        {done ? (
          <div className="mt-8 border-4 border-acid bg-paper p-6 text-ink">
            <p className="font-display text-2xl font-extrabold">وصلنا طلبك</p>
            <p className="mt-3">سنتواصل معك قريباً.</p>
            <a
              href={COMPANY.whatsappUrl}
              className="mt-6 inline-block border-2 border-ink bg-acid px-5 py-3 font-display font-extrabold"
            >
              واتساب جدل
            </a>
          </div>
        ) : null}

        {!loading && !done ? (
          <form onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-5 border-4 border-acid bg-paper p-5 text-ink">
            {field('الاسم الرباعي', p.fullName, (v) => patch('fullName', v), { required: true })}
            {field('الرقم الوطني', p.idNumber, (v) => patch('idNumber', v.replace(/\D/g, '').slice(0, 12)), {
              required: true,
              dir: 'ltr',
            })}
            {field('رقم الهاتف', p.phone, (v) => patch('phone', v), { required: true, type: 'tel', dir: 'ltr' })}
            <div>
              <p className="mb-1 font-display text-sm font-bold">الجنس *</p>
              <div className="flex gap-4">
                {[['male', 'ذكر'], ['female', 'أنثى']].map(([val, lbl]) => (
                  <label key={val} className="flex items-center gap-2">
                    <input type="radio" name="gender" required checked={p.gender === val} onChange={() => patch('gender', val)} />
                    {lbl}
                  </label>
                ))}
              </div>
            </div>
            {field('تاريخ الميلاد', p.birthDate, (v) => patch('birthDate', v), { required: true, type: 'date', dir: 'ltr' })}
            {field('جهة العمل', p.employerName, (v) => patch('employerName', v), { required: true })}
            {field('الراتب الشهري (د.أ)', p.salary, (v) => patch('salary', v), { required: true, dir: 'ltr' })}
            <div>
              <p className="mb-1 font-display text-sm font-bold">مشترك بالضمان؟</p>
              <div className="flex gap-4">
                {[['yes', 'نعم'], ['no', 'لا']].map(([val, lbl]) => (
                  <label key={val} className="flex items-center gap-2">
                    <input type="radio" name="ss" checked={p.isSocialSecurity === val} onChange={() => patch('isSocialSecurity', val)} />
                    {lbl}
                  </label>
                ))}
              </div>
            </div>
            {p.isSocialSecurity === 'yes'
              ? field('رقم الضمان', p.socialSecurityNumber, (v) => patch('socialSecurityNumber', v), { dir: 'ltr' })
              : null}
            {field('مدينة السكن', p.homeCity, (v) => patch('homeCity', v), { required: true })}
            {field('العنوان', p.homeStreet, (v) => patch('homeStreet', v), { hint: 'الحي والشارع' })}

            {error ? <p className="text-sm text-rose-700">{error}</p> : null}
            <button
              type="submit"
              disabled={saving}
              className="w-full border-2 border-ink bg-acid py-4 font-display text-lg font-extrabold disabled:opacity-60"
            >
              {saving ? 'جارٍ الإرسال…' : 'إرسال'}
            </button>
          </form>
        ) : null}
      </main>
    </div>
  )
}
