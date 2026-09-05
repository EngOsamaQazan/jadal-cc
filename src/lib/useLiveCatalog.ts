import { useEffect, useState } from 'react'
import { CATALOG, enrichStockRow, type CatalogItem, type StockRow } from '../data/catalog'

const POLL_MS = 20_000

function asRows(payload: unknown): StockRow[] {
  if (!payload || typeof payload !== 'object') return []
  const items = (payload as { items?: unknown }).items
  if (!Array.isArray(items)) return []
  return items.flatMap((row) => {
    if (!row || typeof row !== 'object') return []
    const r = row as Record<string, unknown>
    const id = Number(r.id)
    const qty = Number(r.qty)
    if (!Number.isFinite(id) || !Number.isFinite(qty) || qty < 0) return []
    return [
      {
        id,
        name: String(r.name ?? ''),
        sku: String(r.sku ?? ''),
        qty,
      },
    ]
  })
}

export function useLiveCatalog(): CatalogItem[] {
  const [items, setItems] = useState<CatalogItem[]>(CATALOG)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/catalog.json', { cache: 'no-store' })
        if (!res.ok) return
        const rows = asRows(await res.json())
        if (cancelled || rows.length === 0) return
        setItems(rows.map(enrichStockRow))
      } catch {
        /* نُبقي آخر قائمة ناجحة */
      }
    }

    void load()
    const timer = window.setInterval(() => void load(), POLL_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  return items
}
