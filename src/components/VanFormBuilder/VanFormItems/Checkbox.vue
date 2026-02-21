<template>
  <component :is="_renderField()" />
</template>

<script setup name="Checkbox">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

// 选中项文本
const fieldText = computed(() => {
  return attrs.props.options
    ?.filter(op => fieldValue.value?.includes(op.value))
    .map(op => op.text)
    .join()
})

// 定义CheckboxGroup默认属性
const defaultProps = {
  shape: 'square'
}

const _renderField = () =>
  h(
    VanField,
    { ...attrs, modelValue: fieldText.value },
    { ...attrs.slots, input: attrs.readonly ? undefined : () => _renderCheckboxGroup() }
  )

const _renderCheckboxGroup = () =>
  h(
    VanCheckboxGroup,
    {
      ...defaultProps,
      ...attrs.props,
      modelValue: fieldValue.value,
      'onUpdate:modelValue': val => (fieldValue.value = val)
    },
    () => attrs.props.options.map(item => _renderCheckbox(item))
  )

const _renderCheckbox = item =>
  h(
    VanCheckbox,
    { ...item, name: item.value, class: item.shape || attrs.props.shape || defaultProps.shape },
    { ...item.slots, default: item.slots?.default || (() => item.text || '') }
  )
</script>

<style lang="scss" scoped>
.van-checkbox {
  --van-checkbox-size: 36px;
  &.square {
    --van-checkbox-size: 32px;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.van-checkbox-group--horizontal {
  gap: 12px var(--van-padding-sm);
  .van-checkbox {
    margin: 0;
  }
}
</style>
