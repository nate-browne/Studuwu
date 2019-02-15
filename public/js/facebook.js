function statusChange(resp) {
  if(resp.status === "connected") {
    console.log("success");
    let id = resp.authResponse['userID'];
    console.log("User ID: " + id);
    return id;
  } else if(resp.status === "unknown" || resp.status === "not_authorized") {
    return "";
  }
} 

/**
 * Login functionality added to the button
 */
function login() {
  FB.login((response) => {
    let res = statusChange(response);
    if(res !== "") {
      window.location.pathname = "/home/" + res;
    }
  }, {scope: "public_profile,email"});
}

/**
 * Logout functionality
 */
function logout() {
  if(FB.getAccessToken() !== null) {

    FB.logout((response) => {
      if(!response.session) {
        window.location.pathname = "/";
      }
    });
  } else {
    window.location.pathname = "/";
  }
}