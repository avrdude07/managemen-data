import { jwtDecode } from "jwt-decode";

export function getRolesFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.roles;
  } catch (error) {
    console.log(error);
    return null;
  }
}
