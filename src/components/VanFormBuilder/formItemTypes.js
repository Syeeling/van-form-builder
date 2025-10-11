export default {
  input: defineAsyncComponent(() => import('./VanFormItems/Input.vue')),
  radio: defineAsyncComponent(() => import('./VanFormItems/Radio.vue')),
  checkbox: defineAsyncComponent(() => import('./VanFormItems/Checkbox.vue')),
  cascader: defineAsyncComponent(() => import('./VanFormItems/Cascader.vue')),
  rate: defineAsyncComponent(() => import('./VanFormItems/Rate.vue')),
  switch: defineAsyncComponent(() => import('./VanFormItems/Switch.vue')),
  stepper: defineAsyncComponent(() => import('./VanFormItems/Stepper.vue')),
  slider: defineAsyncComponent(() => import('./VanFormItems/Slider.vue')),
  uploader: defineAsyncComponent(() => import('./VanFormItems/Uploader.vue')),
  select: defineAsyncComponent(() => import('./VanFormItems/Select.vue')),
  datePicker: defineAsyncComponent(() => import('./VanFormItems/DatePicker.vue')),
  timePicker: defineAsyncComponent(() => import('./VanFormItems/TimePicker.vue')),
  pickerGroup: defineAsyncComponent(() => import('./VanFormItems/PickerGroup.vue')),
  multipleSelect: defineAsyncComponent(() => import('./VanFormItems/MultipleSelect.vue')),
  customize: defineAsyncComponent(() => import('./VanFormItems/Customize.vue'))
}
