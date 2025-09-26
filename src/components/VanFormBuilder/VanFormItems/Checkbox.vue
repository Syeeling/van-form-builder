<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-checkbox-group v-model="fieldValue" v-bind="{ ...defaultProps, ...$attrs.props }">
        <template v-for="item in $attrs.props.options" :key="item.value">
          <component
            :is="_resolveComponent(item)"
            :name="item.value"
            :class="item.shape || $attrs.props.shape || defaultProps.shape"
          />
        </template>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script setup name="Checkbox">
const fieldValue = defineModel() // formData表单值

// 定义CheckboxGroup默认属性
const defaultProps = {
  shape: 'square'
}

const _resolveComponent = item =>
  h(VanCheckbox, item, { ...item.slots, default: item.slots?.default || (() => item.text) })
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
