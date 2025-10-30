const SUPABASE_URL = 'https://odhqmuegnvltlcdmnpqi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaHFtdWVnbnZsdGxjZG1ucHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjI0MDUsImV4cCI6MjA3Njk5ODQwNX0.ao72dJdl9OxHOgudm14ew4a7ofKan8iKXemKfvF3HDU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarPost() {

    const params = new URLSearchParams(window.location.search);
    let slug = params.get('slug');

    if (!slug) {
        slug = window.location.pathname.split('/').pop();
    }

    if (!slug) {
        document.body.innerHTML = "<h2>Post não encontrado 😢</h2>";
        return;
    }

    const { data, error } = await supabase
        .from('lss-posts')
        .select('*')
        .eq('slug-post', slug)
        .single();

    if (error || !data) {
        document.body.innerHTML = "<h2>Erro ao carregar o post 😢</h2>";
        console.error(error);
        return;
    }

    document.title = data.titulo_post;
    document.querySelector('.post-title').textContent = data.titulo_post;
    document.querySelector('.post-title').alt = data.titulo_post;
    document.querySelector('.image-credit-link').textContent = data.url_imagem;
    document.querySelector('.post-date').textContent = new Date(data.created_at).toLocaleDateString('pt-BR');
    document.querySelector('.post-image').src = data.url_imagem;
    document.querySelector('.post-content').innerHTML = `
        <h2>${data['subtitulo-corpo-pt1'] || ''}</h2>
        <p>${data['corpo_post-pt1'] || ''}</p>
        <h2>${data['subtitulo-corpo-pt2'] || ''}</h2>
        <p>${data['corpo_post-pt2'] || ''}</p>
        <h2>${data['subtitulo-corpo-pt3'] || ''}</h2>
        <p>${data['corpo_post-pt3'] || ''}</p>
        <h2>${data['subtitulo-corpo-pt4'] || ''}</h2>
        <p>${data['corpo_post-pt4'] || ''}</p>
    `;

    /* abaixo vai o código que mostra as sugestões no final do artigo */
    const container = document.querySelector('.blog-container');
    container.innerHTML = '<p>Carregando posts...</p>';

    const { data: posts, err } = await supabase
        .from('lss-posts')
        .select('id_post, titulo_post, slug-post, desc_post, corpo_post-pt1, subtitulo-corpo-pt2, corpo_post-pt2, subtitulo-corpo-pt3, corpo_post-pt3, subtitulo-corpo-pt4, corpo_post-pt4, url_imagem, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao carregar posts:', err);
        container.innerHTML = '<p>Erro ao carregar posts 😢</p>';
        return;
    }

    container.innerHTML = '';
    /* 
              colocar este link em produção -> | <a href="/blog/${post['slug-post']}">Leia mais ></a>
    */
    posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('blog-card');
        article.classList.add('suggestion-card');
        article.innerHTML = `
        <div class="wrap-suggestions">
            <a href="/blog/post.html?id=${post.id_post}&slug=${post['slug-post']}" class="post-suggestion">
                <h3 class="blog-title">${post.titulo_post}</h3>
            </a>
        </div>
    `;
        container.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', carregarPost);
