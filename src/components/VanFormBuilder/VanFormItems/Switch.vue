<template>
  <component :is="_renderField()" />
</template>

<script setup name="Switch">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const _renderField = () => h(VanField, attrs, { ...attrs.slots, input: () => _renderSwitch() })

const _renderSwitch = () =>
  h(
    VanSwitch,
    {
      ...attrs.props,
      disabled: attrs.readonly ?? attrs.props.disabled,
      modelValue: fieldValue.value,
      'onUpdate:modelValue': val => (fieldValue.value = val)
    },
    attrs.props.slots
  )
</script>

<style lang="scss" scoped>
.van-switch {
  --van-switch-size: 40px;
  --van-switch-disabled-opacity: var(--readonly-opacity);
}
</style>
