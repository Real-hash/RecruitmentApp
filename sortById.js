// sortById.js

export const sortById = (data, isAscending) => {
    return [...data].sort((a, b) => {
      if (isAscending) {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    });
  };
  