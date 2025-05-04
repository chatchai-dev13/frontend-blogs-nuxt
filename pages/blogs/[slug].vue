<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-2 border-0">
        <div class="card-body p-0">
          <h5 class="card-title">{{ blogs.title }}</h5>
          <div class="text-start mb-2">
            <NuxtLink :to="`/`" class="nav-link">
              <span class="badge text-bg-info">อ่านบทความอื่น คลิก</span>
            </NuxtLink>
          </div>
          <p>{{ blogs.description }}</p>
        </div>
      </div>

      <div v-html="blogs.content" class="quill-content"></div>
    </div>
  </div>
</template>

<script setup>
import { BASE_API_URL } from '~/utils/constants.js'
import { useRoute } from 'vue-router';

const route = useRoute()

const start = performance.now()
const { data } = await useAsyncData('slug', () => $fetch(`${BASE_API_URL}/blogs/${route.params.slug}`))
const end = performance.now()
console.log(`API Response Time: ${Math.round(end - start)} ms`)

const blogs = computed(() => data.value)

definePageMeta({
  layout: 'user',
  prerender: true
})

watchEffect(() => {
  if (blogs.value) {
    useHead({
      title: blogs.value.title,
      meta: [
        { name: 'description', content: blogs.value.description },
        { property: 'og:title', content: blogs.value.title },
        { property: 'og:description', content: blogs.value.description },
        { property: 'og:image', content: blogs.value.image }
      ]
    })
  }
})

</script>