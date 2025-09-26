<template>
  <van-field v-bind="$attrs">
    <template #input>
      <component v-model="fieldValue" :is="_resolveComponent($attrs.props)" />
    </template>
  </van-field>
</template>

<script setup name="Switch">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = props => h(VanSwitch, props, props.slots)
</script>

<style lang="scss" scoped>
.van-switch {
  --van-switch-size: 40px;
}
</style>
