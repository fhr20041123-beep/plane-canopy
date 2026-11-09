export type ProductCategory = 'Beans' | 'Apparel' | 'Objects'

export interface Product {
  id: string
  name: string
  cn: string
  kind: string
  category: ProductCategory
  price: number
  tag?: string
  images: string[]
  model?: 'cat-2' | 'cat-3'
  optionLabel?: string
  options?: string[]
  /** Extra cost for options, keyed by option label. */
  optionPrice?: Record<string, number>
  description: string
  details: string[]
  notes?: string[]
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: 'house-blend', name: 'Canopy House Blend', cn: '梧桐拼配', kind: 'Coffee beans · 250 g', category: 'Beans', price: 128, tag: 'Bestseller',
    images: ['1512372388054-a322888e67a6', '1524350876685-274059332603', '1616388761741-a5936c6f61f6'],
    optionLabel: 'Grind', options: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    description: 'Our everyday blend, roasted at Wukang Mansion: Yunnan natural for sweetness, Brazil for body, a splash of Ethiopia for lift. Built for milk drinks, brilliant as espresso.',
    details: ['Roast: medium', 'Origin: Yunnan, Brazil, Ethiopia', 'Roasted to order, ships in 48h', 'Compostable valve bag'],
    notes: ['Milk chocolate', 'Osmanthus', 'Brown sugar'], rating: 4.9, reviews: 312,
  },
  {
    id: 'yunnan-natural', name: 'Yunnan Natural', cn: '云南日晒', kind: 'Single origin · 200 g', category: 'Beans', price: 168, tag: 'Limited',
    images: ['1524350876685-274059332603', '1562051036-e0eea191d42f', '1442512595331-e89e73853f31'],
    optionLabel: 'Grind', options: ['Whole bean', 'Espresso', 'Filter'],
    description: 'The bean from Diary No. 09. A sun-dried Catimor from Pu’er, wild and fruity, roasted light for filter. Only 400 bags this season.',
    details: ['Roast: light', 'Altitude: 1,600 m', 'Process: natural', 'Farm: Manlao River co-op'],
    notes: ['Strawberry', 'Black tea', 'Cacao nib'], rating: 4.8, reviews: 96,
  },
  {
    id: 'drip-bags', name: 'Bund Dawn Drip Bags', cn: '外滩清晨挂耳', kind: 'Single-serve drip', category: 'Beans', price: 88,
    images: ['1562051036-e0eea191d42f', '1522012188892-24beb302783d', '1541469406036-71229832e06e'],
    optionLabel: 'Pack', options: ['10 bags', '20 bags'], optionPrice: { '20 bags': 76 },
    description: 'Pour-over without the kit. Single-serve drip bags of our riverside morning roast, for hotel rooms, offices and 6 am runs.',
    details: ['12 g per bag', 'Medium-light roast', 'Nitrogen-flushed', 'Best within 6 months'],
    notes: ['Hazelnut', 'Red apple'], rating: 4.7, reviews: 204,
  },
  {
    id: 'mochi-figure', name: 'Mochi Vinyl Figure', cn: '麻薯搪胶公仔', kind: 'Collectible · 12 cm', category: 'Objects', price: 239, tag: '3D',
    images: [], model: 'cat-3',
    optionLabel: 'Pose', options: ['Pose 03 · Bean Keeper', 'Pose 02 · Window Watcher'],
    description: 'Mochi, exactly as sculpted for the 3D studio, in soft-touch vinyl. Spin it right here before you buy. Each figure ships with a numbered café passport.',
    details: ['Soft-touch vinyl, hand-painted', 'Height 12 cm', 'Numbered passport card', 'Ages 14+'], rating: 5, reviews: 58,
  },
  {
    id: 'leather-apron', name: 'Barista Leather Apron', cn: '咖啡师皮围裙', kind: 'Full-grain leather', category: 'Apparel', price: 680, tag: 'Handmade',
    images: ['1755924648847-f733ed2818c8', '1583165278997-0250ea5d72e2', '1558416165-5fb04b79b0e7'],
    optionLabel: 'Colour', options: ['Espresso brown', 'Tangerine strap'],
    description: 'Cut and stitched in a Changning workshop from vegetable-tanned leather. Cross-back straps, a towel loop and a pocket sized for a tamper.',
    details: ['Vegetable-tanned leather', 'Brass hardware', 'Adjustable cross-back', 'Ages beautifully'], rating: 4.8, reviews: 41,
  },
  {
    id: 'canopy-runner', name: 'Canopy Runner 01', cn: '梧桐跑鞋 01', kind: 'Streetwear sneaker', category: 'Apparel', price: 1290, tag: 'New',
    images: ['1600185365926-3a2ce3cdb9eb', '1560769629-975ec94e6a86', '1600185365483-26d7a4cc7519'],
    optionLabel: 'Size (EU)', options: ['38', '39', '40', '41', '42', '43', '44'],
    description: 'A city runner for café hopping: cushioned for twenty-thousand-step days, tangerine heel tab, and a tiny Mochi paw debossed under the tongue.',
    details: ['Recycled mesh upper', 'EVA midsole', 'Rubber outsole', 'Ships in a coffee-sack bag'], rating: 4.6, reviews: 77,
  },
  {
    id: 'lane-plimsoll', name: 'Lane Plimsoll', cn: '弄堂帆布鞋', kind: 'Canvas sneaker', category: 'Apparel', price: 560,
    images: ['1525966222134-fcfa99b8ae77', '1560769629-975ec94e6a86'],
    optionLabel: 'Size (EU)', options: ['37', '38', '39', '40', '41', '42', '43'],
    description: 'A vintage-cut plimsoll in espresso-dyed canvas. Made for lane-house stairs and long Sunday walks.',
    details: ['Organic cotton canvas', 'Vulcanised sole', 'Latte-gold eyelets'], rating: 4.5, reviews: 63,
  },
  {
    id: 'siamese-mug', name: 'Siamese Mug', cn: '暹罗马克杯', kind: 'Stoneware · 300 ml', category: 'Objects', price: 98,
    images: ['1520485521983-bfaa0bc6c80e', '1650959858546-d09833d5317b', '1643946404043-178456b0e3f8'],
    optionLabel: 'Glaze', options: ['Cream & cocoa', 'Tangerine dip'],
    description: 'Cream glaze with a chocolate-brown dipped rim, just like Mochi’s ears. Thrown in Jingdezhen by the same studio that makes Lane 210’s cups.',
    details: ['Stoneware', 'Dishwasher safe', 'Each one slightly different'], rating: 4.9, reviews: 145,
  },
  {
    id: 'map-tote', name: 'Art Map Tote', cn: '咖啡地图帆布袋', kind: 'Heavy canvas', category: 'Objects', price: 148,
    images: ['1544816155-12df9643f363', '1574365569389-a10d488ca3fb', '1630381260512-e3fe55c11973'],
    description: 'The Plane Canopy art map, screen-printed in tangerine and lime on heavy natural canvas. Fits a laptop, two bags of beans and a cat-sized nap.',
    details: ['16 oz cotton canvas', 'Screen-printed in Shanghai', 'Inner pocket'], rating: 4.7, reviews: 88,
  },
]

export const getProduct = (id?: string) => products.find((p) => p.id === id)
export const productCategories: ProductCategory[] = ['Beans', 'Apparel', 'Objects']
export const unitPrice = (p: Product, option?: string) => p.price + (option && p.optionPrice?.[option] ? p.optionPrice[option] : 0)
