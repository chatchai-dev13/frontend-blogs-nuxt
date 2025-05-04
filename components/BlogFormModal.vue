<template>
    <div class="modal fade" id="modal-add" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel">{{ headerText }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" v-model="title" placeholder="หัวข้อบล็อก">
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" v-model="description" placeholder="Leave a comment here"
                            style="height: 100px"></textarea>
                        <label for="floatingTextarea2">Description</label>
                    </div>
                    <div class="mb-3">
                        <div>
                            <label for="formFileLg" class="form-label">Cover</label>
                            <input class="form-control form-control-lg" type="file" id="fileInput" @change="onFileChange">
                        </div>
                    </div>
                    <div class="mb-3">
                        <ClientOnly>
                            <Quill v-model:content="content" />
                        </ClientOnly>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="$emit('submitForm')">บันทึก</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Quill from '~/components/Quill.vue'
import Swal from 'sweetalert2'

defineEmits(['submitForm']);

const title = defineModel('title');
const content = defineModel('content');
const description = defineModel('description');
const image = defineModel('image');

const props = defineProps({
    headerText: String,
});

const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        const maxSizeInMB = 2;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `ไฟล์มีขนาดใหญ่เกิน ${maxSizeInMB}MB.`,
            });
            event.target.value = '';
            return;
        }

        reader.onload = () => {
            const base64String = reader.result;
            image.value = base64String
        };

        reader.readAsDataURL(file); // แปลงเป็น Base64
    }
}

</script>