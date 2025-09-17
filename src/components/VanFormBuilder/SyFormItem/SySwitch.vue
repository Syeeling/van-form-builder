<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-switch v-model="fieldValue" v-bind="$attrs.props" />
    </template>
  </van-field>
</template>

<script setup name="SySwitch">
const fieldValue = defineModel() // formData表单值
</script>

<style lang="scss" scoped></style>
