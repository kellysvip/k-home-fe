import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    
    
    
  }

  .main-layout {
    border-radius: 10px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }

  .main-header {
    background-color: #e3f2fd;
  }

`;
