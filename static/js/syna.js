var selfCheck = "checkSelf";

$.validate({
  modules: 'html5, toggleDisabled',
  validateOnEvent: true,
  onError: function($form) {
    $('form[id=' +  $form.attr('id') +'] .error').removeClass('d-none');
 },
  onSuccess: function($form) {
    if (selfCheck != "checkSelf") {
      $('form[id=' +  $form.attr('id') +'] .generic-error').removeClass('d-none');
      return false;
    }
    if ($('.g-recaptcha').length == 0) {
      $.post($('#' + $form.attr('id')).attr('action'), $('#' + $form.attr('id')).serialize(), function(){
      }, 'json')
      .fail(function(){
        $('form[id=' +  $form.attr('id') +'] .generic-error').removeClass('d-none');
      })
      .done(function(){
        $('form[id=' +  $form.attr('id') +'] .generic-success').removeClass('d-none');
      });
    } else if (typeof grecaptcha != "undefined") {
      if (grecaptcha.getResponse() != "") {
        $.post($('#' + $form.attr('id')).attr('action'), $('#' + $form.attr('id')).serialize(), function(){
          $('form[id=' +  $form.attr('id') +'] .success').removeClass('d-none');
        }, 'json')
        .fail(function(){
          $('form[id=' +  $form.attr('id') +'] .generic-error').removeClass('d-none');
        })
        .done(function(){
          $('form[id=' +  $form.attr('id') +'] .generic-success').removeClass('d-none');
        });
      } else {
        grecaptcha.execute();
      };
    }
    return false;
  }
});

function onContactCaptcha($form) {
  $('form.contact').submit();
}