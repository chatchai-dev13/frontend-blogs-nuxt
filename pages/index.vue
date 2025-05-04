<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-6 col-lg-6 p-2" v-for="item in blogs.item" :key="item.id">
      <div class="card" style="cursor: pointer !important;">
        <NuxtLink :to="`/blogs/${item.slug}`" class="nav-link">
          <div class="card-body">
            <h5 class="card-title" style="border-bottom: 2px solid gray;">{{ item.title }}</h5>
            <div class="row">
              <div class="col-4">
                <NuxtImg :src="`${blogs.url}/${item.image}`" class="card-img-top h-responsive" :alt="item.slug" format="webp"
                  fit="cover" quality="50" />
              </div>
              <div class="col-8">
                {{ item.description }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BASE_API_URL } from '~/utils/constants.js'

definePageMeta({
  layout: 'user',
  prerender: true
})

const start = performance.now()
const { data } = await useAsyncData('blogs', () => $fetch(`${BASE_API_URL}/blogs`))
const end = performance.now()
console.log(`API Response Time: ${Math.round(end - start)} ms`)

const blogs = computed(() => data.value)

useHead({
  title: 'Blogs',
  meta: [
    { name: 'description', content: 'คำอธิบายหน้าแบบ dynamic' },
    { property: 'og:title', content: 'OG Title' },
    { property: 'og:description', content: 'OG Description' },
    { property: 'og:image', content: '/images/bootstrap-logo.svg' }
  ]
})

</script>

<style>
.quill-content img {
  width: 100%;
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.h-responsive {
  height: auto;
}

@media (min-width: 768px) {
  .h-responsive {
    height: 150px;
  }
}
</style>