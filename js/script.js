$(document).ready(function() {
  
  //eventi di invio messaggi
  $(document).on('click','span.invio',
  function () {
    scrittura();
    $('span.invio').addClass('hidden');
    $('span.audio').removeClass('hidden');
  });
  $('#text').keypress(function (event) {
    if (event.which == 13 && $('#text').val() != '') {
      scrittura();
    }
  });

 //quando premo sulla zona del testo cambia icona
  $('#text').focusin(function () {
    $('span.invio').removeClass('hidden');
    $('span.audio').addClass('hidden');
  });
//quando esco se il testo è vuoto torna l'icona audio
  $('#text').focusout(function () {
    if ($('#text').val() == '') {
      $('span.invio').addClass('hidden');
      $('span.audio').removeClass('hidden');
    }

  })
  //gestisco ricerca chat
  $('#search').keyup(function (event) {
  ricerca();
  });
  //gestisco cancellazione messaggio
  $(document).on('click','span.option',
  function () {
    $(this).siblings('ul.dropdown').toggleClass('hidden')
    //quando clicco per una dropdown le altre scompaiono
    $(this).parents('.template').siblings('.template').find('.dropdown').addClass('hidden');

  });
  //oltre a eliminare il messaggio, controllo se è l'ultimo, in tal caso aggiorno anche
  //l'ultimo messaggio nella lista chat
  $(document).on('click','li.delete',
  function () {
    var chatAttuale = $(this).parents('.chat').attr('data-chat');
    var controlloUltimoMessaggio = $('ul.lista_contatti li[data-contact="' + chatAttuale +'"]').find('.last_message');
    $(this).parents('.template').remove();
    var nuovoUltimoMessaggio = $('.chat.active').children('.template:last-child').find('.contenuto').text();
    $('ul.lista_contatti li[data-contact="' + chatAttuale +'"]').find('.last_message').text(nuovoUltimoMessaggio);
    console.log(chatAttuale);
    console.log(controlloUltimoMessaggio);
    console.log(nuovoUltimoMessaggio);
  });

//gestisco visualizzazione chat
$(document).on('click','li.elemento_lista',
function () {
  //cambio colore nella lista per evidenziare chat corrente
  $(this).addClass('selected');
  $(this).siblings('li').removeClass('selected');
  //gestisco logica per fare apparire la chat giusta
  var dataContact = $(this).attr('data-contact');
  console.log(dataContact);
  var selettore = '.chat_window div[data-chat="' + dataContact +'"]'
  console.log($(selettore));
  $(selettore).siblings('.chat.active').removeClass('active');
  $(selettore).addClass('active');
  //gestisco logica per fare apparire in alto dati persona selezionata
  var immagine = $(this).find('img').attr('src');
  var nome = $(this).find('.nome').text();
  var ultimo_accesso = $(this).find('.ultimo_accesso').text();
  $('.header_right img').attr('src',immagine);
  $('.header_right .nome').text(nome);
  $('.header_right .ultimo_accesso').text(ultimo_accesso);
});




  //funzione di scrittura
  function scrittura() {
    var testo = $('#text').val();
    var cloneVerde = $('.riutilizzabili .template.green').clone();
    cloneVerde.removeClass('hidden');
    console.log(cloneVerde);
    console.log(cloneVerde.find('p').text());
    cloneVerde.find('p').text(testo);
    cloneVerde.find('.ultimo_accesso').text(catturaData());
    var chatAttuale = $('div.chat.active').attr('data-chat');
    $('div.chat.active').append(cloneVerde);
    //cambio ultimo messaggio
    $('ul.lista_contatti li[data-contact="' + chatAttuale +'"]').find('.last_message').text(testo);
    $('#text').val('');
    risposta(chatAttuale);
    $('div.chat.active').scrollTop($('div.chat.active').height());
    //cambio ora anche nella lista chat
    $('.elemento_lista.selected').find('.ultimo_accesso').text(catturaData());

  }

  //funzione di risposta
  function risposta(chat) {
    setTimeout(function() {
      var testo = 'ok'
      var cloneBianco = $('.riutilizzabili .template.white').clone();
      cloneBianco.removeClass('hidden');
      cloneBianco.find('p').text(testo);
      cloneBianco.find('.ultimo_accesso').text(catturaData());
      //rispondo alla chat corretta
      var chatAttuale = '.chat_window div[data-chat="' + chat +'"]';
      $(chatAttuale).append(cloneBianco);
      //cambio ultimo messaggio
      $('ul.lista_contatti li[data-contact="' + chat +'"]').find('.last_message').text(testo);
      $(chatAttuale).scrollTop($(chatAttuale).height());
      $('.elemento_lista.selected').find('.ultimo_accesso').text(catturaData());
      //cambio ora anche nella lista chat
      $('.elemento_lista.selected').find('.ultimo_accesso').text(catturaData());
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
