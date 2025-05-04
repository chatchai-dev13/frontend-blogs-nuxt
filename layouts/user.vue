<template>

    <div class="fixed-top">
        <nav class="navbar bg-body-tertiary">
            <div class="container">
                <NuxtLink to="/" class="navbar-brand">
                    <img src="/images/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24">
                </NuxtLink>
            </div>
        </nav>
    </div>

    <div class="container" style="margin-top: 80px;">
        <slot></slot>
    </div>    
</template>