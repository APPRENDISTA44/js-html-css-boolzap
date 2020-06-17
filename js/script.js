$(document).ready(function() {
  //eventi di invio messaggi
  $(document).on('click','span.invio',
  function () {
    scrittura();
  });
  $('#text').keypress(function (event) {
    if (event.which == 13) {
      scrittura();
    }
  });

  $('#search').keyup(function (event) {
    // console.log($('#search').val());
  ricerca();



  });


  //funzione di scrittura
  function scrittura() {
    var testo = $('#text').val();
    console.log(testo);
    var cloneVerde = $('.riutilizzabili .template.green').clone();
    cloneVerde.removeClass('hidden');
    console.log(cloneVerde);
    console.log(cloneVerde.find('p').text());
    cloneVerde.find('p').text(testo);
    $('div.chat.active').append(cloneVerde);
    $('#text').val('');
    risposta();
  }
  });


  //funzione di risposta
  function risposta() {
    setTimeout(function() {
      var cloneBianco = $('.riutilizzabili .template.white').clone();
      cloneBianco.removeClass('hidden');
      cloneBianco.find('p').text('ok');
      $('div.chat.active').append(cloneBianco);
    },1000)
  }

  //funzione di ricerca
  function ricerca() {
    if (event.which!=16) {
      var arrayScritto = $('#search').val();
      console.log(arrayScritto);
      // console.log($('.elemento_lista').find('h3'));
      var nome = $('.elemento_lista').find('h3');
      nome.each(function () {
        var nomeCorrente = $(this).text();
        // console.log(nomeCorrente);
        if (!(nomeCorrente.includes(arrayScritto))) {
          $(this).parents('.elemento_lista').addClass('hidden');
        }else {
          $(this).parents('.elemento_lista').removeClass('hidden');
        }
      });
    }
  }
