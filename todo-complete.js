(function ($) {
    'use strict';

    var $form = $('form');
    var $input = $('input');
    var $list = $('#todos');

    $form.submit(function () {
        var todo = $input.val();
        $list.append('<li>' + todo + '</li>');
        return false;
    });

    $list.click(function (e) {
        $(e.target).animate({
            opacity: 0
        }, 500, function () {
            $(this).remove();
        });
    });

}(jQuery));