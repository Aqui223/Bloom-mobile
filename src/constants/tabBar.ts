import type { TabValue } from '@interfaces'
import { staticColor } from 'unistyles'
import type { ICONS } from './icons'

export const TAB_COLORS = (backdrop?: boolean): Record<TabValue, string> =>
  ({
    Friends: staticColor[backdrop ? 'orangeBackdrop' : 'orange'],
    Explore: staticColor[backdrop ? 'yellowBackdrop' : 'yellow'],
    index: staticColor[backdrop ? 'primaryBackdrop' : 'primary'],
    Settings: staticColor[backdrop ? 'pinkBackdrop' : 'pink'],
  }) as const

export const TAB_ICONS: Record<TabValue, keyof typeof ICONS> = {
  index: 'message',
  Explore: 'compass',
  Settings: 'gear',
  Friends: 'person.circle',
} as const
