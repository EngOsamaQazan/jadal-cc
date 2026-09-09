import { MessageCircle, Phone } from 'lucide-react'
import { COMPANY } from '../data/company'
import { newEventId, trackMeta } from '../lib/metaPixel'

export function FloatActions() {
  return (
    <div className="fixed bottom-5 left-4 z-50 flex flex-col gap-2 md:bottom-8 md:left-8">
      <a
        href={COMPANY.callUrl}
        aria-label={`اتصال ${COMPANY.phone}`}
        className="flex size-12 items-center justify-center border-2 border-ink bg-signal text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-0.5 hover:translate-y-0.5"
        onClick={() => trackMeta('Contact', { content_name: 'call_float' }, newEventId())}
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
      <a
        href={COMPANY.whatsappUrl}
        aria-label={`واتساب ${COMPANY.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center border-2 border-ink bg-acid text-ink hard-shadow-ink transition-transform duration-100 hover:translate-x-0.5 hover:translate-y-0.5"
        onClick={() => trackMeta('Contact', { content_name: 'whatsapp_float' }, newEventId())}
      >
        <MessageCircle className="size-5" aria-hidden="true" />
      </a>
    </div>
  )
}
