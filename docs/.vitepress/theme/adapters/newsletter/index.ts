import { BeehiivAdapter } from './beehiiv'
import type { NewsletterAdapter, SubscribeInput, SubscribeResult } from './types'

export type { NewsletterAdapter, SubscribeInput, SubscribeResult }

const publicationId =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env
    ?.VITE_BEEHIIV_PUBLICATION_ID ?? 'TODO-PUBLICATION-ID'

export const newsletter: NewsletterAdapter = new BeehiivAdapter({ publicationId })

export function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  return newsletter.subscribe(input)
}
