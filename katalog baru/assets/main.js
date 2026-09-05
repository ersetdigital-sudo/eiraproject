document.addEventListener('click', function (e) {
  var t = e.target.closest ? (e.target.closest('.thumb, .size, .size-toggle') || e.target) : e.target;

  if (t.classList && t.classList.contains('thumb')) {
    var main = document.getElementById('main');
    if (main) main.src = t.src;
    document.querySelectorAll('.thumb').forEach(function (el) { el.removeAttribute('data-active'); });
    t.setAttribute('data-active', 'true');
  }

  if (t.classList && t.classList.contains('size')) {
    document.querySelectorAll('.size').forEach(function (el) { el.removeAttribute('data-active'); });
    t.setAttribute('data-active', 'true');
  }

  if (t.classList && t.classList.contains('size-toggle')) {
    e.preventDefault();
    var s = document.getElementById('sizechart');
    if (s) {
      s.classList.toggle('hidden');
      if (!s.classList.contains('hidden')) s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
