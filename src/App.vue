<template>
  <div class="app">
    <NavbarMenu/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarMenu from '@/components/NavbarMenu.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavbarMenu,
  }
})
</script>
