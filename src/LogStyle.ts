// tslint:disable: variable-name

/**
 * A container for css styles handled by Wonderlog.
 *
 * Uses underscores for css properties that contain dashes i.e.: `border-radius`➡`border_radius`
 */
export type LogStyle = {
  color?: string;
  border?: string;
  border_radius?: string;
  background?: string;
  font_weight?: string;
  font_style?: string;
  padding?: string;
};
