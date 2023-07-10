<template>
  <section class="not-found h-full w-full flex items-center justify-center">
    <a-empty image="/img/notfound.png">
      <template #description>
        <p class="mt-2 mb-0 italic text-gray-600">
          Oops! Có vẻ như trang bạn đang tìm kiếm không tồn tại!
        </p>
      </template>
    </a-empty>
  </section>
</template>

<style lang="scss">
.not-found {
  .ant-empty-image {
    height: auto;
  }
  img {
    width: 500px;
    height: auto;
  }
}
</style>
