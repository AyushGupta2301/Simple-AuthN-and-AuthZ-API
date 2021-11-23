## A Basic O-Auth implementation.
- ‘One-SignIn’ is a simple implementation of O-Auth.
- The tokens are issued by ‘One-SignIn’ and are valid on partner sites, ‘Site B’ and ‘Site C’.
- The user needs to sign-up on the ‘One-SignIn’ once to create an account, then he/she can login to get the token.
- The tokens are stored in the browser storage (Local Storage).
- Token encryption is AES with a Private key  given to the partner sites by the main Site.
- The partner sites offer the users ‘Sign In with One-SignIn’ option along with regular sign in.
- The partner sites call the ‘One-SignIn’ API for authN and authZ if the user selects ‘Sign in with One-SignIn’. 
