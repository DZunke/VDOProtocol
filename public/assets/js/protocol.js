$(document).ready(function() {

    $('textarea, input[type="text"]').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) { // STRG + Enter
            $(this).closest('form').submit();
        }

        if (e.ctrlKey && e.keyCode == 67) { // STRG + C
            reset();
        }
    });

    function reset() {
        $('#protocol_parent').val('');
        $('#protocol-add-child-info').remove();
        $('#protocol-add-child-reset').remove();
        $('.protocol-add-child-highlite').removeClass('protocol-add-child-highlite');

        $('form').find('input, textarea').val('');
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
        $formElement.parent().append('<button type="button" id="protocol-add-child-reset" class="btn btn-block btn-primary">Abbrechen</button>');

        $('#protocol_sender').focus();

        $('#protocol-add-child-reset').on('click', function(e) {
            e.preventDefault();
            reset();
        });
    });
});
