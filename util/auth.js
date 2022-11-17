import axios from "axios";

const API_KEY = "AIzaSyAorjjysvjHMnJceXdL6k-6g8D_3G-7Two";

async function authenticate(mode, email, password) {
  // в чем разница записей
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  //const url = "https://identitytoolkit.googleapis.com/v1/accounts:" + mode + "?key=" + API_KEY;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
