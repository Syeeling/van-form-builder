<template>
  <component :is="_renderField()" />
</template>

<script setup name="Slider">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const fieldText = computed(() => {
  return Array.isArray(fieldValue.value) ? fieldValue.value.join() : fieldValue.value
})

const _renderField = () =>
  h(
    VanField,
    { ...attrs, modelValue: fieldText.value },
    { ...attrs.slots, input: attrs.readonly ? undefined : () => _renderSlider() }
  )

const _renderSlider = () =>
  h(
    VanSlider,
    { ...attrs.props, modelValue: fieldValue.value, 'onUpdate:modelValue': val => (fieldValue.value = val) },
    attrs.props.slots
  )
</script>

<style lang="scss" scoped></style>
