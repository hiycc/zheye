<template>
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{title}}</a>
  <ul v-if="isOpen" class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="display: block;">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DropDown',
  props: ['title'],
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen, toggleOpen
    }
  }
})
</script>
