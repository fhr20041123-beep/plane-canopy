export type ArticleCategory = 'History' | 'Modern Art' | 'Craft' | 'Ritual' | 'Neighbourhood' | "Mochi's Diary"
export type Art = 'reading' | 'espresso' | 'latte' | 'bean' | 'wave'

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'img'; id: string; caption: string }
  | { t: 'list'; items: string[] }

export interface Article {
  slug: string
  title: string
  cn: string
  dek: string
  category: ArticleCategory
  author: string
  date: string
  read: number
  cover?: string
  art?: Art
  cafes: string[]
  tags: string[]
  body: Block[]
  weather?: string
  mood?: string
}

export const articles: Article[] = [
  {
    slug: 'salons-of-the-concession', title: 'Salons of the Concession: Shanghai’s first espresso', cn: '租界沙龙：上海的第一杯浓缩',
    dek: 'How Russian émigrés, French bakers and jazz-age socialites taught a tea city to drink coffee.',
    category: 'History', author: 'Lin Qiao', date: '2025-10-02', read: 12, cover: '1633944241961-e511ab23455f', cafes: ['bund', 'wukang', 'hongkou'], tags: ['1920s', 'Concession', 'Archive'],
    body: [
      { t: 'p', text: 'In 1928, a Shanghai newspaper ran a short notice that a café on Avenue Joffre had begun serving “coffee pressed by steam, in the Italian manner.” It was, as far as anyone can tell, the city’s first espresso. Within a decade there were dozens.' },
      { t: 'p', text: 'The people pouring them were rarely Italian. White Russian émigrés, arriving after 1917, opened bakeries and tea rooms along the avenue; French pâtissiers followed the concession’s officials; Sephardic families from Baghdad ran grand hotels on the Bund where coffee was served on silver.' },
      { t: 'quote', text: 'Coffee in Shanghai was never about caffeine. It was about the seat by the window, and who could see you sitting in it.', by: 'Historian Zhang Wei' },
      { t: 'h', text: 'A tea city learns a new ritual' },
      { t: 'p', text: 'For local Shanghainese, coffee became shorthand for being modern. Novels of the 1930s are full of characters arranging affairs over coffee at Kiessling’s or DD’s. Film stars posed with demitasse cups. Department stores on Nanjing Road opened coffee counters to keep shoppers longer.' },
      { t: 'img', id: '1691067987594-b1b7f84ba55a', caption: 'Wooden tables, high ceilings: the salon template that still shapes Shanghai cafés.' },
      { t: 'p', text: 'The war and the decades after closed most of those rooms. But the architecture survived, and when coffee returned in the 1990s and 2000s, it moved straight back into the same Art Deco lobbies and lane-house front rooms.' },
      { t: 'h', text: 'Where to taste the echo today' },
      { t: 'list', items: ['Salon 1921 on the Bund: silver trays and a chocolate square, exactly as in the 1930s.', 'Wukang Mansion Roastery: under Hudec’s flatiron, the most photographed corner of the old concession.', 'Shikumen Brew in Hongkou: a family front room, the original café format.'] },
      { t: 'p', text: 'Order something slow. Sit by the window. You are taking part in a ninety-seven-year-old Shanghai tradition.' },
    ],
  },
  {
    slug: 'galleries-that-pour', title: 'Galleries that pour: the West Bund’s white-cube espresso bars', cn: '会做咖啡的美术馆',
    dek: 'Where the museum café became the main exhibit and baristas curate like artists.',
    category: 'Modern Art', author: 'Ana Ferreira', date: '2025-09-18', read: 9, cover: '1762928289094-197055a5d5c3', cafes: ['westbund', 'm50', 'pudong'], tags: ['Architecture', 'Galleries', 'Riverside'],
    body: [
      { t: 'p', text: 'Ten years ago, the West Bund was coal hoppers and an airstrip. Today it is an eight-kilometre corridor of museums, and every one of them has a café that people visit even when they skip the show.' },
      { t: 'p', text: 'The design brief is always the same: make the coffee feel like part of the collection. Concrete counters poured on site. Cups commissioned from ceramicists who also exhibit upstairs. Menus that change with each exhibition.' },
      { t: 'quote', text: 'We think of the bar as a plinth. The drink is the work; the barista is the installer.', by: 'Café director, West Bund' },
      { t: 'img', id: '1549791084-5f78368b208b', caption: 'Concrete, white and sky: the West Bund palette.' },
      { t: 'h', text: 'Up the creek' },
      { t: 'p', text: 'The model started further north, at M50 on Suzhou Creek, where artists who took over a textile mill in 2000 needed somewhere to drink coffee between studio visits. The loading-bay espresso bar there still hangs one resident’s painting a month.' },
      { t: 'p', text: 'And it has climbed: Glasshouse Pudong, fifty-eight floors up, commissions light installations for its ceiling. The coffee is good. The view is the art.' },
    ],
  },
  {
    slug: 'nine-bar-rule', title: 'The 9-bar rule: Mochi on pulling the perfect shot', cn: '九巴的规矩',
    dek: 'Pressure, patience and a paw on the portafilter. A beginner’s guide from the city’s fluffiest barista.',
    category: 'Craft', author: 'Mochi', date: '2025-09-30', read: 4, art: 'espresso', cafes: ['m50', 'anfu'], tags: ['How-to', 'Espresso', 'Mochi'],
    body: [
      { t: 'p', text: 'Hello, it’s Mochi. People ask me how a cat learned to pull espresso. The honest answer is that I watched very carefully from the windowsill for three years.' },
      { t: 'h', text: 'The four numbers' },
      { t: 'list', items: ['18 grams of coffee in the basket.', '36 grams of espresso in the cup.', '9 bars of pressure from the machine.', '25 to 30 seconds from first drop to last.'] },
      { t: 'p', text: 'If your shot runs fast and tastes sour, grind finer. If it runs slow and tastes bitter, grind coarser. Change one thing at a time. That’s the whole secret.' },
      { t: 'quote', text: 'Tamp like you are pressing a paw print into fresh snow: level, firm, and only once.', by: 'Mochi' },
      { t: 'img', id: '1616388761741-a5936c6f61f6', caption: 'The honey-coloured “tiger stripes” of a well-pulled shot.' },
      { t: 'p', text: 'Last thing: taste every shot, even the bad ones. Especially the bad ones. They teach you the most.' },
    ],
  },
  {
    slug: 'milk-foam-memory', title: 'Milk, foam & memory', cn: '奶、泡与记忆',
    dek: 'Three generations of latte artists on the rosettas that defined a city.',
    category: 'Ritual', author: 'Chen Yu', date: '2025-08-21', read: 7, cover: '1506188044630-210826194885', cafes: ['anfu', 'tianzifang', 'columbia'], tags: ['Latte art', 'People'],
    body: [
      { t: 'p', text: 'Ms. Gu learned to pour a heart in 1998, in a hotel lobby, from a Melbourne barista who stayed three weeks. She taught her nephew. Her nephew taught half the baristas in Xuhui.' },
      { t: 'p', text: 'Latte art in Shanghai has a family tree, and most of its branches lead back to a handful of people who learned in hotels and passed it on in tiny lane cafés.' },
      { t: 'quote', text: 'A rosetta is a handwriting. I can tell who taught you by the way your leaves bend.', by: 'Ms. Gu, 61' },
      { t: 'img', id: '1792655421196-1dbf8d3e4773', caption: 'A leaf, poured in one breath.' },
      { t: 'p', text: 'Today the competitive scene is fierce, and the city regularly sends baristas to world championships. But the best pours are still the ones you get at 8 am, from someone who knows your name.' },
    ],
  },
  {
    slug: 'huangpu-at-dawn', title: 'Riverside at 6 am: the Bund’s early pour', cn: '清晨六点的外滩',
    dek: 'Runners, tai-chi circles and the first espresso of the day along the Huangpu.',
    category: 'Ritual', author: 'Lin Qiao', date: '2025-07-12', read: 6, cover: '1727478431214-67846b1d62be', cafes: ['bund', 'pudong', 'westbund'], tags: ['Morning', 'River', 'City'],
    body: [
      { t: 'p', text: 'At six in the morning, the Bund belongs to the people who live here. Tai-chi circles on the promenade, ballroom dancers with a portable speaker, runners heading south toward the West Bund.' },
      { t: 'p', text: 'A few coffee carts set up by the old signal tower. The espresso is fine; the view is unmatched. Across the river the towers are still dark, catching the first pink of the sky.' },
      { t: 'img', id: '1555849554-f9e018963b90', caption: 'Lujiazui switching off its lights as the sun comes up.' },
      { t: 'quote', text: 'In the morning the river is quiet enough to hear the ferries breathe.', by: 'A regular, 70' },
      { t: 'p', text: 'Walk south and the promenade becomes the West Bund: by eight you can be at the museum café for a cold brew, watching skateboarders do the same route the other way.' },
    ],
  },
  {
    slug: 'shikumen-sundays', title: 'Shikumen Sundays: coffee in the lane houses', cn: '石库门的星期天',
    dek: 'Front rooms, courtyards and the families turning lane houses into the city’s warmest cafés.',
    category: 'Neighbourhood', author: 'Ana Ferreira', date: '2025-06-03', read: 8, cover: '1585279463840-7169ec480e43', cafes: ['hongkou', 'tianzifang', 'yongkang'], tags: ['Lanes', 'Families', 'Architecture'],
    body: [
      { t: 'p', text: 'The shikumen, or stone-gate house, is Shanghai’s signature home: Western terraces with Chinese courtyards, built in the thousands between 1870 and 1940. Many have been demolished. Some have become cafés.' },
      { t: 'p', text: 'The best of them still feel like homes. A grandfather choosing records. A courtyard with a xiangqi game that has been going since lunch. Laundry overhead.' },
      { t: 'img', id: '1501339847302-ac426a4a7cbb', caption: 'Hand-lettered menus and hanging bulbs, Duolun Road.' },
      { t: 'quote', text: 'People think they come for coffee. They come for a living room.', by: 'Owner, Shikumen Brew' },
      { t: 'p', text: 'Go on a Sunday. Order the cheapest thing. Stay longer than you meant to.' },
    ],
  },
  {
    slug: 'diary-12-closing-shift', title: 'Diary No. 12: Closing shift in the rain', cn: '日记十二：雨夜打烊',
    dek: 'A clear umbrella, a last latte and a stranger on Wulumuqi Road.',
    category: "Mochi's Diary", author: 'Mochi', date: '2025-10-28', read: 3, art: 'latte', cafes: ['anfu'], tags: ['Diary', 'Rain', 'Night'], weather: 'Rain, 14°C', mood: 'Warm inside',
    body: [
      { t: 'p', text: 'Dear diary. It rained all evening. The neon on Wulumuqi Road turned the puddles into pink and green soup.' },
      { t: 'p', text: 'At 11:47 a man in a grey coat stopped at the window. He didn’t order. He just stood there out of the rain. So I made him a latte anyway, and held my clear umbrella over the hatch while he drank it.' },
      { t: 'quote', text: 'In a city of twenty-five million, the warmest thing you can hold is a cup someone made just for you.', by: 'Mochi' },
      { t: 'p', text: 'He said thank you in three languages. I said meow in one. We both meant the same thing.' },
    ],
  },
  {
    slug: 'diary-09-the-bean', title: 'Diary No. 09: The bean that got away', cn: '日记九：溜走的咖啡豆',
    dek: 'Mochi chases a single Yunnan bean across three districts. A true story, mostly.',
    category: "Mochi's Diary", author: 'Mochi', date: '2025-09-09', read: 3, art: 'bean', cafes: ['m50', 'tianzifang'], tags: ['Diary', 'Yunnan'], weather: 'Sunny, 27°C', mood: 'Determined',
    body: [
      { t: 'p', text: 'Dear diary. Today a bean fell off the roaster tray at M50 and rolled out the loading bay. I followed.' },
      { t: 'p', text: 'It rolled along Suzhou Creek, hitched a ride on a delivery scooter, and ended up at the bottom of the staircase at Lane 210. I caught it on step four.' },
      { t: 'p', text: 'It was a Yunnan natural, fruity, a little wild. I understand why it wanted to see the city. I am keeping it. It is my bean now.' },
      { t: 'quote', text: 'Every bean has a journey. Mine has three districts and a scooter.', by: 'Mochi' },
    ],
  },
  {
    slug: 'diary-07-plane-trees', title: 'Diary No. 07: Plane trees in October', cn: '日记七：十月的梧桐',
    dek: 'The leaves turn, the lanes go gold, and Mochi finds the best reading window on Anfu Road.',
    category: "Mochi's Diary", author: 'Mochi', date: '2025-10-14', read: 2, art: 'reading', cafes: ['anfu', 'wukang', 'yongkang'], tags: ['Diary', 'Autumn', 'Books'], weather: 'Cloudy, 19°C', mood: 'Sleepy',
    body: [
      { t: 'p', text: 'Dear diary. The plane trees have gone the colour of a honey cappuccino. The French Concession is a tunnel of gold.' },
      { t: 'p', text: 'I spent the morning in the window of the Window Bar with a book about lighthouses. I read four pages and slept for two hours. Best morning of the year.' },
      { t: 'img', id: '1622529975159-39b50c42e5f9', caption: 'Plane trees on Hengshan Road.' },
      { t: 'p', text: 'Note to self: tomorrow, try the window at Wukang. Bring a smaller book.' },
    ],
  },
]

export const getArticle = (slug?: string) => articles.find((a) => a.slug === slug)
export const articleCategories: ArticleCategory[] = ['History', 'Modern Art', 'Craft', 'Ritual', 'Neighbourhood', "Mochi's Diary"]
