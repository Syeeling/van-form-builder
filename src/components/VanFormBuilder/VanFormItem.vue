<template>
  <van-cell-group v-if="formItem.formType === 'cellGroup' && !formItem.hidden" :border="false" v-bind="formItem.props">
    <van-form-item
      v-for="item in formItem.formItems"
      :key="item.name"
      :form-item="item"
      :formData
      :fieldProps
      :popupProps
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </van-form-item>
  </van-cell-group>
  <div
    v-else-if="!formItem.hidden"
    class="van-form__item van-hairline--bottom"
    :class="{ 'van-form__item--borderless': formItemBorder === false }"
  >
    <div class="van-form__item__header" v-if="$slots['form-item-header']">
      <slot name="form-item-header" :formItem="formItem" :formData="formData[formItem.name]"></slot>
    </div>
    <component
      :is="formItemTypes[formItem.formType]"
      v-model="formData[formItem.name]"
      v-bind="{ props: {}, ...defaultFieldProps, ...fieldProps, ...formItem, border: false }"
      :popupProps="{ ...defaultPopupProps, ...popupProps, ...formItem.popupProps }"
      :class="{ readonly: formItem.readonly ?? fieldProps.readonly }"
    />
    <div class="van-form__item__footer" v-if="$slots['form-item-footer']">
      <slot name="form-item-footer" :formItem="formItem" :formData="formData[formItem.name]"></slot>
    </div>
  </div>
</template>

<script setup name="VanFormItem">
import formItemTypes from './formItemTypes.js'

const { formItem, formData, fieldProps, popupProps } = defineProps({
  formItem: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  },
  popupProps: {
    type: Object,
    default: () => ({})
  }
})

// van-field 默认属性
const defaultFieldProps = {
  arrowDirection: 'down'
}

// van-popup 默认属性
const defaultPopupProps = {
  position: 'bottom',
  round: true,
  safeAreaInsetBottom: true
}

// 是否显示表单项内边框
const formItemBorder = computed(() => {
  const { border } = { ...fieldProps, ...formItem }
  return border
})
</script>

<style lang="scss" scoped>
.van-form__item {
  &::after {
    left: calc(-50% + var(--van-padding-md) * 2);
    right: calc(-50% + var(--van-padding-md) * 2);
  }
  &--borderless::after,
  &:last-child::after {
    display: none;
  }
}
</style>
