// tslint:disable: variable-name

export type LogStyle = {
  color?: string;
  border?: string;
  border_radius?: string;
  background?: string;
  font_weight?: string;
  font_style?: string;
  padding?: string;
};

/**
 * A container for css styles handled by Wonderlog
 * This class uses underscores for css properties that contain dashes i.e.: `border-radius`=>`border_radius`
 */
export default class LogStyleHelper {
  static GetCss(style: LogStyle): string {
    const cssEntries = [];
    let key: keyof LogStyle;
    for (key in style) {
      if (style[key] != null)
        cssEntries.push(key.replace("_", "-") + ": " + style[key]);
    }
    return cssEntries.join("; ");
  }

  static Clone(style: LogStyle): LogStyle {
    return Object.assign({}, style);
  }
  static Merge(...styles: LogStyle[]): LogStyle {
    return Object.assign({}, ...styles);
  }
}
