<template>
  <div class="van-advanced-picker">
    <div v-if="showToolbar" class="van-picker__toolbar">
      <button
        v-if="cancelButtonText"
        type="button"
        class="van-picker__cancel van-haptics-feedback"
        @click="_handleCancel"
      >
        {{ cancelButtonText }}
      </button>
      <div class="van-picker__title van-ellipsis">{{ title }}</div>
      <button
        v-if="confirmButtonText"
        type="button"
        class="van-picker__confirm van-haptics-feedback"
        @click="_handleConfirm"
      >
        {{ confirmButtonText }}
      </button>
    </div>
    <div v-if="filterable" class="van-picker__filter">
      <slot name="filter-area" :search="_getFilteredOptions">
        <van-search
          v-model="searchValue"
          shape="round"
          :placeholder="filterPlaceholder"
          @search="val => _getFilteredOptions({ [filterField]: val })"
          @clear="() => _getFilteredOptions({ [filterField]: searchValue })"
        />
      </slot>
    </div>
    <div class="van-picker__options">
      <van-radio-group v-if="mode === 'single'" v-model="selectedValues">
        <van-cell
          v-for="(item, index) in filteredOptions"
          v-bind="item"
          :value="undefined"
          :key="index"
          clickable
          @click="selectedValues = item.value"
        >
          <template #icon>
            <van-radio :name="item.value" @click.stop />
          </template>
          <template #title v-if="$slots['option-title']">
            <slot name="option-title" v-bind="item"></slot>
          </template>
          <template #label v-if="$slots['option-label']">
            <slot name="option-label" v-bind="item"></slot>
          </template>
        </van-cell>
      </van-radio-group>
      <van-checkbox-group v-if="mode === 'multiple'" v-model="selectedValues">
        <van-cell
          v-for="(item, index) in filteredOptions"
          v-bind="item"
          :value="undefined"
          :key="index"
          clickable
          @click="_toggle(index)"
        >
          <template #icon>
            <van-checkbox :name="item.value" :ref="el => (checkboxRefs[index] = el)" @click.stop />
          </template>
          <template #title v-if="$slots['option-title']">
            <slot name="option-title" v-bind="item"></slot>
          </template>
          <template #label v-if="$slots['option-label']">
            <slot name="option-label" v-bind="item"></slot>
          </template>
        </van-cell>
      </van-checkbox-group>
      <van-empty v-if="filteredOptions.length <= 0" image="search" description="暂无数据" />
    </div>
  </div>
</template>

<script setup name="VanAdvancedPicker">
const {
  title,
  confirmButtonText,
  cancelButtonText,
  showToolbar,
  mode,
  getOptionsMethod,
  filterable,
  filterPlaceholder,
  filterField
} = defineProps({
  // 顶部栏标题
  title: {
    type: String,
    default: ''
  },
  // 确认按钮文字，设置为空字符串可以隐藏按钮
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  // 取消按钮文字，设置为空字符串可以隐藏按钮
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 是否显示顶部栏
  showToolbar: {
    type: Boolean,
    default: true
  },
  // 选择模式，single-单选，multiple-多选
  mode: {
    type: String,
    default: 'single',
    validator: value => ['single', 'multiple'].includes(value)
  },
  // 获取选项的方法
  getOptionsMethod: {
    type: Function,
    default: () => {}
  },
  // 组件是否可筛选
  filterable: {
    type: Boolean,
    default: false
  },
  // 自定义筛选框占位符
  filterPlaceholder: {
    type: String,
    default: '请输入关键词搜索'
  },
  // 自定义筛选字段
  filterField: {
    type: String,
    default: 'title'
  }
})

// 当前选中项对应的值
const selectedValues = defineModel()
const emit = defineEmits(['confirm', 'cancel'])

const checkboxRefs = ref([])

// 搜索关键词
const searchValue = ref('')

// 选项列表
const options = ref([])
// 经过筛选后的选项
const filteredOptions = ref([])

// 初始化选项
async function _initOptions() {
  await _getFilteredOptions()
  options.value = [...filteredOptions.value]
}
_initOptions()

// 获取筛选后的选项
async function _getFilteredOptions(params = {}) {
  filteredOptions.value = await getOptionsMethod(params)
}

// 切换选项选中状态
function _toggle(index) {
  checkboxRefs.value[index].toggle()
}

// 当前选中项
const selectedOptions = computed(() => {
  return options.value.filter(op => {
    return mode === 'single' ? op.value === selectedValues.value : selectedValues.value?.includes(op.value)
  })
})
// 当前选中项对应的索引
const selectedIndexes = computed(() => {
  return selectedOptions.value.map(i => options.value.findIndex(j => j.value === i.value))
})
const selected = computed(() => ({
  selectedValues: selectedValues.value,
  selectedOptions: selectedOptions.value,
  selectedIndexes: selectedIndexes.value
}))

// 取消按钮点击事件
function _handleCancel() {
  emit('cancel', selected.value)
}
// 确认按钮点击事件
function _handleConfirm() {
  emit('confirm', selected.value)
}

defineExpose({
  options
})
</script>

<style lang="scss" scoped>
.van-advanced-picker {
  --van-picker-background: var(--van-background-2);
  --van-picker-toolbar-height: 88px;
  --van-picker-title-font-size: var(--van-font-size-lg);
  --van-picker-title-line-height: var(--van-line-height-md);
  --van-picker-action-padding: 0 var(--van-padding-md);
  --van-picker-action-font-size: var(--van-font-size-md);
  --van-picker-confirm-action-color: var(--van-primary-color);
  --van-picker-cancel-action-color: var(--van-text-color-2);
  position: relative;
  background: var(--van-picker-background);
  user-select: none;
}
.van-picker__toolbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--van-picker-toolbar-height);
}
.van-picker__cancel,
.van-picker__confirm {
  height: 100%;
  padding: var(--van-picker-action-padding);
  font-size: var(--van-picker-action-font-size);
  background-color: transparent;
  border: none;
}
.van-picker__cancel {
  color: var(--van-picker-cancel-action-color);
}
.van-picker__confirm {
  color: var(--van-picker-confirm-action-color);
}
.van-picker__title {
  color: var(--van-text-color);
  max-width: 50%;
  font-weight: var(--van-font-bold);
  font-size: var(--van-picker-title-font-size);
  line-height: var(--van-picker-title-line-height);
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.van-picker__options {
  height: 680px;
  overflow-y: auto;
}
.van-radio,
.van-checkbox {
  margin-right: 30px;
}
.van-empty {
  --van-empty-image-size: 240px;
  margin-top: 60px;
}
</style>
