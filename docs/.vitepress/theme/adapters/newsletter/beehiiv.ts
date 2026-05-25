import type { NewsletterAdapter, SubscribeInput, SubscribeResult } from './types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface BeehiivAdapterOptions {
  publicationId: string
  formUrl?: string
}

export class BeehiivAdapter implements NewsletterAdapter {
  constructor(private opts: BeehiivAdapterOptions) {}

  async subscribe({ email, metadata }: SubscribeInput): Promise<SubscribeResult> {
    if (!EMAIL_RE.test(email)) {
      return { ok: false, reason: 'invalid-email' }
    }

    if (!this.opts.publicationId || this.opts.publicationId.startsWith('TODO')) {
      if (typeof console !== 'undefined') {
        console.warn('[BeehiivAdapter] publicationId is not configured; simulating success in dev.')
      }
      return { ok: true }
    }

    const url =
      this.opts.formUrl ??
      `https://embeds.beehiiv.com/${encodeURIComponent(this.opts.publicationId)}/subscribe`

    const body = new URLSearchParams({ email, ...(metadata ?? {}) })

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return { ok: false, reason: 'network', message }
    }
  }
}
