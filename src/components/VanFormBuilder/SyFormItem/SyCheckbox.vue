<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-checkbox-group v-model="fieldValue" v-bind="{ ...defaultProps, ...$attrs.props }">
        <van-checkbox v-for="item in $attrs.props.options" :key="item.value" :name="item.value" v-bind="item">
          {{ item.text }}
        </van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script setup name="SyCheckbox">
const fieldValue = defineModel() // formData表单值

// 定义CheckboxGroup默认属性
const defaultProps = {
  shape: 'square'
}
</script>

<style scoped lang="scss">
.van-checkbox {
  margin: 0 0 12px;
}
:deep(.van-checkbox__icon) {
  font-size: 32px;
}
</style>
