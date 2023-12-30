<template>
    <div
            class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
            v-show="isModalOpen"
            >
            <!-- Modal Content -->
            <div class="bg-white p-6 rounded w-5/12">

                <!-- Input Field -->
                <input
                    type="text"
                    class="border rounded w-full py-3 px-3 focus:outline-none focus:border-blue-500 bg-slate-400 placeholder-gray-50 mb-4"
                    placeholder="Enter title"
                    v-model="editedMovie.name"
                />
                <input
                    type="text"
                    class="border rounded w-full py-3 px-3 focus:outline-none focus:border-blue-500 bg-slate-400 placeholder-gray-50"
                    placeholder="Enter review"
                    v-model="editedMovie.review"
                />

                <!-- Action Button -->
                <div class="flex items-center justify-center gap-4">
                    <button
                        class="mt-4 bg-green-500 hover:bg-greeen-700 text-white py-2 px-4 rounded"
                        @click="submitForm"
                        >
                        {{ editingMode ? 'Update' : 'Save' }}
                    </button>
                    <button
                        class="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                        @click="cancelForm"
                        >
                        Cancel
                    </button>
                </div>
                
            </div>
        </div>
</template>


<script setup>
const props = defineProps({
  movie: {
    type: Object,
    default: () => ({id: '', name: '', review: '' }),
  },
  editingMode: {
    type: Boolean,
    default: false,
  },
  isModalOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['submitMovie', 'closeForm'])

const editedMovie = ref({ ...props.movie });

const submitForm = () => {
  emit('submitMovie', editedMovie.value);
  closeForm();
};

const cancelForm = () => {
  closeForm();
};

const closeForm = () => {
  editedMovie.value = { ...props.movie };
  emit('closeForm');
};

watch(
  () => props.movie,
  () => {
    editedMovie.value = { ...props.movie };
  }
);

onMounted(() => {
  editedMovie.value = { ...props.movie };
});
</script>