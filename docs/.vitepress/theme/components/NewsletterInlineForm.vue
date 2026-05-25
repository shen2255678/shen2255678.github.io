<template>
  <section :class="['nl-form', `nl-form--${variant}`]" :aria-labelledby="headingId">
    <div class="nl-form__copy">
      <h3 :id="headingId" class="nl-form__title">
        <slot name="title">{{ defaultTitle }}</slot>
      </h3>
      <p class="nl-form__desc">
        <slot name="desc">{{ defaultDesc }}</slot>
      </p>
    </div>

    <form class="nl-form__form" @submit.prevent="onSubmit" novalidate>
      <label class="nl-form__label" :for="inputId">電子郵件</label>
      <div class="nl-form__row">
        <input
          :id="inputId"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="you@example.com"
          class="nl-form__input"
          :disabled="state === 'loading' || state === 'success'"
        />
        <button
          type="submit"
          class="nl-form__btn"
          :disabled="state === 'loading' || state === 'success'"
        >
          {{ buttonLabel }}
        </button>
      </div>
      <p v-if="message" :class="['nl-form__msg', `nl-form__msg--${state}`]" role="status">
        {{ message }}
      </p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { subscribe } from '../adapters/newsletter'

type Variant = 'inline' | 'footer' | 'landing'
type State = 'idle' | 'loading' | 'success' | 'error'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    source?: string
  }>(),
  { variant: 'inline', source: 'unknown' }
)

const uid = Math.random().toString(36).slice(2, 8)
const headingId = `nl-h-${uid}`
const inputId = `nl-i-${uid}`

const email = ref('')
const state = ref<State>('idle')
const message = ref('')

const defaultTitle = computed(() => {
  if (props.variant === 'landing') return '訂閱「7 天用 AI 認識真正的自己」'
  if (props.variant === 'footer') return '想收到下一篇？'
  return '如果這篇對你有用，加入電子報'
})

const defaultDesc = computed(() => {
  if (props.variant === 'landing')
    return '每天一封信，連續 7 天。一個工程師如何用 AI 拆解自己——免費，可隨時退訂。'
  if (props.variant === 'footer') return '不定期更新，沒有套路廣告。'
  return '每週一封信，跟我一起用 AI 拆解自我。'
})

const buttonLabel = computed(() => {
  if (state.value === 'loading') return '送出中…'
  if (state.value === 'success') return '✓ 已訂閱'
  return '訂閱'
})

async function onSubmit() {
  if (state.value === 'loading' || state.value === 'success') return
  state.value = 'loading'
  message.value = ''

  const result = await subscribe({
    email: email.value.trim(),
    metadata: { source: props.source, variant: props.variant }
  })

  if (result.ok) {
    state.value = 'success'
    message.value = '謝謝你！請到信箱確認訂閱（第一封信通常 1 分鐘內到達）。'
    return
  }

  state.value = 'error'
  switch (result.reason) {
    case 'invalid-email':
      message.value = '電子郵件格式看起來不太對，請再檢查一下。'
      break
    case 'rate-limited':
      message.value = '太多次了，請稍後再試。'
      break
    case 'network':
      message.value = '網路問題，請稍後再試一次。'
      break
    default:
      message.value = result.message || '發生未知錯誤，請稍後再試。'
  }
}
</script>

<style scoped>
.nl-form {
  margin: 2.5rem 0;
  padding: 1.75rem 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.nl-form--landing {
  padding: 2.5rem 2rem;
  text-align: center;
}
.nl-form--footer {
  margin: 0;
  padding: 1.25rem 1rem;
  background: transparent;
  border: none;
}
.nl-form__title {
  margin: 0 0 0.4rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.nl-form--landing .nl-form__title {
  font-size: 1.6rem;
}
.nl-form__desc {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.55;
}
.nl-form__label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.nl-form__row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.nl-form--landing .nl-form__row {
  justify-content: center;
}
.nl-form__input {
  flex: 1 1 240px;
  min-width: 0;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}
.nl-form__input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}
.nl-form__btn {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white, #fff);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.nl-form__btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.nl-form__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.nl-form__msg {
  margin: 0.75rem 0 0;
  font-size: 0.88rem;
  line-height: 1.45;
}
.nl-form__msg--success {
  color: var(--vp-c-brand-1);
}
.nl-form__msg--error {
  color: var(--vp-c-danger-1, #d33);
}
</style>
