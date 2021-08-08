import { LogStyle } from "./LogStyle";

const LogStyleHelper = {
  GetCss(style?: LogStyle): string {
    if (style == null) return "";

    const cssEntries = [];
    let key: keyof LogStyle;
    for (key in style) {
      if (style[key] != null)
        cssEntries.push(key.replace("_", "-") + ": " + style[key]);
    }
    return cssEntries.join("; ");
  },

  Clone(style?: LogStyle): LogStyle {
    return Object.assign({}, style);
  },
  Merge(...styles: (LogStyle | undefined)[]): LogStyle {
    return Object.assign({}, ...styles);
  },
};
export default LogStyleHelper;
