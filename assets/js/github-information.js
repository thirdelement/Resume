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

function repoInformationHTML(repos) {
    if (repos.length == 0) {                //GitHub returns object as an array so we can use standary array method which is length
                                            //to see if it's equal to 0.  If it is then our array is empty and no respositories for
                                            //that user.
        return `<div class = "clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {  //the map() method works like a forEach but returns an array with the results of this function
        return `<li>                                
        <a href="${repo.html_url}" target="_blank">${repo.name}</a> 
        </li>`;                                     //the contents of the array we want to return are an <li>.  Inside the li, we 
                                                    //have an anchor tag.  The href for the anchor tag is ${repo.html_url}.
    });

    return `<div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
        </div>`;                            //The Ul is the parent for all the list items we created.  As map() returns an array
                                            //we're going to use join() on that array and join everything with a new line.
                                            //This stops us from having to iterate throug the new array again.
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");  //clears the gh-user-data div when there's an empty text box
    $("#gh-repo-data").html("");    //clears the gh-repo-data div when there's an empty text box
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
    $.getJSON(`https://api.github.com/users/${username}`), 
    $.getJSON(`https://api.github.com/users/${username}/repos`) //list the repos for that individual user
    ).then (
    function (firstResponse, secondResponse) {  //We need two variables as two JSON calls
      //when method takes a function as its first argument.
      //when we do two calls the when () method packs a response into arrays.  Each one is the first element of the array.
      //so we put indexes in there for these responses & after that we target ("#gh-repo-data").html()
      var userData = firstResponse[0];          //create variable for user data
      var repoData = secondResponse[0];     //create variable for repo data
      $("#gh-user-data").html(userInformationHTML(userData)); //set jQuery selectors to select the gh-user-data div and set the HTML to
      //the results of another function called userinformationHTML()
      $("#gh-repo-data").html(repoInformationHTML(repoData));
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

$(document).ready(fetchGitHubInformation);  //automatically display Octocat's profile when the page is loaded
                                            //executes the fetchGitHubInformation function when the DOM is fully loaded.
