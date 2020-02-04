import { Calendar } from '@antv/g2plot';

fetch('../data/contributions.json')
  .then((res) => res.json())
  .then((data) => {
    const calendar = new Calendar(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'GitHub contribution',
      },
      description: {
        visible: true,
        text: '853 contributions in the last year.',
      },
      forceFit: true,
      data,
      dayField: 'date',
      valueField: 'count',
      padding: 'auto',
    });

    calendar.render();
  });
