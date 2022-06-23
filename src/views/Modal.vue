<template>
  <div v-if="modalIsShow" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" @click="changShowState" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{content}}</p>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          <button type="button" @click="changShowState" class="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Modal',
  setup () {
    const store = useStore()

    //  get props by global store
    const modalIsShow = computed(() => store.state.GlobalModal.isShow)
    const content = computed(() => store.state.GlobalModal.content)
    const title = computed(() => store.state.GlobalModal.title)

    //  change the status of display
    const changShowState = () => {
      store.state.GlobalModal.isShow = !store.state.GlobalModal.isShow
    }

    // handle function while click outside of the modal
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (e.target.className === 'modal') {
          changShowState()
        }
      }
    }

    return {
      modalIsShow,
      handleClick,
      title,
      content,
      changShowState
    }
  }
})
</script>
<style scope>
  .modal{
    position: fixed;
    top: 0;
    left: 0;
    display: inherit;
  }
</style>
