<template>
    <div>
        <div class="items-center self-center">
            <button class="rounded text-white bg-green-700 hover:bg-green-600 w-32 text-base px-4 py-3"  @click="openModal">Add new</button>
        </div>
        <!-- Modal Container -->
        <MovieForm
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
const isModalOpen = ref(false);
const editingMode = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  editingMode.value = false;
  isModalOpen.value = false;
};

const submitModal = (newMovie) => {
  moviesStore.addMovie(newMovie)
  closeModal();
};
</script>