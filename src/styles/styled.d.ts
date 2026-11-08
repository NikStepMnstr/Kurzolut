import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: string;
      textMuted: string;
      border: string;
      primary: string;
      error: string;
    };
    fontFamily: string;
    radius: string;
  }
}
