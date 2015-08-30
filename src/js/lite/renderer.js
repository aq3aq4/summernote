define(function () {
  var Builder = function (markup, children, options) {
    this.build = function ($parent) {
      var $node = $(markup);
      if (options && options.contents) {
        $node.html(options.contents);
      }

      if ($parent) {
        $parent.append($node);
      }

      if (children) {
        children.forEach(function (child) {
          child.build($node);
        });
      }

      return $node;
    };
  };

  var createBuilder = function (markup) {
    return function () {
      var children = $.isArray(arguments[0]) ? arguments[0] : [];
      var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
      return new Builder(markup, children, options);
    };
  };

  var renderer = {
    editor: createBuilder('<div class="note-editor">'),
    toolbar: createBuilder('<div class="note-toolbar">'),
    editingArea: createBuilder('<div class="note-editingArea">'),
    codable: createBuilder('<div class="note-codable">'),
    editable: createBuilder('<div class="note-editable" contentEditable="true">'),
    buttonGroup: createBuilder('<span class="note-btn-group">'),
    button: createBuilder('<button class="note-btn">'),
  };

  return renderer;
});
