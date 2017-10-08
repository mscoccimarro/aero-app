var xm_gen = {};

xm_gen.namespace = function (path) {
  var ns = path.split('.'),
      o = this;

  ns.forEach(function (el) {
    if (typeof o[el] === 'undefined') {
      o[el] = {};
    }
    o = o[el];
  });

  return this;
};

xm_gen
  .namespace('ajax')
  .namespace('utils');

// deep copy
xm_gen.utils.extend = function (obj, ext) {
  var prop;

  for (prop in ext) {
    if (typeof ext[prop] === 'object' && !(ext[prop] instanceof Array)) {
      obj[prop] = {};
      xm_gen.utils.extend(obj[prop], ext[prop]);
    } else {
      obj[prop] = ext[prop];
    }
  }
};

xm_gen.ajax.query = function (options, callback) {
  var xhttp = new XMLHttpRequest(),
      config = {
        method: 'GET',
        async: true
      };

  xm_gen.utils.extend(config, options);

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(this.responseText);
    }
  };

  xhttp.open(config.method, config.file, config.async);
  xhttp.send();
};
