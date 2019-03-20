$(document).ready(function() {

    $('input[tabindex=1]').focus();

    $('textarea, input[type="text"]').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) { // STRG + Enter
            $(this).closest('form').submit();
        }

        if (e.ctrlKey && e.keyCode == 67) { // STRG + C
            reset();
        }
    });

    $('#focusguard').on('focus', function() {
        console.log('FOCUSED');
        $('input[tabindex=1]').focus();
    });

    function reset() {
        $('#protocol_parent').val('');
        $('#protocol-add-child-info').remove();
        $('#protocol-add-child-reset').remove();
        $('.protocol-add-child-highlite').removeClass('protocol-add-child-highlite');

        $('form').find('input, textarea').val('');
        $('input[tabindex=1]').focus();
    }

    $('.protocol-add-child').on('click', function(e) {
        e.preventDefault();
        reset();


        var $id = $(this).data('id');
        var $highliteClass = $(this).data('highlite');
        var $formElement = $('#protocol_parent');

        $formElement.val($id);

        if ($highliteClass !== undefined && $highliteClass !== '') {
            $(this).closest('.' + $highliteClass).addClass('protocol-add-child-highlite');
        }

        $formElement.parent().prepend('<p id="protocol-add-child-info" class="text-center" data-append="' + $id + '"><strong>Anfügenmodus</strong></p>');
        $formElement.parent().append('<button type="button" id="protocol-add-child-reset" class="btn btn-block btn-primary" tabindex="4">Abbrechen</button>');

        $('input[tabindex=1]').focus();

        $('#protocol-add-child-reset').on('click', function(e) {
            e.preventDefault();
            reset();
        });
    });
});
