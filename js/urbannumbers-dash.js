$(function() {
    window.dash_delete_selected = function(form_id) {
        var _form = document.getElementById(form_id);
        var selected = 0;
        $.each(_form.elements, function(_, element) {
            if (element.type == 'checkbox' && element.checked) {
                selected += 1;
            }
        });

        if (selected > 0 && confirm('Do you want to remove these from favourites?')) {
            _form.submit();
        }
    }

    window.dash_select_all = function(form_id) {
        var _form = document.getElementById(form_id);
        $.each(_form.elements, function(_, element) {
            if (element.type == 'checkbox' && element.name == 'check[]' && element.checked == false) {
                // Due to bug in forms plugin we need to issue click on checkboxes. :/
                $(element).click();
            }
        });
    }

    $('#dash-mi-form-check').change(function(e) {
        dash_select_all(this.id.substring(0, this.id.indexOf('-check')));
    });
});
