export const validateTask = (title: string) => {
    if (!title) {
      return "Title kerak";
    }
  
    if (title.length < 3) {
      return "Title juda qisqa";
    }
  
    return null;
  };