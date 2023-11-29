export const loginService = async (username, password) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const signupService = async (formData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};
