// NewsletterAdapter — ESP-agnostic interface. See CONTEXT.md.

export interface SubscribeInput {
  email: string
  metadata?: Record<string, string>
}

export type SubscribeResult =
  | { ok: true; alreadySubscribed?: boolean }
  | {
      ok: false
      reason: 'invalid-email' | 'rate-limited' | 'network' | 'unknown'
      message?: string
    }

export interface NewsletterAdapter {
  subscribe(input: SubscribeInput): Promise<SubscribeResult>
}
