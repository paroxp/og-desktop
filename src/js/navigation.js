$(document).on('click', '[data-active]', (e) => {
  const family = $(e.target).attr('data-active');

  $(family).removeClass('active');
  $(e.target).addClass('active');
});
