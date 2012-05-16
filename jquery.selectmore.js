/**
 * Copyright (c) 2012, 2degrees Limited <egoddard@tech.2degreesnetwork.com>.
 * All Rights Reserved.
 *
 * This file is part of jquery.selectmore
 * <https://github.com/2degrees/jquery.selectmore>, which is subject to
 * the provisions of the BSD at
 * <http://dev.2degreesnetwork.com/p/2degrees-license.html>. A copy of the
 * license should accompany this distribution. THIS SOFTWARE IS PROVIDED "AS IS"
 * AND ANY AND ALL EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED, INCLUDING, BUT
 * NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST
 * INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE.
 * 
 * Dependencies:
 *  - jQuery 1.7.2+
 *  - jQuery UI 1.8.20+ (autocomplete and its dependencies)
 */

'use strict';
(function ($) {
    
    $.widget('ui.selectmore', {
        _create: function () {
            if (!this.element.is('select[multiple]')) {
                $.error(this.widgetName + ' can only be able applied to ' +
                    '<select> elements with the "multiple" attribute set'
                );
            }
            var widget = this;
            
            this.element.hide();
            
            // Build the list to hold selected options
            this.selections = $('<ol/>');
            this.selections.addClass(this.widgetBaseClass + '-list');
            this.element.after(this.selections);
            
            var search_choices = [];
            this.element.children().each(function () {
                var $option = $(this);
                var option_text = $option.text();
                var option_value = $option.val();
                
                if (option_value) {
                    search_choices.push({
                        label: option_text,
                        value: option_text,
                        option_value: option_value
                    });
                }
                
                if ($option.prop('selected')) {
                    widget._add_item($option.val(), $option.text());
                }
            });
            
            // Set-up the autocomplete input
            this.search_box = $('<input/>', {type: 'text', autocomplete: 'off'});
            this.element.after(this.search_box);
            this.search_box.autocomplete({
                source: $.proxy(widget._get_options, widget),
                delay: 0,
                minLength: 0,
                select: function (event, ui) {
                    var $input = $(this);
                    widget._add_item(ui.item.option_value, ui.item.label);
                    setTimeout(function () {
                        $input.val('');
                    }, 50);
                }
            });
            
            // wrap the search box
            this.search_box.wrap('<div class="'+this.widgetBaseClass+'-wrap" />')

            // Add a "show all" control
            this.show_all_control = $('<span/>');
            this.show_all_control.addClass(this.widgetBaseClass+'-dropdown ui-icon ui-icon-circle-triangle-s');
            this.search_box.after(this.show_all_control);

            // Listen for a click on the remove control
            this.selections.on('click.' + this.widgetName, 'a', function (event_object) {
                event_object.preventDefault();
                widget._remove_item(this);
            });
            
            // Listen for a click on the "show all" control
            this.show_all_control.on('click.' + this.widgetName, function (event_object) {
                var $autocomplete_options = widget.search_box.autocomplete('widget');
                if ($autocomplete_options.is(':visible')) {
                    widget.search_box.autocomplete('close');
                    return;
                }
                
                widget.search_box.autocomplete('search', '');
            });
            
            return this;
        },
        
        _add_item: function (value, label) {
            var $item = $('<li/>', {text: label});
            $item.data('value', value);

            var $remove_control = $('<a/>', {href: '#remove', class: this.widgetBaseClass+'-remove'});
            $remove_control.html('&times;');
            $item.append($remove_control);
            
            this.selections.append($item);
            
            // Mark the item in the underlying control as selected
            this.element
                .children('[value="' + value + '"]')
                .prop('selected', true);
        },
        
        _remove_item: function (remove_link) {
            var $remove_link = $(remove_link);
            var $list_item = $remove_link.parent();
            var selected_value = $list_item.data('value');
            
            $list_item.remove();
            
            // Mark the item in the underlying control as unselected
            this.element
                .children('[value="' + selected_value + '"]')
                .prop('selected', false);
        },
        
        _get_options: function (input, callback) {
            var options = [];
            var term_re = new RegExp(input['term'].toLowerCase(), 'i');
            this.element.children().not(':selected').each(function () {
                var $option = $(this);
                var option_text = $option.text();
                var option_value = $option.val();
                
                if (term_re.test(option_text)) {
                    options.push({
                        label: option_text,
                        value: option_text,
                        option_value: option_value
                    });
                }
            });
            callback(options);
        },
        
        destroy: function () {
            $.Widget.prototype.destroy.call(this);
            this.search_box.remove();
            this.selections.remove();
            this.show_all_control.remove();
            this.element.show();
            return this;
        }
    });
})(jQuery);
