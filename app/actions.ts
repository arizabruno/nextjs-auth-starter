'use server';

import axios from 'axios';
import { DecodedToken } from '../interfaces/Token';
import { cookies } from 'next/headers';
import authAxios from '../utils/authAxios';
import { redirect } from 'next/navigation'
import { decodeJwt } from "jose";
import { UserUpdate } from '../interfaces/User';

/**
 * Creates a new user
 *
 * @param email The email of the user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns a boolean indicating if the user was created successfully.
 */
export async function createUser(
  email: string,
  username: string,
  password: string
): Promise<boolean> {
  const baseURL = process.env.API_V1_BASE_URL;
  if (!baseURL) {
    console.error('API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/users`;

  try {
    const response = await axios.post(url, {
      email,
      username,
      password
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error: any) {
    console.error(error.message);
    return false;
  }

  return false;
}


/**
 * Updates the user's information.
 *
 * @param userChanges a UserUpdate object with the new user information.
 * @returns a boolean indicating if the user was updated successfully.
 */
export async function updateUser(
  userChanges: UserUpdate
): Promise<boolean> {
  const baseURL = process.env.API_V1_BASE_URL;
  if (!baseURL) {
    console.error('API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/users/${userChanges.userId}`;

  try {
    const response = await authAxios.put(url, {...userChanges});

    if (response.status === 200) {
      cookies().set('jwt', response.data.access_token, {httpOnly: true});
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Logs in as a guest.
 * @returns a boolean indicating if the user was logged in as a guest.
 */

export async function loginAsGuest() {
  const baseURL = process.env.API_BASE_URL;
  if (!baseURL) {
    console.error('API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/token/guest`;

  try {
    const response = await axios.post(url);

    if (response.status === 200) {
      cookies().set('jwt', response.data.access_token, {httpOnly: true});
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Validates the user's credentials.
 *
 * @param username The username of the user.
 * @param password The password of the user.
 */

export async function authenticateUser(
  username: string,
  password: string
) {


  const baseURL = process.env.API_BASE_URL;
  if (!baseURL) {
    console.error('API_BASE_URL is not defined.');
    return ;
  }

  const url = `${baseURL}/token/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      cache: 'no-store',
      body: new URLSearchParams({
        username: username,
        password: password,
      }).toString(),
    });

    if (response.ok) {
      const data = await response.json();
      cookies().set('jwt', data.access_token, {httpOnly: true});
      return true
    }
  } catch (error:any) {
    console.error(error.message);
  }
  return false;
}

/**
 * Logs out the user.
 */

export async function signOut() {
  cookies().set('jwt','',{httpOnly: true});
  redirect('/login');
}


/**
 * Gets the session from the JWT
 *
 * @param token The JWT as a string.
 * @returns An object with decoded user information if valid, otherwise null.
 */

export async function getSession(): Promise<DecodedToken | null> {
  const token = cookies().get('jwt')?.value;

  if (!token) {
    return null;
  }

  const decodedToken = decodeJwt(token) as DecodedToken;
  return decodedToken
}
