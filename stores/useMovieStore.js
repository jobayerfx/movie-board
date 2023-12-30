import {defineStore} from "pinia";

export const useMovieStore = defineStore('movie', () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const movies = ref([]);
    const loading = ref(false);
    const keyword = ref('')
    const totalFound = ref(0);

    //Getter
    const searchItems = computed(() => {
        if (keyword.value && keyword.value.length >= 4) {
            // fetchMovies();
            const { $utils } = useNuxtApp()
            const regex = $utils.string_to_regex('*' + keyword.value + '*')
            return movies.value.filter(item => {
                return regex.test(item.name)
            })
        }
    })

    const watchList = computed(() => {
        return movies.value.filter(movie => movie.status === 0);
    })
    const watching = computed(() => {
        return movies.value.filter(movie => movie.status === 1);
    })
    const watched = computed(() => {
        return movies.value.filter(movie => movie.status === 2);
    })


    // Actions
    const fetchMovies = async (opts = {}, callback = null) => {

        movies.value = [];
        loading.value = true;

        const { data, pending, error, refresh } = await useFetch(`${apiBase}/api/movies`, {
            // query: getQueryParams(),
            onResponse: ({response}) => {
                totalFound.value = parseInt(response.headers.get('X-Total-Count'));
            },
            ...opts
        });

        loading.value = false;

        if(data && !pending.value && !error.value) {
            movies.value = data.value;
        }
    }
    const doSearch = async () => {
        loading.value = true;
        const { data, pending, error, refresh } = await useFetch(`${apiBase}/api/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"title_like": keyword.value}),
          });

        if(data && !pending.value && !error.value) {
          movies.value = data.value;
        }
    }
    const addMovie = (newMovie) => {
        newMovie = { ...newMovie, id: movies.value.length + 1, status: 0 }
        movies.value.push(newMovie);
        updateMovies();
    };
    const updateMovie = (updatedMovie) => {
        const index = movies.value.findIndex(movie => movie.id === updatedMovie.id);
        if (index !== -1) {
            movies.value[index] = updatedMovie;
            updateMovies();
        }
    }

    const moveMovie = ({ movieId, fromStatus }) => {
        const index = movies.value.findIndex(movie => movie.id === movieId.value);
        if (index !== -1) {
            let toStatus = fromStatus.value < 2 ? ++fromStatus.value : --fromStatus.value;
            movies.value[index].status = toStatus;
            updateMovies();
        }
    }
    const updateMovies = async () => {
        // Update the movies on the server
        const { data, pending, error, refresh } = await useFetch(`${apiBase}/api/movies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movies.value),
        });
    }
    const getMoviesByStatus = (statusId) => {
        return movies.value.filter(movie => movie.status === statusId);
    }

    return {
        movies,
        loading,
        totalFound,
        fetchMovies,
        addMovie,
        moveMovie,
        updateMovie,
        keyword,
        doSearch,
        watchList,
        watching,
        watched
    }
});