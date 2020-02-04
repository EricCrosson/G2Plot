import * as _ from '@antv/util';
import { registerShape } from '@antv/g2';

/**
 * 注册自定义日历图的 shape
 * code from https://g2.antv.vision/zh/examples/heatmap/heatmap#calendar-horizontal
 */
registerShape('polygon', 'boundary-polygon', {
  draw(cfg, container) {
    if (!_.isEmpty(cfg.points)) {
      const points = cfg.points;
      // rect path
      let path = [
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['Z'],
      ];
      path = this.parsePath(path);

      // TODO 样式从配置中读取
      const attrs = {
        stroke: '#fff',
        lineWidth: 1,
        fill: cfg.color,
        fillOpacity: cfg.opacity,
        path,
      };

      const polygon = container.addShape('path', {
        attrs,
      });

      if (cfg.origin._origin.lastWeek) {
        const linePath = [
          ['M', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
        ];
        // 最后一周的多边形添加右侧边框
        container.addShape('path', {
          zIndex: 1,
          attrs: {
            path: this.parsePath(linePath),
            lineWidth: 1,
            stroke: '#404040',
          },
        });
        if (cfg.origin._origin.lastDay) {
          container.addShape('path', {
            zIndex: 1,
            attrs: {
              path: this.parsePath([
                ['M', points[1].x, points[1].y],
                ['L', points[2].x, points[2].y],
              ]),
              lineWidth: 1,
              stroke: '#404040',
            },
          });
        }
      }

      container.sort();

      return polygon;
    }
  },
});
