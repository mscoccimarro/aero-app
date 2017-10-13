var select = document.querySelector('.rel-schema'),
    refreshBtn = document.querySelector('.refresh-btn');

toggleLoading();
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

  setTimeout(function (){xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + select.value}, generateTable)}, 500);
}

function toggleLoading() {
  var container = document.querySelector('.rel-schema-results'),
      loader = document.createElement('div'),
      loading = document.createElement('i');

  container.innerHTML = "";
  loader.classList.add('loader');
  loading.classList.add('loading-icon', 'fa', 'fa-cog', 'fa-spin', 'fa-3x', 'fa-fw');
  loader.append(loading);
  container.append(loader);
}

select.addEventListener('change', function () {
  toggleLoading();
  setTimeout(function (){xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + select.value}, generateTable)}, 500);
});

refreshBtn.addEventListener('click', function () {
  toggleLoading();
  setTimeout(function (){xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + select.value}, generateTable)}, 500);
});

function generateTable(data) {
  var container = document.querySelector('.rel-schema-results');

  container.innerHTML = "";

  data = JSON.parse(data);

  if (data.length === 0) {
    var msg = document.createElement('p');
    msg.innerHTML = "No results found";
    msg.classList.add('error-msg');
    container.append(msg);
  } else {
    var table = document.createElement('div'),
        msg = document.createElement('p');
    msg.innerHTML = data.length + " results found";
    msg.classList.add('results-msg');
    container.append(msg);

    table.classList.add('table');
    // TODO: Remove log
    console.log(data);

    // add headers to table
    var row = document.createElement('div'),
        col, p;

    row.classList.add('table-row', 'header');

    for (var prop in data[0]) {
      col = document.createElement('div');
      col.classList.add('table-col');
      p = document.createElement('p');
      p.innerHTML = prop;
      col.append(p);
      row.append(col);
    }

    table.append(row);

    // add data to table
    data.forEach(function (el) {
      var row = document.createElement('div'),
          prop;
      row.classList.add('table-row');

      for (prop in el) {
        var col = document.createElement('div'),
            p = document.createElement('p');
        col.classList.add('table-col');
        p.innerHTML = el[prop];

        col.append(p);
        row.append(col);
      }

      table.append(row);
    });

    container.append(table);
  }
}
