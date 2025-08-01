import 'dotenv/config';
export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`Cannot find ${name} environment variables`);
};
