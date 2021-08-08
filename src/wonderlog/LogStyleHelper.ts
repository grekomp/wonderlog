import { LogStyle } from "./LogStyle";

export default class LogStyleHelper {
  static GetCss(style?: LogStyle): string {
    if (style == null) return "";

    const cssEntries = [];
    let key: keyof LogStyle;
    for (key in style) {
      if (style[key] != null)
        cssEntries.push(key.replace("_", "-") + ": " + style[key]);
    }
    return cssEntries.join("; ");
  }

  static Clone(style?: LogStyle): LogStyle {
    return Object.assign({}, style);
  }
  static Merge(...styles: (LogStyle | undefined)[]): LogStyle {
    return Object.assign({}, ...styles);
  }
}
