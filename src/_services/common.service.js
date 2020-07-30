export const handleResponse = (response) => {
  
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (data && data.errors) {
        const errorsKeys = Object.keys(data.errors);
        const newMessage = errorsKeys
          .reduce((acc, key) => {
            const row = data.errors[key].join(", ");
            return `${acc} ${key} ${row}; `;
          }, "")
          .trim();
        return Promise.reject(newMessage);
      }
      if (response.statusText) {
        return Promise.reject(response.statusText);
      }
    }

    return data;
  });
};