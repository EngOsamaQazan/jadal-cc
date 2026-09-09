/** رقم المبيعات الظاهر للإعلانات والموقع العام — ليس واتساب تيسير. */
export const COMPANY = {
  legalNameAr: 'عمار قازان وشركاه - جدل للاجهزه الكهربائيه',
  tradeNameAr: 'جدل',
  registryNameAr: 'شركة جدل للأجهزة الكهربائية',
  activityAr: 'تقسيط وبيع الأجهزة الخلوية والكهربائية',
  countryAr: 'المملكة الأردنية الهاشمية',
  cityAr: 'عمّان',
  addressAr: 'عمّان — دوار صويلح — مجمع باصات الجامعة الأردنية — جسر صويلح',
  streetAddressAr: 'دوار صويلح — مجمع باصات الجامعة الأردنية — جسر صويلح',
  mapsUrl: 'https://maps.app.goo.gl/rQRj12433SNBZQNt8',
  phone: '0797698874',
  phoneIntl: '+962797698874',
  callUrl: 'tel:+962797698874',
  whatsappUrl: 'https://wa.me/962797698874',
  email: 'info@jadal.cc',
  website: 'https://jadal.cc',
  socialSecurity: '200152523',
  portal: 'https://jadal.aqssat.co',
  /** قسط موحّد لكل أجهزة الكتالوج — بلا مدة على الواجهة. */
  monthlyInstallmentJod: 10,
  /** ساعات الدوام — Asia/Amman؛ الجمعة مغلق. */
  hours: {
    timeZone: 'Asia/Amman',
    closedWeekdays: ['Fri'] as const,
    startHour: 9,
    endHour: 18,
    daysAr: 'يومياً من السبت إلى الخميس',
    clockAr: 'من الساعة 09:00 صباحاً ولغاية الساعة 06:00 مساءً',
  },
  pay: {
    titleAr: 'سداد الأقساط',
    bodyAr:
      'ادفع قسطك عبر إي فواتيركم، أو راسلنا على واتساب لإعادة الجدولة وحل أي خلاف مالي بطرق ميسّرة.',
    ctaAr: 'تواصل لسداد أو تسوية',
  },
} as const

export const MONTHLY_INSTALLMENT_LABEL = `${COMPANY.monthlyInstallmentJod} د.أ / الشهر`

export type OpenStatus = { open: boolean; label: string }

/** حالة الدوام الآن وفق توقيت عمّان. */
export function storeOpenStatus(now = new Date()): OpenStatus {
  const { timeZone, closedWeekdays, startHour, endHour } = COMPANY.hours
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value)
  if ((closedWeekdays as readonly string[]).includes(weekday) || !Number.isFinite(hour)) {
    return { open: false, label: 'مغلق الآن' }
  }
  const open = hour >= startHour && hour < endHour
  return { open, label: open ? 'مفتوح الآن' : 'مغلق الآن' }
}
