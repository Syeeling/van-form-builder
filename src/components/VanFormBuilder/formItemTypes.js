export default {
  input: () => import('./VanFormItems/Input.vue'),
  radio: () => import('./VanFormItems/Radio.vue'),
  checkbox: () => import('./VanFormItems/Checkbox.vue'),
  cascader: () => import('./VanFormItems/Cascader.vue'),
  rate: () => import('./VanFormItems/Rate.vue'),
  switch: () => import('./VanFormItems/Switch.vue'),
  stepper: () => import('./VanFormItems/Stepper.vue'),
  slider: () => import('./VanFormItems/Slider.vue'),
  uploader: () => import('./VanFormItems/Uploader.vue'),
  select: () => import('./VanFormItems/Select.vue'),
  datePicker: () => import('./VanFormItems/DatePicker.vue'),
  timePicker: () => import('./VanFormItems/TimePicker.vue'),
  pickerGroup: () => import('./VanFormItems/PickerGroup.vue'),
  multipleSelect: () => import('./VanFormItems/MultipleSelect.vue'),
  customize: () => import('./VanFormItems/Customize.vue')
}
