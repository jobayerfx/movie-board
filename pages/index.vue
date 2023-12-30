<script setup lang="ts">
    useHead({
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'My movie list'
        },
        {
          name: 'og:description',
          content: 'My movie list'
        },
        {
          name: 'og:title',
          content: 'Homepage'
        }
      ]
    })
</script>

<template>
    <Home />
</template>
