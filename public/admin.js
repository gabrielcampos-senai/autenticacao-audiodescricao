(function($) {
    $.fn.extend({
      populateOpts: function(options) {
        var defaults = {
          source: [],
        };
  
        var options = $.extend(defaults, options);
  
        return this.each(function(index, row) {
          if (options.source && options.source.length > 0) {
            for (var i = 1; i <= options.source[index]; i++) {
              $(this).append($("<option>").text(i).val(i));
            }
          }
        });
      }
    });
  })(jQuery);
  
  // Now you can do the following
  $('#email').populateOpts({ source: [5, 2, 2, 3, 5] });