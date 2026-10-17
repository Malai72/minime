// Песочница: форма меняет inline-стили сетки и показывает CSS
(function () {
  var form = document.getElementById('controls');
  var grid = document.getElementById('sbGrid');
  var code = document.getElementById('sbCode');
  var gapOut = document.getElementById('gapOut');
  var countOut = document.getElementById('countOut');

  function render() {
    var f = form.elements;
    var n = Number(f.count.value);
    var gap = f.gap.value + 'px';

    grid.style.gridTemplateColumns = f.cols.value;
    grid.style.gridAutoRows = f.rows.value;
    grid.style.gap = gap;
    grid.style.justifyItems = f.ji.value;
    grid.style.alignItems = f.ai.value;
    grid.style.gridAutoFlow = f.flow.value;

    grid.innerHTML = '';
    for (var i = 1; i <= n; i++) {
      var d = document.createElement('div');
      d.className = 'cell';
      d.textContent = i;
      if (i === 1 && f.span.checked) {
        d.className += ' cell-big';
        d.style.gridColumn = 'span 2';
        d.style.gridRow = 'span 2';
      }
      grid.appendChild(d);
    }

    gapOut.textContent = gap;
    countOut.textContent = n;

    code.textContent =
      '.grid {\n' +
      '  display: grid;\n' +
      '  grid-template-columns: ' + f.cols.value + ';\n' +
      '  grid-auto-rows: ' + f.rows.value + ';\n' +
      '  gap: ' + gap + ';\n' +
      '  justify-items: ' + f.ji.value + ';\n' +
      '  align-items: ' + f.ai.value + ';\n' +
      '  grid-auto-flow: ' + f.flow.value + ';\n' +
      '}' +
      (f.span.checked ? '\n.grid > :first-child {\n  grid-column: span 2;\n  grid-row: span 2;\n}' : '');
  }

  form.addEventListener('input', render);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  render();

  // Dense: одинаковый набор плиток в двух сетках
  // [класс, подпись]; w3 = span 3, w2 = span 2
  var items = [
    ['dn-w3', 'span 3'], ['dn-w2', 'span 2'], ['dn-w3', 'span 3'],
    ['', '1'], ['dn-w2', 'span 2'], ['', '2'], ['', '3'], ['dn-w3', 'span 3'], ['', '4'], ['', '5']
  ];
  ['dn', 'dd'].forEach(function (id) {
    var box = document.getElementById(id);
    items.forEach(function (it) {
      var d = document.createElement('div');
      d.className = 'dn ' + it[0];
      d.textContent = it[1];
      box.appendChild(d);
    });
  });
})();
