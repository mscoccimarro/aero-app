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
}
