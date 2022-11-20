import axios from "axios";

const API_KEY = "AIzaSyAorjjysvjHMnJceXdL6k-6g8D_3G-7Two";

async function authenticate(mode, email, password) {
  // в чем разница записей
  //const url = "https://identitytoolkit.googleapis.com/v1/accounts:" + mode + "?key=" + API_KEY;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
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

export function welcomeMessage(token) {
  return axios
    .get(
      "https://react-native-1e3f1-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
        token
    ) // что такое auth ?
    .then((response) => {
      return response.data;
    });
}

export async function freshToken() {
  const token = await axios.post("https://securetoken.googleapis.com/v1/token?key=" + API_KEY);

  const time = token.data.grant_type;
  console.log(time);
}
