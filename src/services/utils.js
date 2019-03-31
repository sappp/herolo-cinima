export const uppercaseAll = (str) => {
  return str.split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
}

export const cleanSpecialChars = (str) => {
  return str.replace(/[^a-zA-Z 0-9]/g, "");
}

export const checkMatchStrings = (str1, str2) => {
  return (
    uppercaseAll(cleanSpecialChars(str1)) === uppercaseAll(cleanSpecialChars(str2))
  );
}

export const prepTitle = (str) => {
  return uppercaseAll(cleanSpecialChars(str));
}