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

  xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + select.value}, generateTable);
}

select.addEventListener('change', function () {
  xm_gen.ajax.query({file: 'fetch-relation.php?relation=' + this.value}, generateTable);
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
