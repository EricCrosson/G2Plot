import * as _ from '@antv/util';
import { DataItem, LayerConfig, ViewConfig } from '../..';
import ViewLayer from '../../base/view-layer';
import { LineLayerConfig } from '../line/layer';

/** 日历图配置定义 */
export interface CalendarViewConfig extends ViewConfig {
  /** 字段信息 */
  readonly dayField: string; // YYYY-MM-DD
  readonly valueField: string;
  /** 映射的颜色字段 */
  readonly colorField?: string;
  /** 日历图的起止时间：[2019-10, 2020-03] */
  readonly from: string;
  readonly to: string;
}

interface CalendarLayerConfig extends CalendarViewConfig, LayerConfig {}

/**
 * 日历图
 */
export default class CalendarLayer extends ViewLayer<CalendarLayerConfig> {
  public type: string = 'calendar';

  public static getDefaultOptions(): Partial<LineLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {});
  }

  /**
   * 复写父类的数据处理类，主要完成：
   * 1. 生成 polygon 的 x y field（虚拟的，无需用户传入）
   *
   * @param data
   */
  protected processData(data?: DataItem[]): DataItem[] | undefined {
    return data;
  }

  protected addGeometry(): void {
    const { xField, yField, colorField, color } = this.options;
    const polygonConfig: any = {
      type: 'polygon',
      position: {
        fields: [xField, yField],
      },
      shape: {
        values: ['boundary-polygon'],
      },
      color: {
        fields: [colorField],
        values: color,
      },
      // TODO 数据标签功能
      // label: this.extractLabel(),
    };

    this.setConfig('element', polygonConfig);
  }

  /**
   * 写入坐标系配置，使用 rect 默认的坐标系配置，无需写入任何配置
   */
  protected coord(): void {}

  /**
   * 无需 geometry parser，直接使用 polygon 即可
   */
  protected geometryParser(dim: string, type: string): string {
    return '';
  }
}
