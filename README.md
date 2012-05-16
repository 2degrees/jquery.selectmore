# jQuery.selectmore

Fed-up with the poor usability of the native HTML select mutiple element? If so, use **jQuery.selectmore** and allow users to quickly search for multiple without using the `[Ctrl]` or `[Cmd]` key!

## Dependencies

* jQuery 1.7.2+
* jQuery UI 1.8.20+
  * jquery.ui.core.js
  * jquery.ui.widget.js
  * jquery.ui.autocomplete.js

*NB: An older version of jQuery UI might work (no testing done). However, jQuery 1.7.0 will be required due to the new event based syntax.*

## Usage

Include the plugin-script along with the jQuery and the required jQuery UI dependencies (see above), e.g.

```html
<script src="lib/jquery-1.7.2.min.js"></script>
<script src="lib/jquery-ui-1.8.20.custom.min.js"></script>
<script src="jquery.selectmore.js"></script>
```

Then inside a javascript file (or inline in a script tag), call the ``selectmore()`` method on the wrapped set you wish to update, e.g.

```javascript
$('select[multiple]').selectmultiple();
```

## Supported browsers

* Internet Explorer 6+
* Firefox 12.0 on Ubuntu 11.10, OS X Lion 10.7.3
* Chromium 18.0.1025.168 on Ubuntu 11.10
* Chrome 18.0.1025.168 on OS X Lion 10.7.3
* Safari 5.1.5 (7534.55.3) on OS X Lion 10.7.3