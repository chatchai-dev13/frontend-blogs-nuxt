<template>
    <div>
        <div ref="editorContainer" style="height: 350px;" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editorContainer = ref(null)
const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:content'])
let quillInstance = null

function initQuill() {
    quillInstance = new Quill(editorContainer.value, {
        theme: 'snow',
        placeholder: 'Write something...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video', 'formula'],
                [{ header: 1 }, { header: 2 }],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean']
            ]
        }
    })

    quillInstance.root.innerHTML = props.content
    quillInstance.on('text-change', () => {
        emit('update:content', quillInstance.root.innerHTML)
    })
}

onMounted(() => {
    initQuill()
})

watch(
    () => props.content,
    (newContent) => {
        if (quillInstance && newContent !== quillInstance.root.innerHTML) {
            quillInstance.root.innerHTML = newContent || ''
        }
    }
)

onBeforeUnmount(() => {
    if (quillInstance) {
        quillInstance = null
    }
})
</script>