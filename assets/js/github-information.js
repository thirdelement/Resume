function userInformationHTML(user)  { //takes one parameter of user which is an object returned from GitHub API
    return `
    <h2>${user.name}
    <span class="small-name">
        <@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                </a>
                </div>
                <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
                </div>`;  //return object in formatted HTML string
                            //first return user.name which is display name.  Add '@' which will appear after user's login.
                            //Then link to user's public profile on GitHub.
                            //The gh-content div is where all content about user will appear.  Then another div inside this for 
                            //the user's avatar which is again linked to the user's public profile.
                            //We give width and height so displays in a square.
                            //Outside of gh-avatar div (but inside gh-content) we create new paragraph with text for count 
                            //of number of followers then a blank link and then count of public Repos are displayed.
}


function fetchGitHubInformation(event) {
  var username = $("#gh-username").val(); //create a variable to hold the username that is typed
  //use jQuery to select the gh-username ID and the value in that text field
  if (!username) {
    //if username field empty, we're going to return HTML that says 'Please enter a
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`); //GitHub username
    return; //if field empty we don't want to look at GitHub API so we're going to return out of
  } //this function

  $("#gh-user-data").html(
    //if text inputted, set HTML display to loader
    `<div id="loader">                                      
        <img src="assets/images/loader.gif" alt="loading..." />   
        </div>`);

  $.when(
    $.getJSON(`https://api.github.com/users/${username}`)
    ).then (
    function (response) {
      //when method takes a function as its first argument.
      var userData = response;
      $("#gh-user-data").html(userInformationHTML(userData)); //set jQuery selectors to select the gh-user-data div and set the HTML to
      //the results of another function called userinformationHTML()
    },
    function (errorResponse) {
      //if 404 error then we're going to set gh-user-data div to HTML error message.
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else {
        console.log(errorResponse); //if not a 404 error then console.log the entire error
        $("#gh-user-data").html(
          //set gh-user-data to the JSON response back
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        );
      }
    });
}
