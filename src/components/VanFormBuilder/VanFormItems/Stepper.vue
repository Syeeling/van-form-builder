<template>
  <component :is="_renderField()" />
</template>

<script setup name="Stepper">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const _renderField = () =>
  h(
    VanField,
    { ...attrs, modelValue: fieldValue.value },
    { ...attrs.slots, input: attrs.readonly ? undefined : () => _renderStepper() }
  )

const _renderStepper = () =>
  h(
    VanStepper,
    { ...attrs.props, modelValue: fieldValue.value, 'onUpdate:modelValue': val => (fieldValue.value = val) },
    attrs.props.slots
  )
</script>

<style lang="scss" scoped>
.van-stepper {
  --van-stepper-input-height: 48px;
  display: flex;
}
</style>
