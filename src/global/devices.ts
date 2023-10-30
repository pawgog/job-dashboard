const size = {
    sm: '480px',
    md: '780px',
    lg: '970px',
    xl: '1200px'
  };
  
  export const deviceWidth = (query: string) => (Object.keys(size) as Array<keyof typeof size>).reduce((acc, key) => {
    acc[key] = (style: TemplateStringsArray) => `@media (${query}-width: ${size[key]}) { ${style} }`;
    return acc;
  }, {} as { [index: string]: (style: TemplateStringsArray) => string });
  
  export const deviceMinWidth = deviceWidth('min')
  export const deviceMaxWidth = deviceWidth('max')