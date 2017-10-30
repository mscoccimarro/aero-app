var reservas = [],
    aerolineas = [];

xm_gen.ajax.query({file: 'fetch-relation.php?relation=aerolinea'}, function (data) {
  aerolineas = JSON.parse(data);
});

xm_gen.ajax.query({file: 'fetch-relation.php?relation=reserva'}, createDataList);

function createDataList(data) {
  data = JSON.parse(data);
  reservas = data;
  // TODO: remove log
  console.log(data);

  var dataList = document.querySelector('.data-list'),
      modIcon, dataListRow, dataListCol, actionData;

  dataListRow = document.createElement('div');
  dataListRow.classList.add('data-list-row');
  for (var prop in data[0]) {
    dataListCol = document.createElement('div');
    dataItem = document.createElement('p');
    dataListCol.classList.add('data-list-col');
    dataItem.innerHTML = prop;

    dataListCol.append(dataItem);
    dataListRow.append(dataListCol);
  }
  dataListCol = document.createElement('div');
  dataListCol.classList.add('data-list-col');
  dataListRow.append(dataListCol);
  dataList.append(dataListRow)

  data.forEach(function (el, i) {
    dataListRow = document.createElement('div');
    dataListRow.classList.add('data-list-row');

    for (var prop in el) {
      dataListCol = document.createElement('div');
      dataItem = document.createElement('p');
      dataListCol.classList.add('data-list-col');
      dataItem.innerHTML = el[prop];

      dataListCol.append(dataItem);
      dataListRow.append(dataListCol);
    }

    dataListCol = document.createElement('div');
    actionData = document.createElement('a');
    modIcon = document.createElement('i'),
    modIcon.classList.add('fa', 'fa-pencil-square-o');
    dataListCol.classList.add('data-list-col');
    actionData.classList.add('form-action', 'trigger-popup');
    actionData.title = 'Modificar';
    actionData.href = '#pp-form';
    actionData.setAttribute('data-code', el['codigoReserva']);
    actionData.append(modIcon);
    dataListCol.append(actionData);
    dataListRow.append(dataListCol);

    dataList.append(dataListRow);
  });

  function fillFormData() {
    var s_estados = document.querySelector('#s_estado'),
        s_aerolineas = document.querySelector('#s_aerolinea'),
        s_vuelos = document.querySelector('#s_vuelo'),
        option;

    s_estados.innerHTML = '';
    s_aerolineas.innerHTML = '';
    s_vuelos.innerHTML = '';

    aerolineas.forEach(function (el, i) {
      option = document.createElement('option');
      option.value = el['idAerolinea'];
      option.innerHTML = el['nombreAerolinea'];
      s_aerolineas.append(option);
    });
  }

  $('.trigger-popup').magnificPopup({
    type:'inline',
    showCloseBtn: false,
    mainClass: 'mfp-anim',
    removalDelay: 300,
    callbacks: {
      beforeOpen: function() {
        fillFormData();
      }
    }
  });
  // custom close button
  $('.popup-close-btn').on('click', $.magnificPopup.instance.close);
}
