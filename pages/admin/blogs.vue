<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">จัดการ Blogs</h5>
      <hr>
      <button type="button" class="btn btn-primary" @click="() => { content = ' ' }"
        data-bs-toggle="modal" data-bs-target="#modal-add">เพิ่ม Blogs
      </button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered mt-4">
      <thead>
        <tr class="text-center">
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>***</th>
        </tr>
      </thead>
      <tbody v-if="size > 0">
        <tr v-for="(item, index) in items" :key="item.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal-edit"
                @click="fnGetSlug(item.slug)">แก้ไข
              </button>
              <button type="button" class="btn btn-danger btn-sm ms-1" @click="fnDel(item.id)">ลบ</button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4" class="text-danger text-center">ไม่มีข้อมูล</td>
        </tr>
      </tbody>
    </table>
  </div>

  <BlogFormModal 
    header-text="เพิ่ม Blogs" 
    v-model:title="title" 
    v-model:description="description"
    v-model:image="image"
    v-model:content="content"
    @submitForm="submitForm" 
    
  />

  <BlogFormEditModal 
    header-text="แก้ไข Blogs" 
    v-model:title_edit="title_edit" 
    v-model:description_edit="description_edit" 
    v-model:image_edit="image_edit" 
    v-model:image_edit_old="image_edit_old"
    v-model:content_edit="content_edit"
    @submitEditForm="submitEditForm" 
  />
</template>

<script setup>
import BlogFormModal from '@/components/BlogFormModal.vue'
import BlogFormEditModal from '@/components/BlogFormEditModal.vue'
import { addBlogs, getBlogs, getBlogsSlug, delBlogs, updateBlogs } from '@/services/blogService'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const items = ref()
const title = ref('')
const content = ref('')
const description = ref('')
const title_edit = ref('')
const content_edit = ref('')
const description_edit = ref('')
const image_edit = ref('')
const image_edit_old = ref('')
const id = ref('')
const size = ref(0)
const image = ref(null)

onMounted(async () => {
  fnGetBlogs()
})

const fnGetBlogs = async () => {
  const res = await getBlogs();
  items.value = res.data.item;
  size.value = res.data.item.length;
}

const submitForm = async () => {
  let chSize = document.getElementById('fileInput').files.length;
  if (!title.value.trim() || !content.value.trim() || !description.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "กรุณากรอกทั้ง Title, Content, Description!",
    });
  } else if (chSize <= 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "กรุณาใส่รูปภาพ!",
    });
  } else {
    const res = await addBlogs({ 
      title: title.value, 
      content: content.value,
      description: description.value,
      image: image.value
    })    

    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ.",
        showConfirmButton: false,
        timer: 1500
      });
    }

    fnGetBlogs()

    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-add'))
    modal.hide()

    // ล้างค่า
    title.value = ''
    content.value = ''  
    description.value = ''
    document.getElementById('fileInput').value = ''
  }
}

const fnGetSlug = async (slug) => {
  const res = await getBlogsSlug(slug);

  title_edit.value = res.data.title
  content_edit.value = res.data.content
  description_edit.value = res.data.description
  image_edit_old.value = res.data.image
  id.value = res.data.id
}

const submitEditForm = async () => {
  if (!title_edit.value.trim() || !content_edit.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "กรุณากรอกทั้ง Title และ Content!",
    });
  } else {
    const res = await updateBlogs(id.value, {
      title: title_edit.value,
      description: description_edit.value,
      image: image_edit.value,
      image_old: image_edit_old.value,
      content: content_edit.value
    })

    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "แก้ไขข้อมูลสำเร็จ.",
        showConfirmButton: false,
        timer: 1500
      });
    }

    fnGetBlogs()

    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-edit'))
    modal.hide()

  }
}

const fnDel = async (id) => {
  Swal.fire({
    title: "ต้องการลบ ข้อมูล?",
    text: "ใช่ หรือ ไม่!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่!",
    cancelButtonText: "ไม่!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await delBlogs(id);

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "ลบข้อมูลสำเร็จ.",
          showConfirmButton: false,
          timer: 1500
        });
      }

      fnGetBlogs()
    }
  });
}

</script>