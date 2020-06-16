$(document).ready(function() {
  $(document).on('click','span.invio',
  function () {
    var testo = $('#text').val();
    console.log(testo);
    var cloneVerde = $('.riutilizzabili .template.green').clone();
    cloneVerde.removeClass('hidden');
    console.log(cloneVerde);
    console.log(cloneVerde.find('p').text());
    cloneVerde.find('p').text(testo);
    $('div.chat').append(cloneVerde);

  })
  });
