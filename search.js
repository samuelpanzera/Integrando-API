const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMAGES_ENDPOINT_BASE = 'https://image.tmdb.org/t/p/w500'
const API_KEY = '867304b3aa01eb018ca96fc57f0e53e5'

async function redirecionaPesquisa() {
    let nomeFilme = $('#search').val();
    sessionStorage.setItem('busca', nomeFilme)
    
    window.location = "./pesquisa.html"
}

async function pegaDestaques() {
    return await $.ajax({
        url: TMDB_ENDPOINT_BASE + "/movie/popular",
        data: {
            api_key: API_KEY
        }
    }).done(function(data) {
        return data;
    });
}

async function pegaLancamento() {
    return await $.ajax({
        url: TMDB_ENDPOINT_BASE + "/movie/latest",
        data: {
            api_key: API_KEY
        }
    }).done(function(data) {
        console.log(data)
        return data;
    });
}

async function pegaImagem(movie_id) {
    return await $.ajax({
        url: TMDB_ENDPOINT_BASE + `/movie/${movie_id}/images`,
        data: {
            api_key: API_KEY
        }
    }).done(function(data) {
        return data;
    });
}

$(document).ready(function() {
    $('#btn_search').click(function(){
        let search = redirecionaPesquisa().then(function(data) {
            return data;
        });
    });

    pegaLancamento().then((movie) => {
        pegaImagem(movie.id).then((infoImagem) => {
            $('#imagemLancamento').append(`<a href=\"https://www.themoviedb.org/movie/${movie.id}-${movie.title}\"><img style=\"width: 150px;\" src=\"${TMDB_IMAGES_ENDPOINT_BASE + infoImagem.posters[0].file_path}\"></img></a>`)
        }).catch((err) => $('#imagemLancamento').html(`<a href=\"https://www.themoviedb.org/movie/${movie.id}-${movie.title}\"><p>Sem imagem disponivel</p></a>`))

        $('#nomeDoLancamento').html(movie.original_title)
        $('#sinopse').html(movie.overview)
    })

    pegaDestaques().then((result) => {
        result.results.slice(0, 5).map((movie) => $('#containerDestaques').append(`<a href=\"https://www.themoviedb.org/movie/${movie.id}-${movie.title}\"><img style=\"width: 150px;\" src=\"${TMDB_IMAGES_ENDPOINT_BASE + movie.poster_path}\"></img></a>`))
    })
});
