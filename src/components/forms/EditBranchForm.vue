<template>
  <a-form
    :ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="branchFormStore.formRules"
    v-bind="{
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }"
    @finish="branchFormStore.submit"
    @validate="branchFormStore.validate"
    @finish-failed="branchFormStore.submitError"
  >
    <a-form-item has-feedback label="Tên chi nhánh" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item has-feedback label="Số điện thoại" name="phone" :wrapper-col="{ span: 10 }">
      <a-input v-model:value="formState.phone" />
    </a-form-item>
    <a-form-item has-feedback label="Zalo" name="zalo" :wrapper-col="{ span: 10 }">
      <a-input v-model:value="formState.zalo" />
    </a-form-item>

    <a-form-item has-feedback label="Người đại diện" name="manager" :wrapper-col="{ span: 18 }">
      <a-input v-model:value="formState.manager" />
    </a-form-item>

    <a-form-item has-feedback label="Địa chỉ" name="address">
      <a-input v-model:value="formState.address" />
    </a-form-item>
    <a-form-item has-feedback label="Google Map URL" name="mapUrl">
      <a-input v-model:value="formState.mapUrl" />
    </a-form-item>
    <a-form-item has-feedback label="Google Map Embed" name="mapEmbedUrl">
      <a-input v-model:value="formState.mapEmbedUrl" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Chỉnh sửa</a-button>
      <a-button style="margin-left: 10px" @click="branchFormStore.reset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
