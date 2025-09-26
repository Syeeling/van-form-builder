<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-radio-group v-model="fieldValue" v-bind="$attrs.props">
        <template v-for="item in $attrs.props.options" :key="item.value">
          <component :is="_resolveComponent(item)" :name="item.value" :class="item.shape || $attrs.props.shape" />
        </template>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script setup name="Radio">
const fieldValue = defineModel() // formData表单值

const _resolveComponent = item =>
  h(VanRadio, item, { ...item.slots, default: item.slots?.default || (() => item.text) })
</script>

<style lang="scss" scoped>
.van-radio {
  --van-radio-size: 36px;
  &.square {
    --van-radio-size: 32px;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.van-radio-group--horizontal {
  gap: 12px var(--van-padding-sm);
  .van-radio {
    margin: 0;
  }
}
</style>
