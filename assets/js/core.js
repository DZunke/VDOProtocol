(function ($) {

    $(document).ready(function () {
        $('a, input[type=submit]').on('click', function ($e) {
            $.Loader('check', this);
        });

        $('form').on('submit', function () {
            $.Loader('check', this);
        });

        $(document).on('keydown', function ($e) {
            if (($e.which || $e.keyCode) === 116) { // F5
                $.Loader('check', this);
            }
        });
    });

    $.Loader = function ($action, $element) {
        switch ($action.toLowerCase()) {
            case "check":
                return _Check($element);
            case "show":
                return _Show();
            case "hide":
                return _Hide();
        }
    };

    function _Check($element) {
        if ($($element).hasClass('no-loader')) {
            return;
        }

        var $checkForm = $($element).data('check-form');
        if ($checkForm !== undefined) {
            $form = $('form[name="' + $($element).data('check-form') + '"]');
            if ($form.length === 0 || $form[0].noValidate || $form[0].checkValidity()) {
                $.Loader("show");
                $form[0].submit();
            }

            return;
        }

        $.Loader("show");
    }

    function _Show() {
        if ($('.js-loader').length > 0) {
            return;
        }

        var $loaderDiv = $("<div>", {
            "class": "js-loader modal-backdrop",
            "css": {
                "display": "flex",
                "flex-direction": "column",
                "align-items": "center",
                "justify-content": "center",
                "opacity": "0.8"
            }
        });

        $('<i>', {
            'class': 'fa fa-spinner fa-pulse fa-3x fa-fw'
        }).appendTo($loaderDiv);

        $loaderDiv.appendTo('body').show();
    }

    function _Hide() {
        var $loaders = $('.js-loader');

        if ($loaders.length === 0) {
            return;
        }

        $loaders.remove();
    }

}(jQuery));

/**
 *
 */
$(document).ready(function () {
    /** Constant div card */
    const DIV_CARD = 'div.card';

    /** Initialize tooltips */
    $('[data-toggle="tooltip"]').tooltip();

    /** Initialize popovers */
    $('[data-toggle="popover"]').popover({
        html: true
    });

    /** Function for remove card */
    $('[data-toggle="card-remove"]').on('click', function (e) {
        let $card = $(this).closest(DIV_CARD);

        $card.remove();

        e.preventDefault();
        return false;
    });

    /** Function for collapse card */
    $('[data-toggle="card-collapse"]').on('click', function (e) {
        let $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-collapsed');

        e.preventDefault();
        return false;
    });

    /** Function for fullscreen card */
    $('[data-toggle="card-fullscreen"]').on('click', function (e) {
        let $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');

        e.preventDefault();
        return false;
    });
});
