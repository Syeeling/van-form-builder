<template>
  <div class="van-multiple-picker">
    <div v-if="showToolbar" class="van-picker__toolbar">
      <template v-if="enableSelectAll">
        <button type="button" class="van-picker__cancel van-haptics-feedback" @click="_handleSelectAll">
          {{ isAllSelected ? '取消' : '全选' }}
        </button>
      </template>
      <template v-else>
        <button
          v-if="cancelButtonText"
          type="button"
          class="van-picker__cancel van-haptics-feedback"
          @click="_handleCancel"
        >
          {{ cancelButtonText }}
        </button>
      </template>
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
    <div v-if="filterable" class="van-picker__search">
      <van-search
        v-model="searchValue"
        shape="round"
        :placeholder="filterPlaceholder"
        @search="_onSearch"
        @update:model-value="_onInput"
      />
    </div>
    <div class="van-picker__options">
      <van-checkbox-group v-model="selectedValues" ref="checkboxGroupRef">
        <van-cell
          v-for="(item, index) in filteredOptions"
          :key="index"
          :title="item.text"
          clickable
          @click="_toggle(index)"
        >
          <template #right-icon>
            <van-checkbox :name="item.value" :ref="el => (checkboxRefs[index] = el)" @click.stop />
          </template>
        </van-cell>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script setup name="VanMultiplePicker">
const {
  title,
  confirmButtonText,
  cancelButtonText,
  showToolbar,
  options,
  visibleOptionNum,
  filterable,
  filterTrigger,
  filterMethod,
  filterPlaceholder
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
  // 选项列表
  options: {
    type: Array,
    default: () => []
  },
  // 可见的选项个数
  visibleOptionNum: {
    type: [Number, String],
    default: 6
  },
  // 是否启用全选功能
  enableSelectAll: {
    type: Boolean,
    default: false
  },
  // 组件是否可筛选
  filterable: {
    type: Boolean,
    default: false
  },
  // 筛选触发方式
  filterTrigger: {
    type: String,
    default: 'search' // search | input
  },
  // 自定义筛选方法
  filterMethod: {
    type: Function
  },
  // 自定义筛选框占位符
  filterPlaceholder: {
    type: String,
    default: '请输入关键词搜索'
  }
})
// 当前选中项对应的值
const selectedValues = defineModel()
const emit = defineEmits(['confirm', 'cancel', 'toggleAll'])

const checkboxGroupRef = useTemplateRef('checkboxGroupRef')
const checkboxRefs = ref([])

// 选项区域高度(CSS值)
const optionsHeight = computed(() => `calc(var(--option-height) * ${+visibleOptionNum})`)

// 当前选中项
const selectedOptions = computed(() => {
  return options.filter(op => selectedValues.value.includes(op.value))
})
// 当前选中项对应的索引
const selectedIndexes = computed(() => {
  return selectedOptions.value.map(i => options.findIndex(j => j.value === i.value))
})
const selected = computed(() => ({
  selectedValues: selectedValues.value,
  selectedOptions: selectedOptions.value,
  selectedIndexes: selectedIndexes.value
}))

// 选项是否已经全部选中
const isAllSelected = computed(() => {
  return options.every(op => selectedValues.value.includes(op.value)) && options.length === selectedValues.value.length
})

// 搜索框的值
const searchValue = ref('')
// 经过筛选后的选项
const filteredOptions = ref(options)
// 默认筛选方法
function _defaultFilterMethod(value, options) {
  return value ? options.filter(op => op.text.includes(value)) : options
}
// 搜索框搜索事件
function _onSearch(value) {
  if (filterTrigger === 'search') {
    filteredOptions.value = filterMethod ? filterMethod(value, options) : _defaultFilterMethod(value, options)
  }
}
// 搜索框输入事件
function _onInput(value) {
  if (filterTrigger === 'input') {
    filteredOptions.value = filterMethod ? filterMethod(value, options) : _defaultFilterMethod(value, options)
  }
}

// 切换选项选中状态
function _toggle(index) {
  checkboxRefs.value[index].toggle()
}
// 切换所有复选框
function _toggleAll(status) {
  if (![undefined, true, false].includes(status)) {
    return console.warn('参数错误，toggleAll 方法的参数必须为 true、false 或 undefined')
  }
  checkboxGroupRef.value.toggleAll(status)
}

// 取消按钮点击事件
function _handleCancel() {
  emit('cancel', selected.value)
}
// 确认按钮点击事件
function _handleConfirm() {
  emit('confirm', selected.value)
}

// 全选/取消全选按钮点击事件
function _handleSelectAll() {
  _toggleAll(!isAllSelected.value)
  emit('toggleAll')
}

defineExpose({
  toggleAll: _toggleAll
})
</script>

<style lang="scss" scoped>
.van-multiple-picker {
  --van-picker-background: var(--van-background-2);
  --van-picker-toolbar-height: 88px;
  --van-picker-title-font-size: var(--van-font-size-lg);
  --van-picker-title-line-height: var(--van-line-height-md);
  --van-picker-action-padding: 0 var(--van-padding-md);
  --van-picker-action-font-size: var(--van-font-size-md);
  --van-picker-confirm-action-color: var(--van-primary-color);
  --van-picker-cancel-action-color: var(--van-text-color-2);
  --option-height: calc(var(--van-cell-line-height) + var(--van-cell-vertical-padding) * 2);
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
  height: v-bind(optionsHeight);
  overflow-y: auto;
}
</style>
