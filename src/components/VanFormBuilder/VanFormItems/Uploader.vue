<template>
  <component :is="_renderField()" />
</template>

<script setup name="Uploader">
const attrs = useAttrs()

// formData表单值
const fieldValue = defineModel()

const _renderField = () => h(VanField, attrs, { ...attrs.slots, input: () => _renderUploader() })

const _renderUploader = () =>
  h(
    VanUploader,
    {
      ...attrs.props,
      deletable: !attrs.readonly,
      showUpload: !attrs.readonly,
      modelValue: fieldValue.value,
      'onUpdate:modelValue': val => (fieldValue.value = val)
    },
    attrs.props.slots
  )
</script>

<style lang="scss" scoped></style>
