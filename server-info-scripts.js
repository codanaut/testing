function formdata() {
  var searchText = document.getElementById("searchText").value;

  var apiPath = "/api/v1/instance"

  try {
    var domain = (new URL(searchText))
    var url = domain.protocol + "//" + domain.hostname + apiPath
  }
  catch (err) {
    try {
      var fixDomain = "https:" + "//" + searchText
      var newdomain = (new URL(fixDomain))
      var url = newdomain.protocol + "//" + newdomain.hostname + apiPath
    }
    catch (err) {
      document.getElementById("message").innerHTML = "Catch inner: " + err.message;
    }
    //document.getElementById("message").innerHTML = "Catch 1 : " + err.message;
  }

  console.log(url)

  getUrl(url)
    .then((data) => {
      console.log(data);
      let serverName = data.uri
      let description = data.short_description
      let version = data.version
      let users = data.stats.user_count
      let status_count = data.stats.status_count
      let domain_count = data.stats.domain_count
      let registrations = data.registrations
      let approval_required = data.approval_required
      let invites_enabled = data.invites_enabled
      let thumbnail = data.thumbnail
      document.getElementById("imgSRC").src = thumbnail;
      document.getElementById("imgLNK").href = "https://" + serverName;
      document.getElementById("serverName").innerHTML = '<a href=https://' + serverName + '>' + serverName + '</a>';
      document.getElementById("description").innerHTML = description;
      document.getElementById("version").innerHTML = "Server Version: " + version;
      document.getElementById("user_count").innerHTML = "Users: " + users;
      document.getElementById("status_count").innerHTML = "Toots Posted: " + status_count;
      document.getElementById("domain_count").innerHTML = "Domains Connected: " + domain_count;
      document.getElementById("registrations").innerHTML = "Registrations Enabled: " + registrations;
      document.getElementById("approval_required").innerHTML = "Approval Required: " + approval_required;
      document.getElementById("invites_enabled").innerHTML = "Invites Enabled: " + invites_enabled;
      document.getElementById("about").href = "https://" + serverName + "/about";
      document.getElementById("local").href = "https://" + serverName + "/public/local";
      document.getElementById("federated").href = "https://" + serverName + "/public";
      document.getElementById("blocked").href = "https://" + serverName + "/api/v1/instance/domain_blocks";
      hidewarningFunction()
      displayCardFunction()
    })
    .catch((err) => {
      console.log(err)
      hideCardFunction()
      document.getElementById("error").innerHTML = "Failed to connect";
      displaywarningFunction()
    });


}//ends main click function
  
  // make get request
function getUrl(url) {
  return fetch(url) // return this promise
    .then((response) => response.json());
}

  
// Enter on Submit
var input = document.getElementById("searchText");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("enterBtn").click();
  }
});

function displayCardFunction() {
  var T = document.getElementById("serverCard");
  T.style.display = "block";  // <-- Set it to block
}

function hideCardFunction() {
  var T = document.getElementById("serverCard");
  T.style.display = "none";  // <-- Set it to block
}

function displaywarningFunction() {
  var errorDiv = document.getElementById("errorDiv");
  errorDiv.style.display = "block";  // <-- Set it to block
}
function hidewarningFunction() {
  var hideerrorDiv = document.getElementById("errorDiv");
  hideerrorDiv.style.display = "none";  // <-- Set it to block
}