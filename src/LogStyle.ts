// tslint:disable: variable-name

/**
 * A container for css styles handled by Wonderlog
 * This class uses underscores for css properties that contain dashes i.e.: `border-radius`=>`border_radius`
 */
export default class LogStyle {
  color?: string;
  border?: string;
  border_radius?: string;
  background?: string;
  font_weight?: string;
  font_style?: string;
  padding?: string;

  constructor(
    styles: {
      color?: string;
      border?: string;
      border_radius?: string;
      background?: string;
      font_weight?: string;
      font_style?: string;
      padding?: string;
    } = {}
  ) {
    let key: keyof this;
    // tslint:disable-next-line: forin
    for (key in styles) {
      this[key] = (styles as any)[key];
    }
  }

  GetCss(): string {
    const cssEntries = [];
    for (const key in this) {
      if (this[key] != null)
        cssEntries.push(key.replace("_", "-") + ": " + this[key]);
    }
    return cssEntries.join("; ");
  }

  Merge(style: LogStyle): LogStyle {
    const newStyle = new LogStyle(this);
    let key: keyof LogStyle;
    for (key in style) {
      if (typeof style[key] === "function") continue;
      if (style[key] == null) continue;

      (newStyle as any)[key] = style[key];
    }
    return newStyle;
  }
}
