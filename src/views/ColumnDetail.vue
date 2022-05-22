<template>
  <!-- w-75：width 75% mx-auto: m：margin x：left and right-->
  <div class="column-detail-page w-75 mx-auto">

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { testData } from '../testData'
export default defineComponent({
  setup () {
    const route = useRoute()
    const id = route.params.id
  }
})
</script>
