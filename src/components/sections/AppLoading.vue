<template>
  <div
    v-if="commonStore.isLoading"
    class="fixed w-screen h-screen z-50 top-0 left-0 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.2)"
  >
    <a-spin :indicator="indicator" />
  </div>
</template>

<script>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { defineComponent, h } from 'vue'
import { useCommonStore } from '../../stores'

export default defineComponent({
  setup() {
    const commonStore = useCommonStore()

    const indicator = h(LoadingOutlined, {
      style: { fontSize: '56px' },
      spin: true
    })

    return {
      commonStore,
      indicator
    }
  }
})
</script>
