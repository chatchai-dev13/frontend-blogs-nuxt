<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Chatchai Suaddee</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item overflow-hidden d-block d-md-none mobile-sidebar">
                        <NuxtLink to="/admin" class="nav-link">
                            Dashboard
                        </NuxtLink>
                    </li>
                    <li class="nav-item overflow-hidden d-block d-md-none mobile-sidebar">
                        <NuxtLink to="/admin/blogs" class="nav-link">
                            Blogs
                        </NuxtLink>
                    </li>
                </ul>
                <div class="d-flex">
                    <span class="badge text-bg-success p-2">Hello : {{ user?.name }}</span>
                    <button class="btn btn-danger btn-sm ms-2" @click="fnLogout()">Logout</button>
                </div>
            </div>
        </div>
    </nav>

    <div class="d-flex">
        <!-- Sidebar -->
        <div id="sidebar"
            class="d-flex flex-column p-3 position-fixed overflow-hidden d-none d-md-block desktop-sidebar"
            style="top: 3.4rem;">
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <NuxtLink to="/admin" :class="['nav-link', route.path === '/admin' ? 'active bg-primary' : '']">
                        Dashboard
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/blogs"
                        :class="['nav-link', route.path.startsWith('/admin/blogs') ? 'active bg-primary' : '']">
                        Blogs
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="flex-grow-1 p-3 overflow-hidden ml-responsive" style="margin-top: 3.4rem;">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { useAdmin } from "../composables/useAdmin"
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
  title: 'Admin',
})

const {
    fnLogout
} = useAdmin();

const user = useCookie("user").value;

</script>

<style scoped>
body {
    overflow-x: hidden;
}

#sidebar {
    min-height: 100vh;
    width: 250px;
    background-color: #343a40;
    color: white;
}

#sidebar .nav-link {
    color: white;
}

#sidebar .nav-link:hover {
    background-color: #495057;
}

.ml-responsive {
  margin-left: 0px;
}

@media (min-width: 768px) {
  .ml-responsive {
    margin-left: 250px;
  }
}
</style>