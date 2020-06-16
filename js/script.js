$(document).ready(function() {
  $(document).on('click','span.invio',
  function () {
    scrittura();
  });
  $('#text').keypress(function (event) {
    if (event.which == 13) {
      scrittura();
    }
  })

  //funzione di scrittura
  function scrittura() {
    var testo = $('#text').val();
    console.log(testo);
    var cloneVerde = $('.riutilizzabili .template.green').clone();
    cloneVerde.removeClass('hidden');
    console.log(cloneVerde);
    console.log(cloneVerde.find('p').text());
    cloneVerde.find('p').text(testo);
    $('div.chat').append(cloneVerde);
  }
  });
