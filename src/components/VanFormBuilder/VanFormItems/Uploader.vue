<template>
  <van-field v-bind="$attrs">
    <template #input>
      <component v-model="fieldValue" :is="_resolveComponent($attrs.props)" />
    </template>
  </van-field>
</template>

<script setup name="Uploader">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = props => h(VanUploader, props, props.slots)
</script>

<style lang="scss" scoped></style>
