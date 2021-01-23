// =================== Вариант простой =====================

// const ctx = document.querySelector('.js-chart').getContext('2d');

// const GLOBAL_MEAN_TEMPERATURE = 14;
// function fetchData() {
//   fetch('./ZonAnn.Ts+dSST.csv')
//     .then(response => response.text())
//     .then(data => {
//       const parsedData = Papa.parse(data, { header: true }).data;
//       const years = parsedData.map(entry => entry.Year);
//       const glob = parsedData.map(
//         entry => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE,
//       );
//       const NHem = parsedData.map(
//         entry => Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE,
//       );
//       const SHem = parsedData.map(
//         entry => Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE,
//       );
//       var myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: years,
//           datasets: [
//             {
//               label: '# Средняя глобальная температура',
//               data: glob,
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//               fill: false,
//             },
//             {
//               label: '# Температура в северном полушарии',
//               data: NHem,
//               borderColor: 'blue',
//               borderWidth: 1,
//               fill: false,
//             },
//             {
//               label: '# Температура в южном полушарии',
//               data: SHem,
//               borderColor: 'green',
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
// options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               callback(value) {
//                 return value + '°';
//               },
//             },
//           },
//         ],
//       },
//     },
//       });
//     });
// }

// fetchData();

// =================== Вариант оптимизирован =====================

const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
  .then(parseData)
  .then(getLabelsAndData)
  .then(({ years, glob, NHem, SHem }) => drawChart(years, glob, NHem, SHem));

function fetchData() {
  return fetch('./ZonAnn.Ts+dSST.csv').then(response => response.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.glob.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
      acc.NHem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
      acc.SHem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);

      return acc;
    },
    { years: [], glob: [], NHem: [], SHem: [] },
  );
}

function drawChart(years, glob, NHem, SHem) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: '# Средняя глобальная температура',
          data: glob,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: '# Температура в северном полушарии',
          data: NHem,
          borderColor: 'blue',
          borderWidth: 1,
          fill: false,
        },
        {
          label: '# Температура в южном полушарии',
          data: SHem,
          borderColor: 'green',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback(value) {
                return value + '°';
              },
            },
          },
        ],
      },
    },
  });
}
