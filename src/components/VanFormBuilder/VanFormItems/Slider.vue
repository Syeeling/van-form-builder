<template>
  <van-field v-bind="$attrs" :model-value="fieldText">
    <template #input v-if="!$attrs.readonly">
      <component v-model="fieldValue" :is="_resolveComponent($attrs.props)" />
    </template>
  </van-field>
</template>

<script setup name="Slider">
const fieldValue = defineModel() // formData表单值

const fieldText = computed(() => {
  return Array.isArray(fieldValue.value) ? fieldValue.value.join() : fieldValue.value
})

const _resolveComponent = props => h(VanSlider, props, props.slots)
</script>

<style lang="scss" scoped></style>
