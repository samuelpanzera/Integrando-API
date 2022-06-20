const TMDB_ENDPOINT_BASE_SEARCH = 'https://api.themoviedb.org/3'
const API_KEY_SEARCH = '867304b3aa01eb018ca96fc57f0e53e5'
const TMDB_IMAGES_ENDPOINT_BASE = 'https://image.tmdb.org/t/p/w500'

async function redirecionaPesquisa() {
    let nomeFilme = $('#search').val();
    sessionStorage.setItem('busca', nomeFilme)
    
    window.location = "./pesquisa.html"
}

async function realizaPesquisa() {
    const filmeABuscar = sessionStorage.getItem('busca');

    return await $.ajax({
        url: TMDB_ENDPOINT_BASE_SEARCH + "/search/movie",
        data: {
            api_key: API_KEY_SEARCH,
            query: filmeABuscar
        }
    }).done(function(data) {
        return data;
    });
}

$(document).ready(function() {
    $('#btn_search').click(function(){
        let search = redirecionaPesquisa().then(function(data) {
            console.log(data)
            return data;
        });
    });

    realizaPesquisa().then((filmes) => filmes.results.map((filme) => $('#resultadosPesquisa').append(`
        <div class="cardPesquisa">
            <img class="imagemPesquisa" src=\"${TMDB_IMAGES_ENDPOINT_BASE + filme.poster_path}\">
            <div style="margin-top: 120px; margin-left: 15px;">
                <H3 id="nomeDoFilmeResultado">${filme.original_title}</H3>
                ${filme.overview}
            </div>
        </div>
    `)))
});
