const DELIM = '=';
const PREFIX_SIZE = 2;

const args = process.argv.slice(2);

const parsedArgs = args.reduce((acc, arg) => {
  const [key, value] = arg.slice(PREFIX_SIZE).split(DELIM);
  acc[key] = value;
  return acc;
}, {});

export {
  parsedArgs,
};