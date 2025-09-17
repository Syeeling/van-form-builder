<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-stepper v-model="fieldValue" v-bind="$attrs.props" />
    </template>
  </van-field>
</template>

<script setup name="SyStepper">
const fieldValue = defineModel() // formData表单值
</script>

<style lang="scss" scoped></style>
