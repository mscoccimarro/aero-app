var select = document.querySelector('.rel-schema');

xm_gen.ajax.query({file: 'fetch-schema.php'}, showSchema);

function showSchema(data) {
  data = JSON.parse(data);
  // TODO: remove log
  console.log(data);

  data.forEach(function (el) {
    var option = document.createElement('option'),
        prop = 'Tables_in_aa2000';

    option.value = el[prop];
    option.innerHTML = el[prop];

    select.append(option);
  });

  xm_gen.ajax.query({file: 'desc-relation.php?relation=' + select.value}, generateForm);
}

var formObject;

select.addEventListener('change', function () {
  xm_gen.ajax.query({file: 'desc-relation.php?relation=' + this.value}, generateForm);
});

function generateForm(data) {
  data = JSON.parse(data);
  // TODO: remove log
  console.log(data);

  formObject = {};

  var container = document.querySelector('.rel-schema-form'),
      prop;

  container.innerHTML = "";

  data.forEach(function (el) {
    var prop = el['Field'],
        type = el['Type'],
        row = document.createElement('div'),
        label = document.createElement('label'),
        input = document.createElement('input');

    row.classList.add('form-row');

    label.innerHTML = prop;
    input.classList.add('form-data');
    input.type = "text";
    input.setAttribute('data-type', type);
    input.name = prop;
    input.id = prop;

    row.append(label, input);

    container.append(row);
    formObject[prop] = '';
  });

  // focus first input element
  document.querySelector('.form-data').focus();
}

var load = document.querySelector('.rel-schema-load');

load.addEventListener('click', sendData);

function sendData() {
  var formData = document.querySelectorAll('.form-data');

  for (var i = 0; i < formData.length; i++) {
    formObject[formData[i].name] = {};
    formObject[formData[i].name].value = formData[i].value;
    formObject[formData[i].name].type = formData[i].getAttribute('data-type');
  }

  // TODO: remove log
  console.log(formObject);

  xm_gen.ajax.query({file: 'insert-tuple.php?data=' + JSON.stringify(formObject) + "&relation=" + select.value},
  function (data) {console.log(data);})
}
