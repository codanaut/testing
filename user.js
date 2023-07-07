
// set the proxy url and create the base url variable
//let proxyURL = "https://proxy.codanaut.com/proxy?url="; 

let userData = "";

function getData() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileID = urlParams.get('profileID');
    const baseURL = urlParams.get('baseURL');

    let path = "api/v3/user?person_id="

    let finalURL = proxyURL + baseURL + path + profileID;
    console.log(finalURL);

    if (finalURL) {
      fetch(finalURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Check the retrieved user data
          resolve(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          reject(error);
        });   
    } else {
      reject(new Error('Invalid finalURL'));
    }
  });
}

function createCard(post) {
var feedContainer = document.getElementById("feedContainer");
  // Clear previous feed
  feedContainer.innerHTML = "";


let accountAge = getAccountAge(post.person_view.person.published);
let creationDate = getAccountCreation(post.person_view.person.published);

var userDomain = new URL(post.person_view.person.actor_id);
console.log(userDomain);
userHost = userDomain.host;

  var card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", "feedContainer");
  card.innerHTML = `
    <div class="card-header">
      <div class="card-title">
        <div class="row mt-2">
            <div class="col-12 h4">${post.person_view.person.display_name ? post.person_view.person.display_name : post.person_view.person.name}</div>
            <div class="col-12"><a href="${post.person_view.person.actor_id}">${post.person_view.person.name}@${userHost}</a></div>
        </div>
      </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div id="comments" class="col-4">
                <div class="row">
                    <div class="col-12 "><i class="fa-solid fa-comment"></i> ${post.person_view.counts.comment_count}</div>
                    <div class="col-12 pt-2"><i class="fa-solid fa-arrow-up"></i> ${post.person_view.counts.comment_score}</div>
                </div>
            </div>
            <div class="col-4 profilepic">
                ${post.person_view.person.avatar ? `<img class="rounded-circle" alt="avatar1" src="${post.person_view.person.avatar}" />` : `<i class="fa-solid fa-circle-user fa-5x" id="noUser"></i>`}
            </div>
            <div id="posts" class="col-4">   
                <div class="row">
                <div class="col-12 "><i class="fa-solid fa-file-pen"></i> ${post.person_view.counts.post_count}</div>
                <div class="col-12 pt-2"><i class="fa-solid fa-arrow-up"></i> ${post.person_view.counts.post_score}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-footer">
      <div><i class="fa-solid fa-calendar-days"></i> ${accountAge} <i class="fa-solid fa-cake-candles"></i> ${creationDate}</div>
    </div>
  `;
  feedContainer.appendChild(card);
}

// testing function
function test(data) {
  console.log("test:" + data);
}

/* Custom Functions */


// Get account Creation Date
function getAccountCreation(pudDate){
    const dateString = pudDate;
    const accountPublished = new Date(dateString);

    // Extracting date components
    const year = accountPublished.getFullYear();
    const month = accountPublished.getMonth() + 1; // January is month 0
    const day = accountPublished.getDate();

    // Extracting time components
    const hours = accountPublished.getHours();
    const minutes = accountPublished.getMinutes();
    const seconds = accountPublished.getSeconds();

    // Constructing the readable date and time string
    const readableDate = `${month}-${day}-${year}`;
    const readableTime = `${hours}:${minutes}:${seconds}`;

    //console.log(readableDate); // Output: 7-2-2023
    //console.log(readableTime); // Output: 20:15:17
    return readableDate
}


// Get Account Age
function getAccountAge(pudDate){
    const dateString = pudDate;
    const accountPublished = new Date(dateString);


    const currentDate = new Date(); // Current date and time

    // Calculate the difference in milliseconds between the current date and the account date
    const differenceInMilliseconds = currentDate - accountPublished;

    // Convert the difference to days, months, and years
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    // Calculate the number of days, months, and years
    const days = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    const months = Math.floor(days / 30); // Assuming 30 days per month
    const years = Math.floor(months / 12);

    // Calculate the remaining days and months after subtracting the years
    const remainingMonths = months % 12;
    const remainingDays = days % 30;

    //console.log(`${years} years, ${remainingMonths} months, ${remainingDays} days`);
    createdDate = years + " years," + remainingMonths + " months," + remainingDays + " days"
    //return createdDate

    age = {
        years: years,
        months: remainingMonths,
        days: remainingDays
        };
    console.log(age)
    if ( age.years > 1 ) yearString = " years";
    else yearString = " year";
    if ( age.months> 1 ) monthString = " months";
    else monthString = " month";
    if ( age.days > 1 ) dayString = " Days";
    else dayString = " Day";
  
    
    if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
    else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
      ageString = age.days + dayString;// days
    else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
      ageString = age.years + yearString + " old. Happy Birthday!!";
    else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.years + yearString + " and " + age.months + monthString + " old.";
    else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.months + monthString + " and " + age.days + dayString + " old.";
    else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
      ageString = age.years + yearString + " and " + age.days + dayString + " old.";
    else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.months + monthString + " old.";
    else if ( (age.years < 0) && (age.months < 0) && (age.days < 0) )
    ageString = " New User";
    else ageString = "Oops! Could not calculate age!";
  
    return ageString;
}

function goBack() {
    window.history.back();
  }

// main function
function main() {
  getData()
    .then((data) => {
      console.log(data);
      createCard(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

main();
