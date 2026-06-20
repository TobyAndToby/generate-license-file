// istanbul ignore file

export const fetchString = async (url: string): Promise<string> => {
  const response = await fetch(url);
  return response.text();
};
