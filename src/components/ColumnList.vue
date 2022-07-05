<template>
  <div class="row">
    <div class="col-4" v-for="column in list" :key="column.columnId">
      <div class="card mb-3" style="width: 18rem;">
        <div class="card-body">
          <img :src="column.avatar" :alt="column.title" class="card-img-top mb-3">
          <h5>{{column.title}}</h5>
          <p>{{column.description}}</p>
          <router-link :to="{name:'detail', params: {columnId:column.columnId}}"><div class="btn btn-primary">进入专栏</div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  userId: number;
  columnId: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style>
  a {
    text-decoration: none;
    color: #ffffff
  }
</style>
