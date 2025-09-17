<template>
  <van-field v-model="fieldValue" v-bind="$attrs" />
</template>

<script setup name="SyInput">
const fieldValue = defineModel()
</script>

<style scoped lang="scss"></style>
