import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { availabilityLabel, deviceLabel, type CatalogItem } from '../data/catalog'

function matches(item: CatalogItem, query: string) {
  const parts = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return true
  const hay = [item.title, item.brand, item.model, item.sku, deviceLabel(item), String(item.storageGb ?? ''), item.ramGb]
    .join(' ')
    .toLowerCase()
  return parts.every((part) => hay.includes(part))
}

type Props = {
  catalog: CatalogItem[]
  selectedId: number | null
  onSelect: (id: number | null) => void
  focusNonce?: number
}

export function DevicePicker({ catalog, selectedId, onSelect, focusNonce = 0 }: Props) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const selected = catalog.find((item) => item.id === selectedId) ?? null
  const selectedText = selected ? deviceLabel(selected) : ''

  const options = useMemo(() => {
    const inStock = catalog.filter((item) => item.qty > 0 || item.id === selectedId)
    const filter = open && query === selectedText ? '' : query
    return inStock.filter((item) => matches(item, filter))
  }, [catalog, open, query, selectedId, selectedText])

  useEffect(() => {
    if (selected) setQuery(deviceLabel(selected))
  }, [selectedId, selected])

  useEffect(() => {
    setActive(0)
  }, [query, open])

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [])

  useEffect(() => {
    if (!focusNonce) return
    inputRef.current?.focus()
  }, [focusNonce])

  function pick(item: CatalogItem) {
    onSelect(item.id)
    setQuery(deviceLabel(item))
    setOpen(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => Math.min(i + 1, Math.max(options.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && open && options[active]) {
      e.preventDefault()
      pick(options[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
        <input
          ref={inputRef}
          id="device-picker"
          type="search"
          role="combobox"
          autoComplete="off"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[active] ? `${listId}-${options[active].id}` : undefined}
          placeholder="ابحث واختر جهازاً من المخزون"
          value={query}
          onChange={(e) => {
            const next = e.target.value
            setQuery(next)
            setOpen(true)
            if (selected && next !== deviceLabel(selected)) onSelect(null)
          }}
          onFocus={() => {
            if (!selectedId) setOpen(true)
          }}
          onKeyDown={onKeyDown}
          className="w-full border-2 border-ink bg-paper py-3 pe-10 ps-10 outline-none focus:bg-acid/30"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="عرض الأجهزة المتوفرة"
          className="absolute left-2 top-1/2 -translate-y-1/2 border-2 border-ink p-0.5 hover:bg-acid"
          onClick={() => {
            setOpen((v) => !v)
            inputRef.current?.focus()
          }}
        >
          <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto border-4 border-ink bg-paper shadow-[8px_8px_0_#0a0a0a]"
        >
          {options.length === 0 ? (
            <li className="px-4 py-3 text-sm text-ink/55">لا يوجد جهاز مطابق في المخزون</li>
          ) : (
            options.map((item, index) => {
              const isSelected = item.id === selectedId
              const isActive = index === active
              return (
                <li key={item.id} id={`${listId}-${item.id}`} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => pick(item)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-right ${
                      isActive ? 'bg-acid' : 'hover:bg-acid/40'
                    }`}
                  >
                    <img src={item.image} alt="" className="h-10 w-10 shrink-0 object-contain" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-sm font-extrabold leading-tight">{deviceLabel(item)}</span>
                      <span className="block text-xs text-ink/55">
                        {item.brand} · {availabilityLabel(item.qty)}
                      </span>
                    </span>
                    {isSelected ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      ) : null}
      <input type="hidden" name="device" value={selectedText} />
    </div>
  )
}
