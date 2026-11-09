import { createBrowserRouter } from 'react-router'
import { Root } from '../components/layout/Root'
import { Home } from '../pages/Home'
import { MapPage } from '../pages/MapPage'
import { CafeDetail } from '../pages/CafeDetail'
import { Culture } from '../pages/Culture'
import { Article } from '../pages/Article'
import { Diary } from '../pages/Diary'
import { MochiStudio } from '../pages/MochiStudio'
import { Shop } from '../pages/Shop'
import { ProductDetail } from '../pages/ProductDetail'
import { Cart } from '../pages/Cart'
import { Checkout } from '../pages/Checkout'
import { OrderDone } from '../pages/OrderDone'
import { Profile } from '../pages/Profile'
import { NotFound } from '../pages/NotFound'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: 'map', Component: MapPage },
        { path: 'cafe/:id', Component: CafeDetail },
        { path: 'culture', Component: Culture },
        { path: 'article/:slug', Component: Article },
        { path: 'diary', Component: Diary },
        { path: 'mochi', Component: MochiStudio },
        { path: 'shop', Component: Shop },
        { path: 'product/:id', Component: ProductDetail },
        { path: 'cart', Component: Cart },
        { path: 'checkout', Component: Checkout },
        { path: 'order/:id', Component: OrderDone },
        { path: 'profile', Component: Profile },
        { path: '*', Component: NotFound },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)
