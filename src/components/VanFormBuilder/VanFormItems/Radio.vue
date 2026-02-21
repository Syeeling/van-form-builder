<template>
  <component :is="_renderField()" />
</template>

<script setup name="Radio">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

// 选中项文本
const fieldText = computed(() => {
  return attrs.props.options?.find(op => op.value === fieldValue.value)?.text || ''
})

const _renderField = () =>
  h(
    VanField,
    { ...attrs, modelValue: fieldText.value },
    { ...attrs.slots, input: attrs.readonly ? undefined : () => _renderRadioGroup() }
  )

const _renderRadioGroup = () =>
  h(
    VanRadioGroup,
    { ...attrs.props, modelValue: fieldValue.value, 'onUpdate:modelValue': val => (fieldValue.value = val) },
    () => attrs.props.options.map(item => _renderRadio(item))
  )

const _renderRadio = item =>
  h(
    VanRadio,
    { ...item, name: item.value, class: item.shape || attrs.props.shape },
    { ...item.slots, default: item.slots?.default || (() => item.text || '') }
  )
</script>

<style lang="scss" scoped>
.van-radio {
  --van-radio-size: 36px;
  &.square {
    --van-radio-size: 32px;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.van-radio-group--horizontal {
  gap: 12px var(--van-padding-sm);
  .van-radio {
    margin: 0;
  }
}
</style>
