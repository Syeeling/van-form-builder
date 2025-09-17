<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-slider v-model="fieldValue" v-bind="$attrs.props" />
    </template>
  </van-field>
</template>

<script setup name="SySlider">
const fieldValue = defineModel() // formData表单值
</script>

<style lang="scss" scoped></style>
