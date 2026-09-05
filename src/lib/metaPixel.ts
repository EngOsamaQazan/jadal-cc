declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

/** مجموعة بيانات Jadal Business في مدير الأحداث — المعرف عام. */
export const META_PIXEL_ID =
  ((import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || '1091061003303622')

export function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function installMetaPixel(): void {
  if (!META_PIXEL_ID || typeof window === 'undefined') return
  if (typeof window.fbq === 'function') return

  const stub = function (...args: unknown[]) {
    const fn = stub as unknown as {
      callMethod?: (...a: unknown[]) => void
      queue: unknown[]
    }
    if (fn.callMethod) fn.callMethod(...args)
    else fn.queue.push(args)
  }
  const fbq = stub as typeof stub & {
    queue: unknown[]
    loaded: boolean
    version: string
    push: unknown
  }
  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  window.fbq('init', META_PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function trackMeta(
  event: 'ViewContent' | 'Lead' | 'CompleteRegistration' | 'Contact',
  params: Record<string, unknown>,
  eventId: string,
): void {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
  window.fbq('track', event, params, { eventID: eventId })
}

export function applyQueryWithUtm(id: string, token: string): string {
  const params = new URLSearchParams(window.location.search)
  params.set('id', id)
  params.set('t', token)
  const keep = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']
  const next = new URLSearchParams()
  next.set('id', id)
  next.set('t', token)
  for (const key of keep) {
    const value = params.get(key)
    if (value) next.set(key, value)
  }
  return `/apply?${next.toString()}`
}
