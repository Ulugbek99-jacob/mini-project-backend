export const validateRegister = (email: string, password: string) => {
    if (!email || !password) {
      return "Email va password kerak";
    }
  
    if (!email.includes("@")) {
      return "Email noto‘g‘ri";
    }
  
    if (password.length < 6) {
      return "Password kamida 6 ta bo‘lishi kerak";
    }
  
    return null;
  };
  
  export const validateLogin = (email: string, password: string) => {
    if (!email || !password) {
      return "Email va password kerak";
    }
  
    return null;
  };