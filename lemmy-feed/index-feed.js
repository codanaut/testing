// set the proxy url and create the base url variable
//var proxyURL = "https://proxy.codanaut.com/proxy?url="; 
var baseURL = "";

function formdata() {
  var searchText = document.getElementById("searchText").value;

  var apiPath = "/api/v3/post/list";

  try {
    var domain = new URL(searchText);
    baseURL = domain;
    var url = domain.protocol + "//" + domain.hostname + apiPath;
  } catch (err) {
    try {
      var fixDomain = "https:" + "//" + searchText;
      var newdomain = new URL(fixDomain);
      baseURL = newdomain;
      var url = newdomain.protocol + "//" + newdomain.hostname + apiPath;
    } catch (err) {
      document.getElementById("message").innerHTML = "Catch inner: " + err.message;
    }
  }

  var finalURL = proxyURL + url;
  console.log(baseURL.href)
  console.log(finalURL);

  getUrl(finalURL)
    .then((data) => {
      console.log(data);
      hidewarningFunction();
      displayForumFeed(data.posts);
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("error").innerHTML =
        "Failed to connect! <br>Some servers are struggling right now and may fail to connect. <br>Check the URL and try again in a few seconds.";
      displaywarningFunction();
    });

  // Infinite scroll functionality
  const postsPerPage = 10;
  let currentPage = 2;
  let isLoading = false;
  let isLastPage = false;
  let isTriggered = false;

  window.addEventListener('scroll', handleScroll);

  function handleScroll() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition >= scrollableHeight * 0.8 && !isLoading && !isLastPage && !isTriggered) {
      isTriggered = true;
      loadMorePosts();
    }
  }

  function loadMorePosts() {
    if (!isLastPage) {
      isLoading = true;

      const nextPageUrl = `${finalURL}?page=${currentPage}&limit=${postsPerPage}`;
      console.log(nextPageUrl);
      getUrl(nextPageUrl)
        .then((data) => {
          displayMorePosts(data.posts);
          isLoading = false;
          isTriggered = false;
          currentPage += 1;

          if (data.posts.length === 0) {
            isLastPage = true;
          }
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
          isLoading = false;
          isTriggered = false;
        });
    }
  }

  function displayMorePosts(posts) {
    const feedContainer = document.getElementById('feedContainer');

    posts.forEach((post) => {
      const card = createCard(post);
      feedContainer.appendChild(card);
    });
  }


}//end main function

function displayForumFeed(posts) {
  var feedContainer = document.getElementById("feedContainer");

  // Clear previous feed
  feedContainer.innerHTML = "";

  posts.forEach((post) => {
    var card = createCard(post);
    feedContainer.appendChild(card);
  });
}

function createCard(post) {
  var card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", "newMessage");

  if (post.post.thumbnail_url) {
    card.innerHTML = `
    <div class="card-header">
        <h5 class="card-title">${post.post.name}</h5>
      </div>
      <div class="card-body">
        <img src="${post.post.thumbnail_url}" alt="Thumbnail" class="card-img">
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col"><i class="fa-solid fa-arrow-up"></i><br>${post.counts.score}</div>
          <div class="col"><i class="fa-solid fa-comment"></i><br>${post.counts.comments}</div>
          <div class="col"><a href="/user.html?baseURL=${encodeURIComponent(baseURL)}&profileID=${post.post.creator_id}"><i class="fa-solid fa-user"></i><br>${post.creator.name}</a></div>
          <div class="col"><i class="fa-solid fa-earth-americas"></i><br>${post.community.name}</div>
        </div>
      </div>
      `;
    var cardImg = card.querySelector(".card-img");
    cardImg.addEventListener("click", function (event) {
      event.stopPropagation();
      cardImg.classList.toggle("enlarged");
    });
  }
  else {
    if (post.post.body) {
      card.innerHTML = `
        <div class="card-header">
          <h5 class="card-title">${post.post.name}</h5>
        </div>
        <div class="card-body markdown">
          <p>${marked.parse(post.post.body)}</p>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col"><i class="fa-solid fa-arrow-up"></i><br>${post.counts.score}</div>
            <div class="col"><i class="fa-solid fa-comment"></i><br>${post.counts.comments}</div>
            <div class="col"><a href="/user.html?baseURL=${encodeURIComponent(baseURL)}&profileID=${post.post.creator_id}"><i class="fa-solid fa-user"></i><br>${post.creator.name}</a></div>
            <div class="col"><i class="fa-solid fa-earth-americas"></i><br>${post.community.name}</div>
          </div>
        </div>`;
    }
    else {
      card.innerHTML = `
    <div class="card-header">
      <h5 class="card-title">${post.post.name}</h5>
    </div>
    <div class="card-body">
      <p>no body</p>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col"><i class="fa-solid fa-arrow-up"></i><br>${post.counts.score}</div>
        <div class="col"><i class="fa-solid fa-comment"></i><br>${post.counts.comments}</div>
        <div class="col"><a href="/user.html?baseURL=${encodeURIComponent(baseURL)}&profileID=${post.post.creator_id}"><i class="fa-solid fa-user"></i><br>${post.creator.name}</a></div>
        <div class="col"><i class="fa-solid fa-earth-americas"></i><br>${post.community.name}</div>
      </div>
    </div>`;
    }
  }
  return card;
}


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
/*
function displayCardFunction() {
  var T = document.getElementById("serverCard");
  T.style.display = "block";  // <-- Set it to block
}

function hideCardFunction() {
  var T = document.getElementById("serverCard");
  T.style.display = "none";  // <-- Set it to block
}
*/
function displaywarningFunction() {
  var errorDiv = document.getElementById("errorDiv");
  errorDiv.style.display = "block";  // <-- Set it to block
}
function hidewarningFunction() {
  var hideerrorDiv = document.getElementById("errorDiv");
  hideerrorDiv.style.display = "none";  // <-- Set it to block
}
