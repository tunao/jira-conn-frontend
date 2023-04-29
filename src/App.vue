<template>
  <v-app>

    <v-main>
      <Issues/>
    </v-main>
  </v-app>
</template>

<script>

import Issues from './components/Issues.vue'

export default {
  name: 'App',

  components: {
      Issues
  },

  data: () => ({
    //
  }),
};
</script>
