import { LoginValues } from "@/app/auth/login/page";

/**
 *
 * @param credentials { id: string, password: string }
 * @returns res.json()
 */
export const loginUser = async (credentials: LoginValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', // needs to be present for cookie
    body: JSON.stringify(credentials),
  });
  
  const data = await res.json();
  return data;
};

/**
 * 
 * @param credentials {  name: string username: string email: string password: string }
 * @returns res.json()
 */
export const registerUser = async (credentials: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${process.env.API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  return data;
};
