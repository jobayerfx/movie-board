<template>
    <div :class="`rounded py-4 pl-4 pr-2 bg-${bgColor}`">

      <h3 class="text-center text-lg mb-4 font-semibold">{{ name }}</h3>
        <div class="h-96 overflow-y-scroll custom-scrollbar">
          <div class="w-full ml-auto ">
            <draggable
              tag="div"
              group="all-movies"
              class="draggable-list pr-2"
              ghost-class="moving-card"
              :list="movies"
              :item-key="movie => movie.id"
              :animation="200"
              @change="onDragEnd"
            >
            <template #item="{ element }">
                <MovieCard
                  :movie="element"
                  :bg-color="cardBg"
                  :color="color"
                />
            </template>

            </draggable>
        </div>
      </div>

      <div class="bg-slate-200"></div>
      <div class="bg-violet-700"></div>
      <div class="bg-green-500"></div>
      <div class="bg-orange-300"></div>
      <div class="bg-neutral-400"></div>
      <div class="bg-blue-200"></div>
    </div>
</template>
<script setup>
// import {storeToRefs} from "pinia";
import { useMovieStore } from "~/stores/useMovieStore";
const moviesStore = useMovieStore();
import Draggable from "vuedraggable";
const props = defineProps({
    name: {
        type: String,
        default: 'Watch List'
    },
    movies: {
        type: Array,
        default: () => []
    },
    bgColor: {
        type: String,
        default: 'green-500'
    },
    cardBg: {
        type: String,
        default: 'violet-700'
    },
    color: {
        type: String,
        default: 'black'
    }
})
const movieId = ref(null);
const fromStatus = ref(null);
// const newIndex = ref(null);

const onDragEnd = (event) => {
  if(event.added){
    movieId.value = event.added.element['id']
    fromStatus.value = event.added.element['status']
    moviesStore.moveMovie({ movieId, fromStatus });
  }
};
</script>
<style scoped>
    /* Custom scrollbar styles */
    .custom-scrollbar::-webkit-scrollbar {
      width: 16px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      /* background-color: #cbd5e0; */
      border-radius: 6px;
    }

  .draggable-list {
    min-height: 100px;
  }

  .moving-card {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
  }
  </style>