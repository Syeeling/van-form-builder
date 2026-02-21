<template>
  <component :is="_renderField()" />
</template>

<script setup name="Rate">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const _renderField = () =>
  h(
    VanField,
    { ...attrs, modelValue: fieldValue.value },
    { ...attrs.slots, input: attrs.readonly ? undefined : () => _renderRate() }
  )

const _renderRate = () =>
  h(
    VanRate,
    { ...attrs.props, modelValue: fieldValue.value, 'onUpdate:modelValue': val => (fieldValue.value = val) },
    attrs.props.slots
  )
</script>

<style lang="scss" scoped>
.van-rate--readonly {
  opacity: var(--readonly-opacity);
}
</style>
