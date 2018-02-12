$('.group input[type=checkbox]').assure(checkbox => {
  $(checkbox.parentNode).on('click', e => {
    e.preventDefault();

    $(checkbox).trigger('change');

    if ($(e.target).attr('data-checkbox') !== 'true') {
      $(e.target).attr('data-checkbox', 'true');
      checkbox.value = '1';

      return;
    }

    $(e.target).attr('data-checkbox', 'false');
    checkbox.value = '';
  });
});

$('[data-dependee]').assure(dependee => {
  $(dependee).on('change', () => {
    $(`[data-require=${dependee.name}]`).assure(dependant => {
      if ($(dependant).attr('data-hide') !== null) {
        $(dependant).attr('data-hide', '');

        return;
      }

      $(dependant).attr('data-hide', 'true');
    });
  });
});
