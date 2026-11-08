import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      navy: string;
      steel: string;
      sky: string;
      cream: string;
      red: string;
    };
    fontSize: {
      small: string;
      body: string;
      heading: string;
      result: string;
    };
    space: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
    };
    radius: string;
    controlHeight: string;
    contentMaxWidth: string;
    breakpoint: {
      desktop: string;
    };
  }
}
