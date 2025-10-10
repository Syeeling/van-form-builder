<template>
  <van-field v-bind="$attrs" :model-value="fieldValue">
    <template #input v-if="!$attrs.readonly">
      <component v-model="fieldValue" :is="_resolveComponent($attrs.props)" />
    </template>
  </van-field>
</template>

<script setup name="Rate">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = props => h(VanRate, props, props.slots)
</script>

<style lang="scss" scoped>
.van-rate--readonly {
  opacity: var(--readonly-opacity);
}
</style>
