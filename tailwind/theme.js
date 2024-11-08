import colors from "./colors";
import fonts from "./fonts";

export const extend = {
  extend: {
    fonts: fonts,
    colors: colors,
    ...theme,
  },
  container: {
    center: true,
    padding: "1rem",
    screens: {
      sm: "100%",
      md: "100%",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
  },
};
