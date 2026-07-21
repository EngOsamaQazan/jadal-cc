import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoWordmark } from './Logo'

const links = [
  { href: '#why', label: 'لماذا جدل' },
  { href: '#how', label: 'كيف يعمل' },
  { href: '#plans', label: 'خطط الأقساط' },
  { href: '#contact', label: 'تواصل' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 shadow-lg shadow-black/20 md:px-5">
        <LogoWordmark />

        <nav className="hidden items-center gap-8 md:flex" aria-label="القائمة الرئيسية">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://jadal.aqssat.co"
            className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
          >
            دخول النظام
          </a>
          <a
            href="#contact"
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            احسب قسطك
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="glass mt-2 rounded-2xl p-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="قائمة الجوال">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-fg/90 transition-colors hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://jadal.aqssat.co"
              className="mt-2 rounded-xl border border-white/10 px-3 py-3 text-center text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              دخول النظام
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-accent px-3 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              احسب قسطك
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
