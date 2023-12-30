<script setup>
    import {storeToRefs} from "pinia";
    import { useMovieStore } from "~/stores/useMovieStore";
    const moviesStore = useMovieStore();
    const { keyword, doSearch } = storeToRefs(moviesStore);

    const makeSearch = () => {
        moviesStore.doSearch();
    }
</script>
<template>
    <div class="flex items-center justify-center p-10 gap-20">
        <form class="flex items-center" @submit.prevent="makeSearch">  
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <input type="text" id="simple-search" class="text-base rounded w-full font-medium ps-6 p-2.5" placeholder="Type here..." v-model="keyword">
            </div>
            <button type="button" class="p-3 px-8 ms-2 text-sm font-medium  bg-white hover:bg-slate-100 rounded" @click="makeSearch">
                Search
            </button>
        </form>
        <div class="self-end">
            <NewMovie />
        </div>
    </div>

</template>