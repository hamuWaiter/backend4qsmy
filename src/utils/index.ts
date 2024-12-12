export const query2Number = (str: string) => {
  const num = Number(str);
  return isNaN(num) ? str : num;
}

export const query2Boolean = (str: string) => {
  const num = Boolean(str);
}