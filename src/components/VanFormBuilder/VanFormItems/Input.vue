<template>
  <component v-model="fieldValue" :is="_resolveComponent($attrs)" />
</template>

<script setup name="Input">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = attrs => h(VanField, attrs, attrs.slots)
</script>

<style lang="scss" scoped></style>
