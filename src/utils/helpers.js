import colors from 'colors';

export const morganFormats = `${colors.green(':method')} ${colors.blue(':host')}  ${colors.yellow(':status')} ${colors.gray(
  ':res[content-length] - :response-time ms',
)}`;
