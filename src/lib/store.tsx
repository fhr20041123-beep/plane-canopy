import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { getProduct, unitPrice } from '../data/products'

export interface CartItem {
  key: string
  productId: string
  option?: string
  qty: number
}
export interface Order {
  id: string
  date: string
  items: { productId: string; option?: string; qty: number; price: number }[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  name: string
  address: string
  delivery: string
  payment: string
  status: 'Roasting' | 'Shipped' | 'Delivered'
}
export interface Review {
  id: string
  cafeId: string
  name: string
  rating: number
  text: string
  date: string
}
export interface Comment {
  id: string
  slug: string
  name: string
  text: string
  date: string
}
export interface Letter {
  id: string
  name: string
  text: string
  date: string
}
export interface Profile {
  name: string
  handle: string
  email: string
  bio: string
  district: string
  favDrink: string
  avatar: number
  joined: string
}

interface State {
  signedIn: boolean
  profile: Profile
  cart: CartItem[]
  wishlist: string[]
  savedCafes: string[]
  stamps: string[]
  bookmarks: string[]
  likes: string[]
  orders: Order[]
  reviews: Review[]
  comments: Comment[]
  letters: Letter[]
  pets: number
  newsletter: boolean
  promo: string | null
}

const KEY = 'plane-canopy:v2'
const today = () => new Date().toISOString().slice(0, 10)
const uid = () => Math.random().toString(36).slice(2, 9)

const initial: State = {
  signedIn: false,
  profile: { name: 'Guest Sipper', handle: 'guest', email: '', bio: 'Collecting stamps one flat white at a time.', district: 'Xuhui', favDrink: 'Honey Cappuccino', avatar: 0, joined: today() },
  cart: [],
  wishlist: [],
  savedCafes: [],
  stamps: [],
  bookmarks: [],
  likes: [],
  orders: [],
  reviews: [],
  comments: [],
  letters: [],
  pets: 0,
  newsletter: false,
  promo: null,
}

export const PROMOS: Record<string, number> = { MOCHI10: 0.1, CANOPY20: 0.2 }
export const FREE_SHIPPING = 299
export const deliveryOptions = [
  { id: 'standard', label: 'Standard courier', detail: '2–3 days, SF Express', price: 18 },
  { id: 'express', label: 'Same-day in Shanghai', detail: 'Order before 2 pm', price: 38 },
  { id: 'pickup', label: 'Pick up at a café', detail: 'Free, choose any café on the map', price: 0 },
]

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initial, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return initial
}

type Toast = { id: string; text: string; tone: 'default' | 'lime' }

function useStoreValue() {
  const [s, setS] = useState<State>(load)
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(s))
  }, [s])

  const toast = useCallback((text: string, tone: Toast['tone'] = 'default') => {
    const id = uid()
    setToasts((t) => [...t, { id, text, tone }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const toggle = useCallback(
    (field: 'wishlist' | 'savedCafes' | 'bookmarks' | 'likes', id: string) => {
      const added = !s[field].includes(id)
      setS((p) => ({ ...p, [field]: p[field].includes(id) ? p[field].filter((x) => x !== id) : [...p[field], id] }))
      return added
    },
    [s],
  )

  const addToCart = useCallback(
    (productId: string, option?: string, qty = 1) => {
      const key = `${productId}::${option ?? ''}`
      setS((p) => {
        const found = p.cart.find((c) => c.key === key)
        const cart = found ? p.cart.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c)) : [...p.cart, { key, productId, option, qty }]
        return { ...p, cart }
      })
      const prod = getProduct(productId)
      toast(`Added ${prod?.name ?? 'item'} to your bag`, 'lime')
    },
    [toast],
  )
  const setQty = useCallback((key: string, qty: number) => {
    setS((p) => ({ ...p, cart: qty <= 0 ? p.cart.filter((c) => c.key !== key) : p.cart.map((c) => (c.key === key ? { ...c, qty } : c)) }))
  }, [])
  const removeFromCart = useCallback((key: string) => setS((p) => ({ ...p, cart: p.cart.filter((c) => c.key !== key) })), [])

  const lines = useMemo(
    () =>
      s.cart
        .map((c) => {
          const product = getProduct(c.productId)
          return product ? { ...c, product, price: unitPrice(product, c.option) } : null
        })
        .filter((x): x is NonNullable<typeof x> => !!x),
    [s.cart],
  )
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0)
  const discount = s.promo ? Math.round(subtotal * (PROMOS[s.promo] ?? 0)) : 0
  const count = s.cart.reduce((n, c) => n + c.qty, 0)

  const applyPromo = useCallback((code: string) => {
    const c = code.trim().toUpperCase()
    if (PROMOS[c]) {
      setS((p) => ({ ...p, promo: c }))
      return true
    }
    return false
  }, [])
  const clearPromo = useCallback(() => setS((p) => ({ ...p, promo: null })), [])

  const placeOrder = useCallback(
    (o: Omit<Order, 'id' | 'date' | 'items' | 'subtotal' | 'discount' | 'total' | 'status'>) => {
      const id = `PC-${Date.now().toString().slice(-6)}`
      const order: Order = {
        ...o,
        id,
        date: today(),
        items: lines.map((l) => ({ productId: l.productId, option: l.option, qty: l.qty, price: l.price })),
        subtotal,
        discount,
        total: subtotal - discount + o.shipping,
        status: 'Roasting',
      }
      setS((p) => ({ ...p, orders: [order, ...p.orders], cart: [], promo: null }))
      return id
    },
    [lines, subtotal, discount],
  )

  const stamp = useCallback(
    (cafeId: string) => {
      const fresh = !s.stamps.includes(cafeId)
      setS((p) => (p.stamps.includes(cafeId) ? p : { ...p, stamps: [...p.stamps, cafeId] }))
      return fresh
    },
    [s.stamps],
  )

  const addReview = useCallback((r: Omit<Review, 'id' | 'date'>) => setS((p) => ({ ...p, reviews: [{ ...r, id: uid(), date: today() }, ...p.reviews] })), [])
  const addComment = useCallback((c: Omit<Comment, 'id' | 'date'>) => setS((p) => ({ ...p, comments: [{ ...c, id: uid(), date: today() }, ...p.comments] })), [])
  const addLetter = useCallback((l: Omit<Letter, 'id' | 'date'>) => setS((p) => ({ ...p, letters: [{ ...l, id: uid(), date: today() }, ...p.letters] })), [])
  const pet = useCallback(() => setS((p) => ({ ...p, pets: p.pets + 1 })), [])
  const updateProfile = useCallback((patch: Partial<Profile>) => setS((p) => ({ ...p, profile: { ...p.profile, ...patch } })), [])
  const signIn = useCallback((name: string, email: string) => {
    const handle = name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 14) || 'sipper'
    setS((p) => ({ ...p, signedIn: true, profile: { ...p.profile, name, email, handle, joined: p.signedIn ? p.profile.joined : today() } }))
  }, [])
  const signOut = useCallback(() => setS((p) => ({ ...p, signedIn: false })), [])
  const setNewsletter = useCallback((v: boolean) => setS((p) => ({ ...p, newsletter: v })), [])
  const resetAll = useCallback(() => setS(initial), [])

  return {
    ...s,
    lines,
    subtotal,
    discount,
    count,
    cartOpen,
    setCartOpen,
    toasts,
    toast,
    toggle,
    addToCart,
    setQty,
    removeFromCart,
    applyPromo,
    clearPromo,
    placeOrder,
    stamp,
    addReview,
    addComment,
    addLetter,
    pet,
    updateProfile,
    signIn,
    signOut,
    setNewsletter,
    resetAll,
  }
}

type Store = ReturnType<typeof useStoreValue>
const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreValue()
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be used inside StoreProvider')
  return v
}

/** Fires `cb` once when the element scrolls into view. */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options ?? { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [options])
  return { ref, inView }
}

export const fmt = (n: number) => `¥${n.toLocaleString()}`
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
