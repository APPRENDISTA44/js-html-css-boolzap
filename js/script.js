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

 //quando premo sulla zona del testo cambia icona
  $('#text').focusin(function () {
    $('span.invio').removeClass('hidden');
    $('span.audio').addClass('hidden');
  });

  $('#text').focusout(function () {
    if ($('#text').val() == '') {
      $('span.invio').addClass('hidden');
      $('span.audio').removeClass('hidden');
    }

  })

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
    cloneVerde.find('.ultimo_accesso').text(catturaData());
    $('div.chat.active').append(cloneVerde);
    $('#text').val('');
    risposta();
    $('div.chat.active').scrollTop($('div.chat.active').height());
  }



  //funzione di risposta
  function risposta() {
    setTimeout(function() {
      var cloneBianco = $('.riutilizzabili .template.white').clone();
      cloneBianco.removeClass('hidden');
      cloneBianco.find('p').text('ok');
      cloneBianco.find('.ultimo_accesso').text(catturaData());
      $('div.chat.active').append(cloneBianco);
      $('div.chat.active').scrollTop($('div.chat.active').height());
    },1000)
  }

  //funzione di ricerca
  function ricerca() {
    if (event.which!=16) {
      var arrayScritto = $('#search').val().toLowerCase();
      console.log(arrayScritto);
      // console.log($('.elemento_lista').find('h3'));
      var nome = $('.elemento_lista').find('h3');
      nome.each(function () {
        var nomeCorrente = $(this).text().toLowerCase();
        // console.log(nomeCorrente);
        if (!(nomeCorrente.includes(arrayScritto))) {
          $(this).parents('.elemento_lista').addClass('hidden');
        }else {
          $(this).parents('.elemento_lista').removeClass('hidden');
        }
      });
    }
  }

  //funzione per catturare data
  function catturaData() {
    var d = new Date();
    var ora = d.getHours();
    var minuti = d.getMinutes();
    return addZero(ora) + ':' + addZero(minuti);
  }
  //funzione che aggiunge uno 0 se numero minore di 10, utile per orario
  function addZero(number) {
    if (number<10) {
      return '0' + number;
    }
    return number
  }
});
