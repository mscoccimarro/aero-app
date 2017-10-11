var select = document.querySelector('.rel-schema');
var keyFK;
var fkMap = {};

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
        input = document.createElement('input'),
        labelAutoIncremento = document.createElement('label'),
        autoIncremento = document.createElement('input'),
        labelRandom = document.createElement('label'),
        random = document.createElement('input');

    row.classList.add('form-row');

    label.innerHTML = prop;
    input.classList.add('form-data');
    input.type = "text";
    input.setAttribute('data-type', type);
    input.name = prop;
    input.id = prop;

    labelAutoIncremento.innerHTML = "AutoIncremento: ";
    labelAutoIncremento.setAttribute('style', 'display:none');
    labelAutoIncremento.setAttribute('class', "displayNone");

    autoIncremento.type = "checkbox";
    autoIncremento.name = prop + 'Checkbox';
    autoIncremento.id = prop + 'Checkbox';
    autoIncremento.hidden = true;
    autoIncremento.setAttribute('class', "hidden");

    labelRandom.innerHTML = 'Random:';
    labelRandom.setAttribute('style', 'display:none');
    labelRandom.setAttribute('class', "displayNone");

    random.type = "checkbox";
    random.name = prop + 'Random';
    random.id = prop + 'Random';
    random.hidden = true;
    random.setAttribute('class', "hidden");
    random.setAttribute('onchange', "cargarMapaForeignKeys(this);");

    row.append(label, input, labelAutoIncremento, autoIncremento, labelRandom, random);

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
    var cantidadTuplas = document.getElementById("cantidadTuplas").value;
    if (cantidadTuplas == "") cantidadTuplas = "1";

  for (var i = 0; i < formData.length; i++) {
    formObject[formData[i].name] = {};
    formObject[formData[i].name].value = formData[i].value;
    formObject[formData[i].name].autoIncremento = document.getElementById(formData[i].getAttribute('id')+"Checkbox").checked;
    formObject[formData[i].name].type = formData[i].getAttribute('data-type');
    formObject[formData[i].name].random = false;
      
    if (document.getElementById(formData[i].getAttribute('id')+"Random").checked) {
        formObject[formData[i].name].random = true;
        //Recupero del mapa de foreign keys, todos las tuplas de dicha foreign key
        var value = formData[i].value;
        var keyMap = formData[i].getAttribute("id");
        var list = fkMap[keyMap];
        //Elijo una tupla de manera random (Si no se desea random, solo cambiar la siguiente funcion)
        //var valueRandom = getElementRandomOfList(list);
        //Se modifica el valor de relacion por el valor a realmente guardar que es foreign key.
        var pk = value.split("-")[1];
        var listFK = getListaRelacionByPK(pk, list);
        //formObject[formData[i].name].value = valueRandom[pk];
        formObject[formData[i].name].value = listFK;
    }
  }

  // TODO: remove log
  console.log(formObject);

  xm_gen.ajax.query({file: 'insert-tuple.php?data=' + JSON.stringify(formObject) + "&relation=" + select.value + "&cantidadTuplas=" + cantidadTuplas},
  function (data) {console.log(data);})
}

function cargaMasiva() {
  // Tomo el valor actual del hidden
  var isHidden = document.getElementById("cantidadTuplas").hidden;

  // Muestro / Oculto la cantidad de tuplas a guardar
  document.getElementById("cantidadTuplas").hidden = !isHidden;

  // Muestro / Oculto los checkbox
  var listHidden = document.getElementsByClassName("hidden");
  for (var i = 0; i < listHidden.length; i++) {
      listHidden[i].hidden = !isHidden;
  }

   // Muestro / Oculto los labels
  var listDisplayNone = document.getElementsByClassName("displayNone");
  for (var i = 0; i < listDisplayNone.length; i++) {
      listDisplayNone[i].setAttribute('style', isHidden ? '' : 'display:none');
  }
}

function getResultSelect(data) {
    
    if (data != "") {
         var valueFkMap = JSON.parse(data);
         fkMap[keyFK] = valueFkMap;
         keyFK = null;
    }
   
}

function cargarMapaForeignKeys(button) {
    
    if (button.checked) {
        var idButton = button.getAttribute("id");
        var idLabel = idButton.split("Random")[0];
        var relacion = document.getElementById(idLabel).value.split("-")[0];

        keyFK = idLabel;
        xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + relacion}, getResultSelect);
    }
    
}

function getElementRandomOfList(list) {
    
    if (list != null && list.length > 0) {
        
        var i = getRandomInt(0, list.length);
        return list[i];
    }
    return null;
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getListaRelacionByPK(pk, list) {
    
    var listReturned = [];
    for (var i = 0; i < list.length; i++) {
        var pkElement = list[i][pk];
        listReturned.push(pkElement);
    }
    return listReturned;
}
