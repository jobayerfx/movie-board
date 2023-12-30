<template>
    <div :class="`bg-${bgColor} rounded p-4 my-4`">
        <div class="flex flex-row">
            <div class="basis-10/12">        
                <h3 :class="`font-normal text-lg text-${ color }`">Name: {{ movie?.name }}</h3>
                <span :class="`text-sm text-${ color }`">Review: {{ movie?.review }}</span>
            </div>
            <div class="basis-2/12 items-center self-center">
                <button class="rounded text-white bg-black w-10 text-sm"  @click="openModal">Edit</button>
            </div>
        </div>

        <!-- Modal Container -->
        <MovieForm
          :movie="movie"
          :editingMode="editingMode"
          @submitMovie="submitModal"
          @closeForm="closeModal"
          :isModalOpen="isModalOpen"
        />

    </div>
</template>

<script setup>
import { useMovieStore } from "~/stores/useMovieStore";
const moviesStore = useMovieStore();
const props = defineProps({
    movie: {
        type: Object,
        default: () => ({ name: '', review: '', status: 0 })
    },
    bgColor: {
        type: String,
        default: 'blue-600'
    },
    color: {
        type: String,
        default: 'white'
    }
})
const isModalOpen = ref(false);
const editingMode = ref(true);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  editingMode.value = false;
  isModalOpen.value = false;
};

const submitModal = (updatedMovie) => {
  moviesStore.updateMovie(updatedMovie)
  closeModal();
};
</script>