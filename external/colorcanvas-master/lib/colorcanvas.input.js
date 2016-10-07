(function() {
  var $, Color, Input, Picker, PickerPopup, Popup, Spine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  $ = jQuery;

  Spine = ColorCanvas.Spine;

  Color = ColorCanvas.Color;

  Picker = ColorCanvas.Picker;

  $.colorcanvas = {};

  $.colorcanvas.replaceInputs = function() {
    return $('input[type=color]').each(function() {
      return (new Input).replace(this);
    });
  };

  $(function() {
    return $.colorcanvas.replaceInputs();
  });

  Popup = (function(_super) {

    __extends(Popup, _super);

    Popup.name = 'Popup';

    Popup.prototype.width = 400;

    Popup.prototype.popupEvents = {
      mousedown: 'listen'
    };

    function Popup() {
      this.drop = __bind(this.drop, this);

      this.drag = __bind(this.drag, this);

      this.listen = __bind(this.listen, this);

      this.close = __bind(this.close, this);

      this.open = __bind(this.open, this);
      Popup.__super__.constructor.apply(this, arguments);
      this.delegateEvents(this.popupEvents);
      this.el.delegate('click', '.close', this.close);
      this.el.addClass('popup');
      this.el.css({
        position: 'absolute'
      });
    }

    Popup.prototype.open = function(position) {
      var left, top;
      if (position == null) {
        position = {
          left: 0,
          top: 0
        };
      }
      left = position.left || position.clientX;
      top = position.top || position.clientY;
      left += 25;
      top -= 5;
      this.el.css({
        left: left,
        top: top
      });
      $('body').append(this.el);
      return $('body').mousedown(this.close);
    };

    Popup.prototype.close = function() {
      $('body').unbind('mousedown', this.close);
      this.release();
      return this.trigger('close');
    };

    Popup.prototype.isOpen = function() {
      return !!this.el.parent().length;
    };

    Popup.prototype.listen = function(e) {
      e.stopPropagation();
      if (e.target !== e.currentTarget) {
        return;
      }
      this.dragPosition = {
        left: e.pageX,
        top: e.pageY
      };
      $(document).mousemove(this.drag);
      return $(document).mouseup(this.drop);
    };

    Popup.prototype.drag = function(e) {
      var difference, offset;
      difference = {
        left: e.pageX - this.dragPosition.left,
        top: e.pageY - this.dragPosition.top
      };
      this.dragPosition = {
        left: e.pageX,
        top: e.pageY
      };
      offset = this.el.offset();
      offset.left += difference.left;
      offset.top += difference.top;
      return this.el.css(offset);
    };

    Popup.prototype.drop = function(e) {
      $(document).unbind('mousemove', this.drag);
      return $(document).unbind('mouseup', this.drop);
    };

    return Popup;

  })(Spine.Controller);

  PickerPopup = (function(_super) {
    __extends(PickerPopup, _super);

    PickerPopup.name = 'PickerPopup';

    PickerPopup.prototype.events = {
      'submit form': 'close',
      'click [data-type=cancel]': 'close',
      'click [data-type=save]': 'save'
    };

    function PickerPopup(whatever, callback, target) {
	  this.callback = callback;
	  this.target = target;
      this.keydown = __bind(this.keydown, this);

      var _this = this;
      PickerPopup.__super__.constructor.apply(this, arguments);
      this.color || (this.color = new Color);
      this.picker = new Picker({
        color: this.color
      });
      this.picker.bind('change', function() {
        return _this.trigger.apply(_this, ['change'].concat(__slice.call(arguments)));
      });
      this.append(this.picker);
    }

    PickerPopup.prototype.open = function() {
      $(document).keydown(this.keydown);
      return PickerPopup.__super__.open.apply(this, arguments);
    };

    PickerPopup.prototype.save = function() {
	  var res = this.picker.color;
	  this.callback.call(this.target, res.r, res.g, res.b, res.a*255);
    };

    PickerPopup.prototype.close = function() {
      $(document).unbind('keydown', this.keydown);
      return PickerPopup.__super__.close.apply(this, arguments);
    };

    PickerPopup.prototype.cancel = function() {
      this.trigger('change', this.picker.original);
      return this.close();
    };

    PickerPopup.prototype.keydown = function(e) {
      switch (e.which) {
        case 27:
          return this.cancel();
        case 13:
          return this.save();
      }
    };

    return PickerPopup;

  })(Popup);

  Input = (function(_super) {

    __extends(Input, _super);

    Input.name = 'Input';

    Input.prototype.className = 'colorCanvasInput';

    Input.prototype.events = {
      'click': 'open'
    };

    function Input() {
      Input.__super__.constructor.apply(this, arguments);
      this.input || (this.input = $('<input />'));
      this.color || (this.color = new Color({
        r: 255,
        g: 0,
        b: 0
      }));
      this.render();
    }

    Input.prototype.render = function() {
      return this.el.css({
        background: this.color.toString()
      });
    };

    Input.prototype.replace = function(input) {
      this.input = $(input);
      this.color.set(new Color(this.input.val()));
      this.input.hide();
      this.input.after(this.el);
      return this.input.get(0).type = 'text';
    };

    Input.prototype.open = function() {
      var _this = this;
      if (this.picker && this.picker.isOpen()) {
        this.picker.close();
        return;
      }
      this.picker = new PickerPopup({
        color: this.color
      });
      this.picker.bind('change', function(color) {
        _this.color = color;
        _this.trigger('change', _this.color);
        _this.input.val(_this.color.toString());
        _this.input.change();
        return _this.render();
      });
      return this.picker.open(this.el.offset());
    };

    return Input;

  })(Spine.Controller);

  
  
  
  
  
  
  
  
  
  var DisplayI = (function(_super) {

  var template = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
	  __out.push('<div class="controls">\n  <label>\n      Place image</label>\n<form><ul class="tab">  <li><a href="#" class="tablinks active" onclick="changeTab(event, 1)">From internet</a></li>  <li><a href="#" class="tablinks" onclick="changeTab(event, 2)">From your device</a></li>  </ul>\n    <label class="tab1">\n      URL\n      <input type="text" name="url" width="400%">\n    </label>\n\n    <footer>\n      <button data-type="cancel">Cancel</button><button data-type="save" class="right">Save</button></footer></form></div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
    __extends(DisplayI, _super);

    DisplayI.name = 'DisplayI';

    DisplayI.prototype.tag = 'article';

    DisplayI.prototype.elements = {};

    DisplayI.prototype.events = {
      'change input:not([name=url])': 'changeInput',
      'keyup input[name=url]': 'changeInput',
      'submit form': 'changeInput'
    };

    function DisplayI() {
      DisplayI.__super__.constructor.apply(this, arguments);
      this.render();
    }

    DisplayI.prototype.render = function() {
      this.html(template(this));
    };

	DisplayI.prototype.changeInput = function(e) {
		e.preventDefault();
		switch (e.target.name) {
			case "url":
				this.url = e.target.value;
			break;
			case "encoded_image":
				this.encodedImage = e.target.files[0];
			break;
		}
	};

    return DisplayI;

  })(Spine.Controller);
  
  
  var ImagePicker = (function(_super) {

    __extends(ImagePicker, _super);

    ImagePicker.name = 'ImagePicker';

    ImagePicker.prototype.className = 'colorCanvas';

    ImagePicker.prototype.events = {
      'click [data-type=cancel]': 'cancel'
    };

    function ImagePicker() {
      ImagePicker.__super__.constructor.apply(this, arguments);
      this.render();
    }

    ImagePicker.prototype.render = function() {
      var _this = this;
      this.el.empty();
      this.display = new DisplayI();
      return this.append(this.display);
    };

    ImagePicker.prototype.cancel = function(e) {
      e.preventDefault();
    };

    ImagePicker.prototype.change = function(color) {
    };

    ImagePicker.prototype.release = function() {
      ImagePicker.__super__.release.apply(this, arguments);
      return this.display.release();
    };

    return ImagePicker;

  })(Spine.Controller);
  
  
  ImagePopup = (function(_super) {
    __extends(ImagePopup, _super);

    ImagePopup.name = 'ImagePopup';

    ImagePopup.prototype.events = {
      'submit form': 'close',
      'click [data-type=cancel]': 'close',
      'click [data-type=save]': 'save'
    };

    function ImagePopup(callback, target) {
		this.callback = callback;
		this.target = target;
      this.keydown = __bind(this.keydown, this);

      var _this = this;
      ImagePopup.__super__.constructor.apply(this, arguments);
      this.picker = new ImagePicker();
      this.picker.bind('change', function() {
        return _this.trigger.apply(_this, ['change'].concat(__slice.call(arguments)));
      });
      this.append(this.picker);
    }

    ImagePopup.prototype.open = function() {
      $(document).keydown(this.keydown);
      return ImagePopup.__super__.open.apply(this, arguments);
    };

    ImagePopup.prototype.save = function() {
		if (document.getElementsByClassName("tab1")[0]) {
			var img = new Image();
			img.src = this.picker.display.url;
			this.callback.call(this.target, img);
		} else {
			this.callback.call(this.target, this.picker.display.encodedImage);
		}
    };

    ImagePopup.prototype.close = function() {
      $(document).unbind('keydown', this.keydown);
      return ImagePopup.__super__.close.apply(this, arguments);
    };

    ImagePopup.prototype.cancel = function() {
      this.trigger('change', this.picker.original);
      return this.close();
    };

    ImagePopup.prototype.keydown = function(e) {
      switch (e.which) {
        case 27:
          return this.cancel();
        case 13:
          return this.save();
      }
    };

    return ImagePopup;

  })(Popup);
  
  
  
  
  
  var DisplayL = (function(_super) {

  template = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<div class="controls">\n  <form>\n    <label>\n      Layer name:\n      <input type="text" min="0" max="255" name="layerName" required autofocus>\n    </label><br>\n\n    <label>\n      <span>R</span>\n      <input type="number" min="0" max="255" name="r" required autofocus>\n    </label>\n\n    <label>\n      <span>G</span>\n      <input type="number" min="0" max="255" name="g" required>\n    </label>\n\n    <label>\n      <span>B</span>\n      <input type="number" min="0" max="255" name="b" required>\n    </label>\n\n    <label>\n      <span>Hex</span>\n      <input type="text" name="hex">\n    </label>\n\n    <div class="previewLayer">\n      <div class="inner">\n        &nbsp;\n      </div>\n      <div class="original">\n        &nbsp;\n      </div>\n    </div>\n\n    <footer>\n      <button data-type="cancel">Cancel</button>\n      <button data-type="save" class="right">Save</button>\n    </footer>\n  </form>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
    __extends(DisplayL, _super);

    DisplayL.name = 'DisplayL';

    DisplayL.prototype.tag = 'article';

    DisplayL.prototype.elements = {
      'input[name=layerName]': '$layerName',
      'input[name=hex]': '$hex',
      'input[name=r]': '$r',
      'input[name=g]': '$g',
      'input[name=b]': '$b',
      '.previewLayer .inner': '$previewLayer',
      '.previewLayer .original': '$original'
    };

    DisplayL.prototype.events = {
      'change input:not([name=hex])': 'changeInput',
      'keyup input[name=hex]': 'changeHex',
      'submit form': 'changeInput'
    };

    function DisplayL() {
      DisplayL.__super__.constructor.apply(this, arguments);
      this.color || (this.color = new Color);
      this.render();
      this.setColor(this.color);
    }

    DisplayL.prototype.render = function() {
      this.html(template(this));
      if (this.original) {
        return this.$original.css({
          background: this.original.toString()
        });
      }
    };

    DisplayL.prototype.setColor = function(color) {
      this.color = color;
      this.$layerName.val(this.name);
      this.$r.val(this.color.r);
      this.$g.val(this.color.g);
      this.$b.val(this.color.b);
      this.$hex.val(this.color.toHex());
      return this.$previewLayer.css({
        background: this.color.toString()
      });
    };

    DisplayL.prototype.changeInput = function(e) {
      e.preventDefault();
      this.color = new Color({
        r: this.$r.val(),
        g: this.$g.val(),
        b: this.$b.val()
      });
      return this.trigger('change', this.color);
    };

    DisplayL.prototype.changeHex = function(e) {
      e.preventDefault();
      this.color = new Color(this.$hex.val());
      this.$r.val(this.color.r);
      this.$g.val(this.color.g);
      this.$b.val(this.color.b);
      this.$previewLayer.css({
        background: this.color.toString()
      });
      return this.trigger('change', this.color);
    };

    return DisplayL;

  })(Spine.Controller);
  
  
  
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  var Spine = ColorCanvas.Spine;

  var Color = ColorCanvas.Color;

  var Gradient = ColorCanvas.Gradient;

  var Spectrum = ColorCanvas.Spectrum;

  var LayerPicker = (function(_super) {

    __extends(LayerPicker, _super);

    LayerPicker.name = 'LayerPicker';

    LayerPicker.prototype.className = 'colorCanvas';

    LayerPicker.prototype.events = {
      'click [data-type=cancel]': 'cancel'
    };

    function LayerPicker() {
      LayerPicker.__super__.constructor.apply(this, arguments);
      this.color || (this.color = new Color({
        r: 255,
        g: 0,
        b: 0
      }));
      if (!(this.color instanceof Color)) {
        this.color = new Color(this.color);
      }
      this.original = this.color.clone();
      this.render();
    }

    LayerPicker.prototype.render = function() {
      var _this = this;
      this.el.empty();
      this.gradient = new Gradient({
        color: this.color
      });
      this.spectrum = new Spectrum({
        color: this.color
      });
      this.display = new DisplayL({
        color: this.color,
        original: this.original
      });
      this.gradient.bind('change', function(color) {
        _this.color.set(color.toRGB());
        _this.display.setColor(_this.color);
        return _this.change();
      });
      this.spectrum.bind('change', function(color) {
        var hsv;
        hsv = _this.color.toHSV();
        hsv.h = color.toHSV().h;
        color = new Color(hsv);
        _this.color.set(color.toRGB());
        _this.gradient.setColor(_this.color);
        _this.display.setColor(_this.color);
        return _this.change();
      });
      this.display.bind('change', function(color) {
        _this.color.set(color.toRGBA());
        _this.gradient.setColor(_this.color);
        _this.spectrum.setColor(_this.color);
        return _this.change();
      });
      return this.append(this.gradient, this.spectrum, this.display);
    };

    LayerPicker.prototype.cancel = function(e) {
      e.preventDefault();
      return this.change(this.original);
    };

    LayerPicker.prototype.change = function(color) {
      if (color == null) {
        color = this.color;
      }
      return this.trigger('change', color);
    };

    LayerPicker.prototype.release = function() {
      LayerPicker.__super__.release.apply(this, arguments);
      this.gradient.release();
      this.spectrum.release();
      return this.display.release();
    };

    return LayerPicker;

  })(Spine.Controller);
  
  
  
  
  
  
  
  LayerPopup = (function(_super) {
    __extends(LayerPopup, _super);

    LayerPopup.name = 'LayerPopup';

    LayerPopup.prototype.events = {
      'submit form': 'close',
      'click [data-type=cancel]': 'close',
      'click [data-type=save]': 'save'
    };

    function LayerPopup(whatever, callback, target) {
	  this.callback = callback;
	  this.target = target;
      this.keydown = __bind(this.keydown, this);

      var _this = this;
      LayerPopup.__super__.constructor.apply(this, arguments);
      this.color || (this.color = new Color);
      this.picker = new LayerPicker({
        color: this.color
      });
      this.picker.bind('change', function() {
        return _this.trigger.apply(_this, ['change'].concat(__slice.call(arguments)));
      });
      this.append(this.picker);
    }

    LayerPopup.prototype.open = function() {
      $(document).keydown(this.keydown);
      return LayerPopup.__super__.open.apply(this, arguments);
    };

    LayerPopup.prototype.save = function() {
	  var res = this.picker.color;
	  var name = this.picker.display.$layerName.val();
	  this.callback.call(this.target, res.r, res.g, res.b, name);
    };

    LayerPopup.prototype.close = function() {
      $(document).unbind('keydown', this.keydown);
      return LayerPopup.__super__.close.apply(this, arguments);
    };

    LayerPopup.prototype.cancel = function() {
      this.trigger('change', this.picker.original);
      return this.close();
    };

    LayerPopup.prototype.keydown = function(e) {
      switch (e.which) {
        case 27:
          return this.cancel();
        case 13:
          return this.save();
      }
    };

    return LayerPopup;

  })(Popup);
  
  //label: input layer's name and choose color
  //label: Layer name
  //input text
  
  //remove alpha
  
  
  ColorCanvas.Input = Input;

  ColorCanvas.Popup = Popup;

  ColorCanvas.PickerPopup = PickerPopup;
  ColorCanvas.ImagePopup = ImagePopup;
  ColorCanvas.LayerPopup = LayerPopup;

}).call(this);
var changeTab = function(e, tabID) {
	tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
	if (tabID == 1) {
		var el = document.getElementsByClassName("tab2")[0];
		if (!el) {
			return null
		}
		var l = document.createElement("label");
		l.setAttribute("class", "tab1");
		var url = document.createTextNode("\n      URL\n      ");
		var input = document.createElement("input");
		input.type = "text";
		input.setAttribute("name", "url");
		input.setAttribute("width", "400%");
		l.appendChild(url);
		l.appendChild(input);
		el.parentNode.insertBefore(l, el.nextSibling);
		//el.parentNode.insertBefore('<label class="tab1">\n      URL\n      <input type="text" name="url" width="400%">\n    </label>');
		el.parentNode.removeChild(el);
	} else if (tabID == 2) {
		var el = document.getElementsByClassName("tab1")[0];
		if (!el) {
			return null
		}
		var input = document.createElement("input");
		input.type = "file";
		input.setAttribute("name", "encoded_image");
		input.setAttribute("class", "tab2");
		el.parentNode.insertBefore(input, el.nextSibling);
		el.parentNode.removeChild(el);
	}
};