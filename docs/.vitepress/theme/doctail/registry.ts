// DocTail registry — maps URL prefixes to components rendered after article body.
// See CONTEXT.md > DocTail.

import type { Component } from 'vue'

export interface DocTailRule {
  /** URL prefix to match against the current route, e.g. "/self/". */
  prefix: string
  /** Component to render. */
  component: Component
  /** Optional props passed at registration time. */
  props?: Record<string, unknown>
}

const rules: DocTailRule[] = []

export function registerDocTail(rule: DocTailRule): void {
  rules.push(rule)
}

export function resolveDocTail(path: string): DocTailRule[] {
  return rules.filter((r) => {
    if (!path.startsWith(r.prefix)) return false
    // Skip pillar index pages (e.g. /practice/, /practice/index.html).
    // Articles match because something follows the prefix.
    const rest = path.slice(r.prefix.length)
    return rest !== '' && rest !== 'index.html'
  })
}

export function clearDocTail(): void {
  rules.length = 0
}
