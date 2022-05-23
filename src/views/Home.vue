<template>
  <column-list :list="list"></column-list>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>

<style>

</style>
