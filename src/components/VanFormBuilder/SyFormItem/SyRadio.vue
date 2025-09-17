<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-radio-group v-model="fieldValue" v-bind="$attrs.props">
        <van-radio v-for="item in $attrs.props.options" :key="item.value" :name="item.value" v-bind="item">
          {{ item.text }}
        </van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script setup name="SyRadio">
const fieldValue = defineModel() // formData表单值
</script>

<style scoped lang="scss">
:deep(.van-radio__icon) {
  font-size: 32px;
}
</style>
