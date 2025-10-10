<template>
  <van-field v-bind="$attrs" :model-value="fieldValue">
    <template #input v-if="!$attrs.readonly">
      <component v-model="fieldValue" :is="_resolveComponent($attrs.props)" />
    </template>
  </van-field>
</template>

<script setup name="Stepper">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = props => h(VanStepper, props, props.slots)
</script>

<style lang="scss" scoped>
.van-stepper {
  --van-stepper-input-height: 48px;
  display: flex;
}
</style>
