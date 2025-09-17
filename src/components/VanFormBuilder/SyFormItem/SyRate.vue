<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-rate v-model="fieldValue" v-bind="$attrs.props" />
    </template>
  </van-field>
</template>

<script setup name="SyRate">
const fieldValue = defineModel() // formData表单值
</script>

<style lang="scss" scoped></style>
