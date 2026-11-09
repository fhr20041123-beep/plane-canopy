export const quotes = [
  { text: 'In a city of twenty-five million, the warmest thing you can hold is a cup someone made just for you.', by: 'Mochi, closing shift in the rain' },
  { text: 'Coffee in Shanghai was never about caffeine. It was about the seat by the window.', by: 'Historian Zhang Wei' },
  { text: 'People think they come for coffee. They come for a living room.', by: 'Owner, Shikumen Brew' },
  { text: 'A rosetta is a handwriting. I can tell who taught you by the way your leaves bend.', by: 'Ms. Gu, latte artist' },
]

export type MoodId = 'wake' | 'slow' | 'inspire' | 'rain'
export const moods: { id: MoodId; label: string; cn: string; icon: string; line: string; desc: string; cafe: string; article: string; drink: string; eyes: 'open' | 'happy' | 'down' | 'wink' }[] = [
  { id: 'wake', label: 'Wake me up', cn: '需要提神', icon: '☀', line: 'Bright, fast and a little loud.', desc: 'A double on the go and a seat on the stoop with the 7 am dog walkers.', cafe: 'yongkang', article: 'nine-bar-rule', drink: 'Piccolo', eyes: 'open' },
  { id: 'slow', label: 'Slow me down', cn: '想慢下来', icon: '☾', line: 'Good things start small.', desc: 'A honey cappuccino, a plane-tree lane and nowhere to be.', cafe: 'anfu', article: 'diary-07-plane-trees', drink: 'Honey Cappuccino', eyes: 'down' },
  { id: 'inspire', label: 'Inspire me', cn: '找点灵感', icon: '✧', line: 'Coffee, but make it a gallery.', desc: 'An espresso tonic between studios on Suzhou Creek.', cafe: 'm50', article: 'galleries-that-pour', drink: 'Espresso Tonic', eyes: 'wink' },
  { id: 'rain', label: 'Rainy day', cn: '下雨天', icon: '☂', line: 'Warm hands, wet streets.', desc: 'A shikumen front room, deep sofas and Grandpa Lu’s records.', cafe: 'hongkou', article: 'diary-12-closing-shift', drink: 'Osmanthus Latte', eyes: 'happy' },
]

export const mochiLines = [
  'Meow! 你好呀～',
  'Careful, I spin when tickled.',
  'Honey cappuccino, please.',
  'I know a secret staircase in Tianzifang.',
  'This bean is mine. MINE.',
  'Purr… 18 g in, 36 g out.',
  'Have you collected your stamps?',
  'One more pet and I’ll do a flip.',
]
