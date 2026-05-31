<template>
  <section :class="['bh', `bh--${variant}`]" :aria-labelledby="headingId">
    <div class="bh__copy">
      <h3 :id="headingId" class="bh__title"><slot name="title">{{ defaultTitle }}</slot></h3>
      <p class="bh__desc"><slot name="desc">{{ defaultDesc }}</slot></p>
    </div>

    <form class="bh__form" novalidate @submit.prevent="onSubmit">
      <label class="bh__label" :for="inputId">電子郵件</label>
      <div class="bh__row">
        <input
          :id="inputId"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          inputmode="email"
          placeholder="you@example.com"
          class="bh__input"
          :aria-invalid="state === 'error'"
          :disabled="state === 'loading' || state === 'success'"
        />
        <button type="submit" class="bh__btn" :disabled="state === 'loading' || state === 'success'">
          {{ buttonLabel }}
        </button>
      </div>
      <p v-if="message" :class="['bh__msg', `bh__msg--${state}`]" role="status" aria-live="polite">{{ message }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { subscribe } from '../adapters/newsletter'

type Variant = 'band' | 'inline'
type State = 'idle' | 'loading' | 'success' | 'error'

const props = withDefaults(
  defineProps<{ variant?: Variant; source?: string }>(),
  { variant: 'band', source: 'unknown' }
)

// Deterministic ids (no Math.random) so SSR and client markup match — avoids a
// hydration mismatch on id / for / aria-labelledby. `source` is unique per placement.
const headingId = `bh-h-${props.source}`
const inputId = `bh-i-${props.source}`

const email = ref('')
const state = ref<State>('idle')
const message = ref('')

const defaultTitle = computed(() => '想收到下一篇？')
const defaultDesc = computed(() => '每週一封信，跟我一起用 AI 拆解自我。沒有套路廣告。')
const buttonLabel = computed(() =>
  state.value === 'loading' ? '送出中…' : state.value === 'success' ? '✓ 已訂閱' : '訂閱電子報'
)

// Basic shape check so an obviously-bad address fails instantly, no round-trip.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function onSubmit() {
  if (state.value === 'loading' || state.value === 'success') return

  const value = email.value.trim()
  if (!EMAIL_RE.test(value)) {
    state.value = 'error'
    message.value = '電子郵件格式看起來不太對，請再檢查一下。'
    return
  }

  state.value = 'loading'
  message.value = ''

  const result = await subscribe({
    email: value,
    metadata: { source: props.source, variant: props.variant }
  })

  if (result.ok) {
    state.value = 'success'
    message.value = '謝謝你！請到信箱確認訂閱（第一封信通常 1 分鐘內到達）。'
    return
  }

  state.value = 'error'
  switch (result.reason) {
    case 'invalid-email': message.value = '電子郵件格式看起來不太對，請再檢查一下。'; break
    case 'rate-limited': message.value = '太多次了，請稍後再試。'; break
    case 'network': message.value = '網路問題，請稍後再試一次。'; break
    default: message.value = result.message || '發生未知錯誤，請稍後再試。'
  }
}
</script>

<style scoped>
.bh { display: grid; gap: 1.4rem; }
.bh--band {
  background: var(--o-bg-soft);
  border-radius: 8px;
  padding: clamp(1.8rem, 4vw, 2.6rem);
}
/* inline variant: no block, hairline divider — for in-article / footer use */
.bh--inline {
  border-top: 1px solid var(--o-divider);
  padding-top: 1.8rem;
  gap: 1rem;
}
.bh--inline .bh__title { font-size: 1.15rem; }
.bh__title { font-family: var(--o-serif); font-weight: 600; color: var(--o-t1); font-size: 1.35rem; margin: 0 0 0.55rem; }
.bh__desc { font-family: var(--o-sans); font-weight: 300; color: var(--o-t2); line-height: 1.75; margin: 0; }
.bh__label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.bh__row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.bh__input {
  flex: 1 1 240px; min-width: 0;
  font-family: var(--o-sans); font-size: 0.95rem; color: var(--o-t1);
  background: var(--o-bg); border: 1px solid var(--o-line); border-radius: 5px;
  padding: 0.72rem 0.85rem; transition: border-color 0.25s;
}
.bh__input::placeholder { color: var(--o-t3); }
.bh__input:focus { outline: none; border-color: var(--o-slate); }
.bh__input[aria-invalid="true"] { border-color: #d9534f; }
.bh__btn {
  font-family: var(--o-sans); font-weight: 500; font-size: 0.92rem; letter-spacing: 0.04em; cursor: pointer;
  background: var(--o-slate); color: #fff; border: none; padding: 0.72rem 1.7rem; border-radius: 5px;
  transition: opacity 0.2s, transform 0.2s;
}
.bh__btn:hover:not(:disabled) { opacity: 0.88; }
.bh__btn:focus-visible { outline: 2px solid var(--o-slate); outline-offset: 2px; }
.bh__btn:active { transform: translateY(1px); }
.bh__btn:disabled { opacity: 0.6; cursor: not-allowed; }
.bh__msg { font-family: var(--o-mono); font-size: 0.74rem; letter-spacing: 0.03em; margin: 0; line-height: 1.5; }
.bh__msg--success { color: var(--o-slate); }
.bh__msg--error { color: #d9534f; }
@media (prefers-reduced-motion: reduce) {
  .bh__input, .bh__btn { transition: none; }
  .bh__btn:active { transform: none; }
}
</style>
