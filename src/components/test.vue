<template>
  <input type="text"
    :class= { 'invalid': }
  >

</template>
<script lang="ts">
import { defineComponent } from 'vue'
interface RuleProp{
  type: string;
  message: string;
}
type RulesProp = RuleProp[]

export default defineComponent({
  name: 'validateTool',
  
})
</script>

<style>
.invalid {
  border: 1px solid red;
}
</style>