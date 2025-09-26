<template>
  <van-field v-if="inField" v-bind="$attrs">
    <template #input>
      <component :is="$attrs.component" v-bind="$attrs" />
    </template>
  </van-field>
  <component v-else :is="$attrs.component" />
</template>

<script setup name="Customize">
const { inField } = defineProps({
  inField: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
