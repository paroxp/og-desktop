$(document).on('keyup', 'body', e => {
  if (e.key === 'Alt') {
    $('body > footer').toggleClass('active');
  }
});
