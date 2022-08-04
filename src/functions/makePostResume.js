export const makePostResume = (text, numOfCharacters) => {
  if (!text) {
    return "";
  }

  return text.slice(0, numOfCharacters) + "...";
};
