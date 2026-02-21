<template>
  <template v-if="inField">
    <component :is="_renderField()" :model-value="attrs.modelValue?.toString()" />
  </template>
  <component v-else :is="attrs.component" />
</template>

<script setup name="Customize">
const { inField } = defineProps({
  inField: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()

const _renderField = () => h(VanField, attrs, { ...attrs.slots, input: () => h(attrs.component, attrs) })
</script>

<style lang="scss" scoped></style>
