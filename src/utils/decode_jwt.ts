export function decodeJWT(token: string) {
	try {
	  const base64Url = token.split(".")[1];
	  const base64 = base64Url.replace("-", "+").replace("_", "/");
	  return JSON.parse(window.atob(base64));
	} catch (error) {
	  return null;
	}
  }
  
  export function verifyToken(token: string) {
	try {
	  const [header, payload, signature] = token.split(".");
  
	  // Decode and parse the payload
	  const decodedPayload = JSON.parse(window.atob(payload));
  
	  // Check if the token is expired
	  const currentTime = Math.floor(Date.now() / 1000);
	  if (decodedPayload.exp && decodedPayload.exp < currentTime) {
		// Token is expired
		return false;
	  }
  
	  // Perform additional checks if needed:
	  // Example: Check if the token is properly signed using the secret key
  
	  // If all checks pass, return true
	  return true;
	} catch (error) {
	  // If there's an error decoding the token or any other unexpected error, return false
	  console.error("Error verifying token:", error);
	  return false;
	}
  }
  