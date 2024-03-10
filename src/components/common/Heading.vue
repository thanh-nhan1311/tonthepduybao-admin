<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex flex-col">
      <div class="flex items-center">
        <h2 v-if="title" class="text-3xl font-semibold mb-0 mr-4">
          {{ title }}
        </h2>
        <a-tooltip
          v-if="tooltip"
          placement="bottom"
          trigger="click"
          color="blue"
          overlay-class-name="min-w-[320px]"
        >
          <template #title><slot name="tooltip" /></template>
          <Iconify
            icon="mdi:information-variant-circle-outline"
            width="20px"
            class="outline-none cursor-pointer"
          />
        </a-tooltip>
      </div>
      <p v-if="subTitle" class="text-xl italic text-slate-600 mb-0 m-1">{{ subTitle }}</p>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { PROP_DEF } from '~/modules/constant';

defineProps({
  title: PROP_DEF.STRING,
  subTitle: PROP_DEF.STRING,
  tooltip: PROP_DEF.BOOLEAN
})
</script>
