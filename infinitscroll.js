 window.addEventListener('scroll', function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      var nextLink = document.querySelector('.blog-pager-older-link');
      if (nextLink && !nextLink.classList.contains('loading')) {
        nextLink.classList.add('loading');
        fetch(nextLink.href)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const posts = doc.querySelectorAll('#main .blog-posts > *');
            posts.forEach(post => document.querySelector('#main .blog-posts').appendChild(post));
            const newPager = doc.querySelector('.blog-pager-older-link');
            if (newPager) nextLink.href = newPager.href;
            else nextLink.remove();
            nextLink.classList.remove('loading');
          });
      }
    }
  });
