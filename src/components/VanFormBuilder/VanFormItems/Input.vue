<template>
  <component :is="_renderField()" v-model="fieldValue" />
</template>

<script setup name="Input">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const _renderField = () => h(VanField, attrs, attrs.slots)
</script>

<style lang="scss" scoped></style>
