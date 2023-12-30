
import type { MovieList } from '#build/components';
<script setup lang="js">
import {storeToRefs} from "pinia";
import { useMovieStore } from "~/stores/useMovieStore";
const moviesStore = useMovieStore();
const {movies, watchList, watching, watched, loading} = storeToRefs(moviesStore);
await moviesStore.fetchMovies();
</script>
<template>
    <div class="bg-red-200">
        <div class="container mx-auto px-20 py-10">
            <Search />
            <div class="grid grid-cols-3 gap-32">
                <div>
                    <MovieList
                        name="Watch List"
                        :movies="watchList"
                        bg-color="orange-300"
                        card-bg="slate-200"
                        color="black"
                    />
                </div>
                <div>
                    <MovieList
                        name="Watching"
                        :movies="watching"
                        bg-color="blue-200"
                        card-bg="violet-700"
                        color="white"
                    />
                </div>
                <div>
                    <MovieList
                        name="Watched"
                        :movies="watched"
                        bg-color="green-500"
                        card-bg="neutral-400"
                        color="black"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
</style>