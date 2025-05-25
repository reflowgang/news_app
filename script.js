const apiKey = 'fee0fe53c08044f1983bdd009acc38b1';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const newsContainer = document.getElementById('news-container');

function toggleTheme() {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
};

const path = window.location.pathname;
  if (path.includes("good-news")) fetchNews("good OR happy");
  else if (path.includes("bad-news")) fetchNews("conflict OR war OR crisis OR bad");
  else if (path.includes("climate")) fetchNews("climate change OR environment OR weather");
  else if (path.includes("news")) fetchNews("breaking news OR latest");


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = input.value.trim();
  if (keyword) {
    fetchNews(keyword);
  }
});

async function fetchNews(query) {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = '<p>No news found. Try a different keyword.</p>';
    }
  } catch (error) {
    newsContainer.innerHTML = '<p>Error fetching news. Check console.</p>';
    console.error(error);
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const item = document.createElement('div');
    item.classList.add('news-item');

    const image = document.createElement('img');
    image.src = article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image';
    item.appendChild(image);

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h2');
    title.textContent = article.title;
    content.appendChild(title);

    const description = document.createElement('p');
    description.textContent = article.description || 'No description available.';
    content.appendChild(description);

    const link = document.createElement('a');
    link.href = article.url;
    link.target = '_blank';
    link.textContent = 'Read more';
    link.style.color = '#1e88e5';
    link.style.textDecoration = 'none';
    content.appendChild(link);

    item.appendChild(content);
    newsContainer.appendChild(item);
  });
}
