const SUPABASE_URL = 'https://odhqmuegnvltlcdmnpqi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaHFtdWVnbnZsdGxjZG1ucHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjI0MDUsImV4cCI6MjA3Njk5ODQwNX0.ao72dJdl9OxHOgudm14ew4a7ofKan8iKXemKfvF3HDU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarPosts() {
    const container = document.querySelector('.blog-container');
    container.innerHTML = '<p>Carregando posts...</p>';

    const { data: posts, error } = await supabase
        .from('lss-posts')
        .select('id_post, titulo_post, desc_post, corpo_post-pt1, corpo_post-pt2, corpo_post-pt3, url_imagem, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao carregar posts:', error);
        container.innerHTML = '<p>Erro ao carregar posts 😢</p>';
        return;
    }

    container.innerHTML = ''; 
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('blog-card');
        article.innerHTML = `
      <div class="img-blog-wrapper">
        <img src="${post.url_imagem}" alt="Imagem do blog ${post.titulo_post}">
      </div>
      <div class="card-content">
        <h3 class="blog-title">${post.titulo_post}</h3>
        <p class="blog-description">${post.desc_post}</p>
        <a href="#" class="read-more"   >Leia Mais ></a>
      </div>
    `;
        container.appendChild(article);
    });
}
document.addEventListener('DOMContentLoaded', carregarPosts);