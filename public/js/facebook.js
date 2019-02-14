function checkLoginState() {
  FB.getLoginStatus((response) => {
    let res = statusChange(response);
    if(res) {
      window.top.location = "/home";
    }
  });
}

function statusChange(resp) {
  if(resp.status === "connected") {
    console.log("success");
    let id = resp.authResponse['userID'];
    console.log("User ID: " + id);
    return true;
  } else if(resp.status === "unknown" || resp.status === "not_authorized") {
    FB.login();
    return false;
  }
} 