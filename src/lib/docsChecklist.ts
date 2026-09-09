/** بنود توثيق تساعد على تسريع الاعتماد — بلا أسعار وهمية (قسط جدل موحّد). */
export type DocItem = {
  id: string
  label: string
  question: string
  hint?: string
  extra?: boolean
}

export const DOC_ITEMS: DocItem[] = [
  {
    id: 'ss',
    label: 'كشف ضمان',
    question: 'هل لديك كشف ضمان اجتماعي؟',
  },
  {
    id: 'salary',
    label: 'كشف راتب',
    question: 'هل لديك كشف راتب؟',
  },
  {
    id: 'id',
    label: 'هوية سارية',
    question: 'هل هويتك الشخصية سارية؟',
  },
  {
    id: 'crif',
    label: 'تقرير ائتماني',
    question: 'هل لديك تقرير كريڤ أو ما يعادله؟',
    hint: 'يُطلب عند الحاجة بعد الدراسة',
  },
  {
    id: 'guarantor',
    label: 'كفيل',
    question: 'هل تستطيع إضافة كفيل عند الطلب؟',
  },
  {
    id: 'nashama',
    label: 'القوات المسلحة',
    question: 'هل أنت من منتسبي القوات المسلحة؟',
    hint: 'عرض حصري عند الإثبات',
    extra: true,
  },
  {
    id: 'government',
    label: 'موظف حكومي',
    question: 'هل تعمل في دائرة حكومية؟',
    hint: 'قد يسهّل مسار الاعتماد',
    extra: true,
  },
]

export function readinessLabel(selectedCount: number, total = DOC_ITEMS.length): string {
  const ratio = total <= 0 ? 0 : selectedCount / total
  if (ratio >= 0.7) return 'جاهزية عالية — أرسل الطلب الآن'
  if (ratio >= 0.4) return 'جاهزية متوسطة — كمّل الوثائق قبل الزيارة'
  if (selectedCount > 0) return 'بداية جيدة — جهّز باقي الإثباتات'
  return 'اختر ما يتوفر لديك لتقدير جاهزية الطلب'
}
