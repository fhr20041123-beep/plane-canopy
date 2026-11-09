export type Category = 'History' | 'Modern Art' | 'Cozy Alleys'

export interface MenuItem {
  name: string
  price: number
  note?: string
  mochi?: boolean
}

export interface Cafe {
  id: string
  name: string
  cn: string
  district: string
  address: string
  category: Category
  x: number
  y: number
  signature: string
  hours: string
  price: string
  rating: number
  note: string
  hero: string
  gallery: string[]
  about: string[]
  menu: MenuItem[]
  features: string[]
  mochiTip: string
  since: number
}

export const categoryColor: Record<Category, string> = {
  History: '#c9a27a',
  'Modern Art': '#c6ff3d',
  'Cozy Alleys': '#ffa45c',
}

export const cafes: Cafe[] = [
  {
    id: 'wukang', name: 'Wukang Mansion Roastery', cn: '武康大楼烘焙所', district: 'Former French Concession', address: '1842 Huaihai Middle Rd, Xuhui', category: 'History', x: 228, y: 330,
    signature: 'Flat white, house blend', hours: '8:00 – 20:00', price: '¥¥', rating: 4.8, note: 'Under the flatiron of 1924, a slow-roast bar.',
    hero: '1633944241961-e511ab23455f', gallery: ['1621343607959-5d11ff0f1e39', '1595928642581-f50f4f3453a5', '1579970191855-a56029032cb5'],
    about: [
      'Tucked into the ground floor of the Normandie Apartments, the roastery sits where six roads meet and a century of Shanghai walks past the glass. The 1924 flatiron above it was built by László Hudec; the roaster below runs a 5-kilo Probat that has been rebuilt twice.',
      'Mornings belong to regulars ordering flat whites from memory. Afternoons fill with photographers who came for the building and stayed for the Ethiopian washed on the slow bar. Sit at the curved counter and you can watch the roast curve on a small brass screen.',
    ],
    menu: [
      { name: 'Flat White', price: 38, note: 'House blend, whole milk', mochi: true },
      { name: 'Hudec Espresso', price: 28, note: 'Single origin, rotating' },
      { name: 'Slow Bar Pour-over', price: 48, note: 'Ethiopia Guji, washed' },
      { name: 'Osmanthus Cold Brew', price: 42 },
      { name: 'Butter Croissant', price: 22 },
    ],
    features: ['Wi-Fi', 'Roastery tours', 'Window counter', 'Card & Alipay'],
    mochiTip: 'Ask for the corner stool at 4 pm. The light through the curved window turns your crema gold.', since: 2016,
  },
  {
    id: 'bund', name: 'Salon 1921', cn: '外滩一九二一沙龙', district: 'The Bund', address: '3F, 27 Zhongshan East 1st Rd, Huangpu', category: 'History', x: 452, y: 262,
    signature: 'Viennese mélange', hours: '9:00 – 22:00', price: '¥¥¥', rating: 4.7, note: 'Brass, marble, and a river view of Pudong.',
    hero: '1572982270699-473dfa34d7e7', gallery: ['1727478431214-67846b1d62be', '1558416165-5fb04b79b0e7', '1691067987594-b1b7f84ba55a'],
    about: [
      'A former trading-house reading room, restored down to the brass reading lamps. Salon 1921 serves coffee the way the concession salons did: on silver trays, with a glass of water and a small square of chocolate.',
      'Book a window table at dusk to watch the Pudong towers switch on one by one across the Huangpu. The Viennese mélange comes with whipped cream piped by hand and a dusting of cocoa in the shape of the café’s monogram.',
    ],
    menu: [
      { name: 'Viennese Mélange', price: 58, mochi: true },
      { name: 'Einspänner', price: 56 },
      { name: 'Café Liégeois', price: 62 },
      { name: 'Sachertorte', price: 48 },
      { name: 'Afternoon Set for Two', price: 298, note: '15:00 – 17:30' },
    ],
    features: ['River view', 'Reservations', 'Live piano Fri', 'Smart-casual'],
    mochiTip: 'The piano player takes requests on Fridays. Mochi always asks for “Rose, Rose, I Love You”.', since: 2019,
  },
  {
    id: 'columbia', name: 'Columbia Circle Kiosk', cn: '上生新所咖啡亭', district: 'Changning', address: '1262 Yan’an West Rd, Changning', category: 'History', x: 118, y: 296,
    signature: 'Cortado, oat', hours: '8:30 – 19:00', price: '¥¥', rating: 4.6, note: 'A 1920s country club turned design quarter.',
    hero: '1735970378545-6cdd2718958d', gallery: ['1625225314254-6ddc29a3dd56', '1522012188892-24beb302783d', '1622529975159-39b50c42e5f9'],
    about: [
      'The old Columbia Country Club once had the city’s most glamorous swimming pool. Today the pool is still there, tiled in Spanish blue, and the kiosk beside it pours some of the best milk drinks in Changning.',
      'Bring a book, claim a lounger and order a cortado with oat milk. Weekend mornings bring a small market of ceramicists and flower sellers to the lawn.',
    ],
    menu: [
      { name: 'Oat Cortado', price: 34, mochi: true },
      { name: 'Poolside Tonic', price: 38, note: 'Espresso, tonic, grapefruit' },
      { name: 'Batch Brew', price: 22 },
      { name: 'Basque Cheesecake', price: 36 },
    ],
    features: ['Outdoor seats', 'Pets welcome', 'Weekend market', 'Pool view'],
    mochiTip: 'Mochi refuses to sit near the pool. Grab the bench under the camphor tree instead.', since: 2020,
  },
  {
    id: 'hongkou', name: 'Shikumen Brew', cn: '石库门咖啡', district: 'Hongkou', address: 'Lane 85, Duolun Rd, Hongkou', category: 'History', x: 372, y: 132,
    signature: 'Osmanthus latte', hours: '10:00 – 21:00', price: '¥', rating: 4.5, note: 'Stone-gate lane houses, old jazz records.',
    hero: '1511081692775-05d0f180a065', gallery: ['1501339847302-ac426a4a7cbb', '1585279463840-7169ec480e43', '1792655421196-1dbf8d3e4773'],
    about: [
      'Behind a black-lacquered stone gate on Duolun Road, three generations of one family run a café in the front room of their shikumen house. Grandfather picks the records; granddaughter roasts.',
      'The osmanthus latte uses blossoms dried on the rooftop each autumn. Prices are kind, the sofas are deep, and there is always someone playing xiangqi in the courtyard.',
    ],
    menu: [
      { name: 'Osmanthus Latte', price: 30, mochi: true },
      { name: 'Black Sesame Mocha', price: 32 },
      { name: 'Hand-drip, Yunnan', price: 28 },
      { name: 'Scallion Scone', price: 16 },
    ],
    features: ['Vinyl corner', 'Courtyard', 'Cash & WeChat', 'Family-run'],
    mochiTip: 'Say hi to Grandpa Lu. If he likes you, he plays Zhou Xuan.', since: 2012,
  },
  {
    id: 'm50', name: 'M50 Gallery Espresso', cn: 'M50 画廊浓缩', district: 'Putuo', address: '50 Moganshan Rd, Putuo', category: 'Modern Art', x: 262, y: 186,
    signature: 'Espresso tonic', hours: '10:00 – 19:00', price: '¥¥', rating: 4.7, note: 'Inside a former textile mill on Suzhou Creek.',
    hero: '1740416307504-11b1565d53df', gallery: ['1647792845543-a8032c59cbdf', '1616388761741-a5936c6f61f6', '1767294274414-5e1e6c3974e9'],
    about: [
      'The mill closed in 1999; the artists moved in in 2000. The espresso bar arrived later, in a loading bay between two studios, with a Slayer machine and a rotating wall where resident painters hang one work a month.',
      'Espresso tonics come garnished with whatever is in season, and every cup is served on a ceramic saucer made by the potter on the second floor.',
    ],
    menu: [
      { name: 'Espresso Tonic', price: 36, mochi: true },
      { name: 'Gibraltar', price: 32 },
      { name: 'Artist’s Choice Filter', price: 42 },
      { name: 'Sesame Financier', price: 18 },
    ],
    features: ['Gallery wall', 'Studio visits', 'Wi-Fi', 'Loading-bay terrace'],
    mochiTip: 'The second-floor potter sells seconds on Saturdays. Mochi owns three.', since: 2014,
  },
  {
    id: 'westbund', name: 'West Bund Museum Café', cn: '西岸美术馆咖啡', district: 'Xuhui Riverside', address: '2600 Longteng Ave, Xuhui', category: 'Modern Art', x: 352, y: 470,
    signature: 'Cold brew, single origin', hours: '10:00 – 18:00', price: '¥¥', rating: 4.8, note: 'Concrete, light, and a Pompidou view.',
    hero: '1762928289094-197055a5d5c3', gallery: ['1549791084-5f78368b208b', '1743511738166-fc0ef2010c14', '1442512595331-e89e73853f31'],
    about: [
      'A white cube with the river on one side and a decommissioned coal hopper on the other. The café is designed by the same studio as the museum and feels like part of the exhibition.',
      'The cold brew is steeped for eighteen hours and poured over a single clear ice sphere. Skateboarders, curators and runners share the long riverside bench outside.',
    ],
    menu: [
      { name: 'Sphere Cold Brew', price: 40, mochi: true },
      { name: 'Museum Latte', price: 36 },
      { name: 'Seasonal Filter', price: 45 },
      { name: 'Exhibition Cookie', price: 20, note: 'Changes with each show' },
    ],
    features: ['Riverside', 'Bike parking', 'Exhibition tie-ins', 'Step-free'],
    mochiTip: 'Come on a weekday morning: the river light is unreal and the queue is zero.', since: 2019,
  },
  {
    id: 'pudong', name: 'Glasshouse Pudong', cn: '陆家嘴玻璃屋', district: 'Lujiazui', address: '58F, 501 Yincheng Middle Rd, Pudong', category: 'Modern Art', x: 586, y: 232,
    signature: 'Dirty, 18 g double', hours: '7:30 – 21:00', price: '¥¥¥', rating: 4.4, note: 'Fifty-eight floors up, a gallery that pours.',
    hero: '1694760634487-196ef5794485', gallery: ['1555849554-f9e018963b90', '1583165278997-0250ea5d72e2', '1531969112524-ac37343c7941'],
    about: [
      'Glasshouse occupies a sky lobby, floating between the city’s three tallest towers. Light installations by young Shanghai artists rotate quarterly across the ceiling.',
      'Order the Dirty: cold milk, a hot 18-gram double poured on top, served in a glass so you can see the layers bleed. Then go stand at the window and find the Bund.',
    ],
    menu: [
      { name: 'Dirty', price: 48, mochi: true },
      { name: 'Sky Americano', price: 42 },
      { name: 'Yuzu Espresso Soda', price: 52 },
      { name: 'Matcha Tiramisu', price: 58 },
    ],
    features: ['Skyline view', 'Light art', 'Laptop-friendly', 'Early opening'],
    mochiTip: 'Bring a jacket. Mochi says the air-con is set to “Arctic penguin”.', since: 2021,
  },
  {
    id: 'anfu', name: 'Anfu Window Bar', cn: '安福路窗口咖啡', district: 'Xuhui', address: '322 Anfu Rd, Xuhui', category: 'Cozy Alleys', x: 176, y: 368,
    signature: 'Honey cappuccino', hours: '8:00 – 18:00', price: '¥', rating: 4.9, note: 'A hatch in a plane-tree lane. Mochi naps here.',
    hero: '1551887196-72e32bfc7bf3', gallery: ['1579341560277-4dfaddaf6e98', '1506188044630-210826194885', '1584752290494-fe293df1299a'],
    about: [
      'Not a café so much as a window: a single hatch cut into a 1930s garden wall, a two-group machine and a row of tiny stools on the pavement under the plane trees.',
      'The honey cappuccino is the reason people queue. The reason they stay is the stoop culture: neighbours, dogs, the occasional famous actor, everyone shoulder to shoulder on the curb.',
    ],
    menu: [
      { name: 'Honey Cappuccino', price: 26, mochi: true },
      { name: 'Window Espresso', price: 18 },
      { name: 'Iced Coconut Latte', price: 30 },
      { name: 'Egg Tart', price: 10 },
    ],
    features: ['Takeaway hatch', 'Dog-friendly', 'Pavement stools', 'Mochi’s nap spot'],
    mochiTip: 'This is Mochi’s home window. Order a honey cap and look for a cream cat on the sill.', since: 2017,
  },
  {
    id: 'tianzifang', name: 'Lane 210 Coffee', cn: '田子坊二一〇巷', district: 'Tianzifang', address: 'Lane 210, Taikang Rd, Huangpu', category: 'Cozy Alleys', x: 320, y: 396,
    signature: 'Brown sugar latte', hours: '9:00 – 22:00', price: '¥', rating: 4.6, note: 'Five stools, twisting alleys, handmade cups.',
    hero: '1469631423273-6995642a6a40', gallery: ['1645677020082-721a854c24f2', '1619860703338-9c70a1af6a63', '1675780213216-2c01dbfb45c5'],
    about: [
      'In the deepest fold of the Tianzifang maze there is a staircase, and at the top of the staircase there are five stools. That is the whole café, and it is perfect.',
      'The brown sugar latte is made with sugar caramelised to order on a tiny burner. Cups are thrown by the owner’s sister in Jingdezhen.',
    ],
    menu: [
      { name: 'Brown Sugar Latte', price: 28, mochi: true },
      { name: 'Dirty Chai', price: 30 },
      { name: 'Piccolo', price: 24 },
      { name: 'Mung Bean Cake', price: 12 },
    ],
    features: ['Hidden stairs', 'Handmade cups', 'Late opening', 'Tiny'],
    mochiTip: 'Get lost on purpose. If you find it on your first try, you weren’t really looking.', since: 2015,
  },
  {
    id: 'yongkang', name: 'Yongkang Stoop', cn: '永康路台阶', district: 'Former French Concession', address: '68 Yongkang Rd, Xuhui', category: 'Cozy Alleys', x: 262, y: 300,
    signature: 'Piccolo', hours: '7:00 – 17:00', price: '¥', rating: 4.5, note: 'Neighbours, laundry lines and good crema.',
    hero: '1778074894243-06e906bdc82c', gallery: ['1545731939-9c302d5d27ed', '1670404161009-29548c027d06', '1709038863991-52f10d77a1f2'],
    about: [
      'Yongkang Road used to be the city’s loudest bar street. Now it is quietly one of the best coffee mornings in town, and the Stoop is where it starts: 7 am sharp, piccolos for the dog walkers.',
      'Look up: laundry lines still cross between the upper windows, and the aunties on the second floor will tell you if your order is taking too long.',
    ],
    menu: [
      { name: 'Piccolo', price: 24, mochi: true },
      { name: 'Long Black', price: 24 },
      { name: 'Magic', price: 30, note: 'Melbourne-style' },
      { name: 'Banana Bread', price: 22 },
    ],
    features: ['7 am opening', 'Stoop seating', 'Neighbourhood regulars', 'Dog water bowl'],
    mochiTip: 'Wave at the second-floor aunties. They run the street.', since: 2018,
  },
]

export const getCafe = (id?: string) => cafes.find((c) => c.id === id)
