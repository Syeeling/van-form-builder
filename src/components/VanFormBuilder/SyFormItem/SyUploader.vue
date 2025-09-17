<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-uploader v-model="fieldValue" v-bind="$attrs.props" />
    </template>
  </van-field>
</template>

<script setup name="SyUploader">
const fieldValue = defineModel() // formData表单值
</script>

<style lang="scss" scoped></style>
