/** صف حي من تيسير (بدون سعر). المواصفات والصورة تُكمَّل محلياً. */
export type StockRow = {
  id: number
  name: string
  sku: string
  qty: number
}

/**
 * لقطة احتياطية إن تعذّر جلب المخزون الحي.
 * المصدر: inventory_items + inventory_item_quantities.
 */
export type CatalogItem = {
  id: number
  sku: string
  brand: string
  model: string
  title: string
  storageGb: number | null
  ramGb: string
  qty: number
  image: string
  display: string
  battery: string
  camera: string
  os: string
}

export function availabilityLabel(qty: number): string {
  if (qty <= 0) return 'غير متوفر'
  if (qty === 1) return 'قطعة'
  if (qty === 2) return 'قطعتين'
  if (qty === 3) return 'آخر ثلاث قطع'
  return 'متوفر'
}

export function deviceLabel(item: CatalogItem): string {
  if (item.storageGb) return `${item.title} ${item.storageGb}/${item.ramGb}`
  return item.title
}

function norm(value: string) {
  return value.toLowerCase().replace(/\\/g, '/').replace(/\s+/g, ' ').trim()
}

function parseStorageRam(name: string): { storageGb: number | null; ramGb: string } {
  const compact = name.replace(/\s+/g, ' ')
  const combo = compact.match(/(\d+)\s*\/\s*(\d+(?:\+\d+)?)/)
  if (combo) return { storageGb: Number(combo[1]), ramGb: combo[2] }
  const gb = compact.match(/(\d+)\s*GB/i)
  const ram = compact.match(/(\d+)\s*\+\s*(\d+)/)
  return {
    storageGb: gb ? Number(gb[1]) : null,
    ramGb: ram ? `${ram[1]}+${ram[2]}` : '—',
  }
}

function guessBrandModel(name: string): Pick<CatalogItem, 'brand' | 'model' | 'title' | 'image' | 'display' | 'battery' | 'camera' | 'os'> {
  const n = norm(name)
  if (n.includes('a07') || n.includes('samsung')) {
    return {
      brand: 'Samsung',
      model: 'Galaxy A07',
      title: 'سامسونج جالاكسي A07',
      image: '/devices/samsung-a07.jpg',
      display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
      battery: '٥٠٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
      os: 'Android / One UI',
    }
  }
  if (n.includes('smart 20') || n.includes('smart20')) {
    return {
      brand: 'Infinix',
      model: 'Smart 20',
      title: 'إنفينكس سمارت 20',
      image: '/devices/infinix-smart-20.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: 'كاميرا خلفية أساسية',
      os: 'XOS / Android',
    }
  }
  if (n.includes('smart10 plus') || n.includes('smart 10 plus') || n.includes('smart 10 بلس')) {
    return {
      brand: 'Infinix',
      model: 'Smart 10 Plus',
      title: 'إنفينكس سمارت 10 بلس',
      image: '/devices/infinix-smart-10.jpg',
      display: '٦٫٧ بوصة',
      battery: '٦٠٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'XOS / Android',
    }
  }
  if (n.includes('smart10') || n.includes('smart 10')) {
    return {
      brand: 'Infinix',
      model: 'Smart 10',
      title: 'إنفينكس سمارت 10',
      image: '/devices/infinix-smart-10.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: 'كاميرا خلفية أساسية',
      os: 'XOS / Android',
    }
  }
  if (n.includes('spark go') || n.includes('spark go 3')) {
    return {
      brand: 'Tecno',
      model: 'Spark Go 3',
      title: 'تكو سبارك Go 3',
      image: '/devices/tecno-spark-go-3.jpg',
      display: '٦٫٦ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: '١٣ ميجابكسل',
      os: 'HiOS / Android',
    }
  }
  if (n.includes('40c')) {
    return {
      brand: 'Tecno',
      model: 'Spark 40C',
      title: 'تكو سبارك 40C',
      image: '/devices/tecno-spark-40c.jpg',
      display: '٦٫٦ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'HiOS / Android',
    }
  }
  if (n.includes('x5b')) {
    return {
      brand: 'Honor',
      model: 'X5b Plus',
      title: 'هونر X5b Plus',
      image: '/devices/honor-x5b-plus.jpg',
      display: '٦٫٥٦ بوصة',
      battery: '٥٢٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'MagicOS / Android',
    }
  }
  if (n.includes('x5c plus')) {
    return {
      brand: 'Honor',
      model: 'X5c Plus',
      title: 'هونر X5c Plus',
      image: '/devices/honor-x5c.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٢٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'MagicOS / Android',
    }
  }
  if (n.includes('x5c')) {
    return {
      brand: 'Honor',
      model: 'X5c',
      title: 'هونر X5c',
      image: '/devices/honor-x5c.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٢٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'MagicOS / Android',
    }
  }
  if (n.includes('note 60') || n.includes('60x')) {
    return {
      brand: 'realme',
      model: 'Note 60x',
      title: 'ريلمي نوت 60x',
      image: '/devices/realme-note-60.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: '١٣ ميجابكسل',
      os: 'realme UI / Android',
    }
  }
  if (n.includes('a7')) {
    return {
      brand: 'Xiaomi',
      model: 'Redmi A7 Pro',
      title: 'ريدمي A7 برو',
      image: '/devices/redmi-a7-pro.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: 'كاميرا خلفية أساسية',
      os: 'HyperOS / Android',
    }
  }
  if (n.includes('15c')) {
    return {
      brand: 'Xiaomi',
      model: 'Redmi 15C',
      title: 'ريدمي 15C',
      image: '/devices/redmi-15c.jpg',
      display: '٦٫٧ بوصة',
      battery: '٦٠٠٠ مللي أمبير',
      camera: '٥٠ ميجابكسل',
      os: 'HyperOS / Android',
    }
  }
  if (n.includes('a5') || n.includes('ridmi a5')) {
    return {
      brand: 'Xiaomi',
      model: 'Redmi A5',
      title: 'ريدمي A5',
      image: '/devices/redmi-a5.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥١٦٠ مللي أمبير',
      camera: '٣٢ ميجابكسل',
      os: 'HyperOS / Android',
    }
  }
  if (n.includes('a3')) {
    return {
      brand: 'Xiaomi',
      model: 'Redmi A3',
      title: 'ريدمي A3',
      image: '/devices/redmi-a3.jpg',
      display: '٦٫٧ بوصة',
      battery: '٥٠٠٠ مللي أمبير',
      camera: '٨ ميجابكسل',
      os: 'Android Go / HyperOS',
    }
  }
  return {
    brand: 'جدل',
    model: name,
    title: name,
    image: '/devices/samsung-a07.jpg',
    display: '—',
    battery: '—',
    camera: '—',
    os: 'Android',
  }
}

export function enrichStockRow(row: StockRow): CatalogItem {
  const known = CATALOG.find((item) => item.id === row.id)
  const parsed = parseStorageRam(row.name || row.sku)
  const guessed = guessBrandModel(row.name || row.sku)
  if (known) {
    return {
      ...known,
      sku: row.sku || known.sku,
      qty: row.qty,
      storageGb: parsed.storageGb ?? known.storageGb,
      ramGb: parsed.ramGb !== '—' ? parsed.ramGb : known.ramGb,
    }
  }
  return {
    id: row.id,
    sku: row.sku || row.name,
    qty: row.qty,
    storageGb: parsed.storageGb,
    ramGb: parsed.ramGb,
    ...guessed,
    title: guessed.title === guessed.model ? row.name : guessed.title,
  }
}

export const CATALOG: CatalogItem[] = [
  {
    id: 500000029,
    sku: 'samsung A07 128/4',
    brand: 'Samsung',
    model: 'Galaxy A07',
    title: 'سامسونج جالاكسي A07',
    storageGb: 128,
    ramGb: '4',
    qty: 38,
    image: '/devices/samsung-a07.jpg',
    display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
    os: 'Android / One UI',
  },
  {
    id: 100000132,
    sku: 'INFINIX SMART 20 64/4+4',
    brand: 'Infinix',
    model: 'Smart 20',
    title: 'إنفينكس سمارت 20',
    storageGb: 64,
    ramGb: '4+4',
    qty: 37,
    image: '/devices/infinix-smart-20.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: 'كاميرا خلفية أساسية',
    os: 'XOS / Android',
  },
  {
    id: 100000105,
    sku: 'TECNO SPARK GO 3 64/4+4',
    brand: 'Tecno',
    model: 'Spark Go 3',
    title: 'تكو سبارك Go 3',
    storageGb: 64,
    ramGb: '4+4',
    qty: 34,
    image: '/devices/tecno-spark-go-3.jpg',
    display: '٦٫٦ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '١٣ ميجابكسل',
    os: 'HiOS / Android',
  },
  {
    id: 100000104,
    sku: 'TECNO SPARK GO 3 128/4+4',
    brand: 'Tecno',
    model: 'Spark Go 3',
    title: 'تكو سبارك Go 3',
    storageGb: 128,
    ramGb: '4+4',
    qty: 33,
    image: '/devices/tecno-spark-go-3.jpg',
    display: '٦٫٦ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '١٣ ميجابكسل',
    os: 'HiOS / Android',
  },
  {
    id: 100000131,
    sku: 'HONOR X5b PLUS 128/4+4',
    brand: 'Honor',
    model: 'X5b Plus',
    title: 'هونر X5b Plus',
    storageGb: 128,
    ramGb: '4+4',
    qty: 28,
    image: '/devices/honor-x5b-plus.jpg',
    display: '٦٫٥٦ بوصة',
    battery: '٥٢٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'MagicOS / Android',
  },
  {
    id: 100000100,
    sku: 'SAMSUNG A07 128GB 6 GB',
    brand: 'Samsung',
    model: 'Galaxy A07',
    title: 'سامسونج جالاكسي A07',
    storageGb: 128,
    ramGb: '6',
    qty: 26,
    image: '/devices/samsung-a07.jpg',
    display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
    os: 'Android / One UI',
  },
  {
    id: 500000028,
    sku: 'samsung A07 64/4',
    brand: 'Samsung',
    model: 'Galaxy A07',
    title: 'سامسونج جالاكسي A07',
    storageGb: 64,
    ramGb: '4',
    qty: 25,
    image: '/devices/samsung-a07.jpg',
    display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
    os: 'Android / One UI',
  },
  {
    id: 100000106,
    sku: 'infinix smart10 128GB',
    brand: 'Infinix',
    model: 'Smart 10',
    title: 'إنفينكس سمارت 10',
    storageGb: 128,
    ramGb: '4',
    qty: 23,
    image: '/devices/infinix-smart-10.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: 'كاميرا خلفية أساسية',
    os: 'XOS / Android',
  },
  {
    id: 100000099,
    sku: 'SAMSUNG A07 128GB 4 GB',
    brand: 'Samsung',
    model: 'Galaxy A07',
    title: 'سامسونج جالاكسي A07',
    storageGb: 128,
    ramGb: '4',
    qty: 22,
    image: '/devices/samsung-a07.jpg',
    display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
    os: 'Android / One UI',
  },
  {
    id: 100000109,
    sku: 'tecno 40c 256/8+8',
    brand: 'Tecno',
    model: 'Spark 40C',
    title: 'تكو سبارك 40C',
    storageGb: 256,
    ramGb: '8+8',
    qty: 21,
    image: '/devices/tecno-spark-40c.jpg',
    display: '٦٫٦ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'HiOS / Android',
  },
  {
    id: 100000130,
    sku: 'realme Note 60x 64/3',
    brand: 'realme',
    model: 'Note 60x',
    title: 'ريلمي نوت 60x',
    storageGb: 64,
    ramGb: '3',
    qty: 19,
    image: '/devices/realme-note-60.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '١٣ ميجابكسل',
    os: 'realme UI / Android',
  },
  {
    id: 100000108,
    sku: 'infinix smart10 Plus',
    brand: 'Infinix',
    model: 'Smart 10 Plus',
    title: 'إنفينكس سمارت 10 بلس',
    storageGb: 128,
    ramGb: '4+4',
    qty: 14,
    image: '/devices/infinix-smart-10.jpg',
    display: '٦٫٧ بوصة',
    battery: '٦٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'XOS / Android',
  },
  {
    id: 100000101,
    sku: 'SAMSUNG A07 64GB 4GB',
    brand: 'Samsung',
    model: 'Galaxy A07',
    title: 'سامسونج جالاكسي A07',
    storageGb: 64,
    ramGb: '4',
    qty: 13,
    image: '/devices/samsung-a07.jpg',
    display: '٦٫٧ بوصة PLS LCD، ٩٠ هرتز',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل + ٢ ميجابكسل · أمامية ٨',
    os: 'Android / One UI',
  },
  {
    id: 100000127,
    sku: 'RIDMI A5 128/4',
    brand: 'Xiaomi',
    model: 'Redmi A5',
    title: 'ريدمي A5',
    storageGb: 128,
    ramGb: '4',
    qty: 12,
    image: '/devices/redmi-a5.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥١٦٠ مللي أمبير',
    camera: '٣٢ ميجابكسل',
    os: 'HyperOS / Android',
  },
  {
    id: 100000133,
    sku: 'INFINIX SMART 20 128/4+4',
    brand: 'Infinix',
    model: 'Smart 20',
    title: 'إنفينكس سمارت 20',
    storageGb: 128,
    ramGb: '4+4',
    qty: 10,
    image: '/devices/infinix-smart-20.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: 'كاميرا خلفية أساسية',
    os: 'XOS / Android',
  },
  {
    id: 500000032,
    sku: 'MI A7 pro 64/4+4',
    brand: 'Xiaomi',
    model: 'Redmi A7 Pro',
    title: 'ريدمي A7 برو',
    storageGb: 64,
    ramGb: '4+4',
    qty: 10,
    image: '/devices/redmi-a7-pro.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: 'كاميرا خلفية أساسية',
    os: 'HyperOS / Android',
  },
  {
    id: 500000033,
    sku: 'INFINIX SMART 10 PLUS 128/4+4',
    brand: 'Infinix',
    model: 'Smart 10 Plus',
    title: 'إنفينكس سمارت 10 بلس',
    storageGb: 128,
    ramGb: '4+4',
    qty: 10,
    image: '/devices/infinix-smart-10.jpg',
    display: '٦٫٧ بوصة',
    battery: '٦٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'XOS / Android',
  },
  {
    id: 100000094,
    sku: 'HONOR X5c plus',
    brand: 'Honor',
    model: 'X5c Plus',
    title: 'هونر X5c Plus',
    storageGb: 128,
    ramGb: '4+4',
    qty: 9,
    image: '/devices/honor-x5c.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٢٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'MagicOS / Android',
  },
  {
    id: 100000126,
    sku: 'RIDMI 15C 128/4',
    brand: 'Xiaomi',
    model: 'Redmi 15C',
    title: 'ريدمي 15C',
    storageGb: 128,
    ramGb: '4',
    qty: 9,
    image: '/devices/redmi-15c.jpg',
    display: '٦٫٧ بوصة',
    battery: '٦٠٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'HyperOS / Android',
  },
  {
    id: 100000134,
    sku: 'Redmi A3 128/4',
    brand: 'Xiaomi',
    model: 'Redmi A3',
    title: 'ريدمي A3',
    storageGb: 128,
    ramGb: '4',
    qty: 3,
    image: '/devices/redmi-a3.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٠٠٠ مللي أمبير',
    camera: '٨ ميجابكسل',
    os: 'Android Go / HyperOS',
  },
  {
    id: 100000135,
    sku: 'HONOR X5C 64/4+4',
    brand: 'Honor',
    model: 'X5c',
    title: 'هونر X5c',
    storageGb: 64,
    ramGb: '4+4',
    qty: 3,
    image: '/devices/honor-x5c.jpg',
    display: '٦٫٧ بوصة',
    battery: '٥٢٠٠ مللي أمبير',
    camera: '٥٠ ميجابكسل',
    os: 'MagicOS / Android',
  },
]

export const CATALOG_QTY = CATALOG.reduce((n, i) => n + i.qty, 0)
