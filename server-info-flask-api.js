function formdata() {
  var searchText = document.getElementById("searchText").value;

  var apiPath = "/api/v3/site"

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

  //var testurl = "/test"
  //fetch(testurl)
  //  .then((response) => response.json())
  //  .then((data) => {
  //    console.log(data)
  //  });

  //var finalURL = "http://localhost:4000/proxy?url=" + url
  var finalURL = url
  console.log(finalURL)

  getUrl(finalURL)
    .then((data) => {
      console.log(data);
      
      let counts_comments = data.site_view.counts.comments;
      let counts_communities = data.site_view.counts.communities;
      let counts_id = data.site_view.counts.id;
      let counts_posts = data.site_view.counts.posts;
      let counts_site_id = data.site_view.counts.site_id;
      let counts_users = data.site_view.counts.users;
      let counts_users_active_day = data.site_view.counts.users_active_day;
      let counts_users_active_half_year = data.site_view.counts.users_active_half_year;
      let counts_users_active_month = data.site_view.counts.users_active_month;
      let counts_users_active_week = data.site_view.counts.users_active_week;

      let local_site_actor_name_max_length = data.site_view.local_site.actor_name_max_length;
      let local_site_application_email_admins = data.site_view.local_site.application_email_admins;
      let local_site_application_question = data.site_view.local_site.application_question;
      let local_site_captcha_difficulty = data.site_view.local_site.captcha_difficulty;
      let local_site_captcha_enabled = data.site_view.local_site.captcha_enabled;
      let local_site_community_creation_admin_only = data.site_view.local_site.community_creation_admin_only;
      let local_site_default_post_listing_type = data.site_view.local_site.default_post_listing_type;
      let local_site_default_theme = data.site_view.local_site.default_theme;
      let local_site_enable_downvotes = data.site_view.local_site.enable_downvotes;
      let local_site_enable_nsfw = data.site_view.local_site.enable_nsfw;
      let local_site_federation_enabled = data.site_view.local_site.federation_enabled;
      let local_site_federation_worker_count = data.site_view.local_site.federation_worker_count;
      let local_site_hide_modlog_mod_names = data.site_view.local_site.hide_modlog_mod_names;
      let local_site_id = data.site_view.local_site.id;
      let local_site_private_instance = data.site_view.local_site.private_instance;
      let local_site_published = data.site_view.local_site.published;
      let local_site_registration_mode = data.site_view.local_site.registration_mode;
      let local_site_reports_email_admins = data.site_view.local_site.reports_email_admins;
      let local_site_require_email_verification = data.site_view.local_site.require_email_verification;
      let local_site_site_id = data.site_view.local_site.site_id;
      let local_site_site_setup = data.site_view.local_site.site_setup;
      let local_site_slur_filter_regex = data.site_view.local_site.slur_filter_regex;
      let local_site_updated = data.site_view.local_site.updated;

      let local_site_rate_limit_comment = data.site_view.local_site_rate_limit.comment;
      let local_site_rate_limit_comment_per_second = data.site_view.local_site_rate_limit.comment_per_second;
      let local_site_rate_limit_id = data.site_view.local_site_rate_limit.id;
      let local_site_rate_limit_image = data.site_view.local_site_rate_limit.image;
      let local_site_rate_limit_image_per_second = data.site_view.local_site_rate_limit.image_per_second;
      let local_site_rate_limit_local_site_id = data.site_view.local_site_rate_limit.local_site_id;
      let local_site_rate_limit_message = data.site_view.local_site_rate_limit.message;
      let local_site_rate_limit_message_per_second = data.site_view.local_site_rate_limit.message_per_second;
      let local_site_rate_limit_post = data.site_view.local_site_rate_limit.post;
      let local_site_rate_limit_post_per_second = data.site_view.local_site_rate_limit.post_per_second;
      let local_site_rate_limit_published = data.site_view.local_site_rate_limit.published;
      let local_site_rate_limit_register = data.site_view.local_site_rate_limit.register;
      let local_site_rate_limit_register_per_second = data.site_view.local_site_rate_limit.register_per_second;
      let local_site_rate_limit_search = data.site_view.local_site_rate_limit.search;
      let local_site_rate_limit_search_per_second = data.site_view.local_site_rate_limit.search_per_second;

      let site_actor_id = data.site_view.site.actor_id;
      let site_description = data.site_view.site.description;
      let site_icon = data.site_view.site.icon;
      let site_id = data.site_view.site.id;
      let site_inbox_url = data.site_view.site.inbox_url;
      let site_instance_id = data.site_view.site.instance_id;
      let site_last_refreshed_at = data.site_view.site.last_refreshed_at;
      let site_name = data.site_view.site.name;
      let site_public_key = data.site_view.site.public_key;
      let site_published = data.site_view.site.published;
      let site_sidebar = data.site_view.site.sidebar;
      let site_updated = data.site_view.site.updated;

      let taglines = [];
      let version = data.version;


      document.getElementById("counts_comments").innerHTML = "Comments: " + counts_comments;
      document.getElementById("counts_communities").innerHTML = "Communities: " + counts_communities;
      // document.getElementById("counts_id").innerHTML = counts_id;
      document.getElementById("counts_posts").innerHTML = "Posts: " + counts_posts;
      // document.getElementById("counts_site_id").innerHTML = counts_site_id;
      document.getElementById("counts_users").innerHTML = "Users: " + counts_users;
      document.getElementById("counts_users_active_day").innerHTML = "Active Today: " + counts_users_active_day;
      document.getElementById("counts_users_active_half_year").innerHTML = "Active Half Year: " + counts_users_active_half_year;
      document.getElementById("counts_users_active_month").innerHTML = "Active Month: " + counts_users_active_month;
      document.getElementById("counts_users_active_week").innerHTML = "Active Week: " + counts_users_active_week;
      
      document.getElementById("local_site_actor_name_max_length").innerHTML = "name max length: " + local_site_actor_name_max_length;
      document.getElementById("local_site_application_email_admins").innerHTML = "application email admins: " + local_site_application_email_admins;
      document.getElementById("local_site_application_question").innerHTML = "application question: " + local_site_application_question;
      document.getElementById("local_site_captcha_difficulty").innerHTML = "captcha difficulty: " + local_site_captcha_difficulty;
      document.getElementById("local_site_captcha_enabled").innerHTML = "captcha enabled: " + local_site_captcha_enabled;
      document.getElementById("local_site_community_creation_admin_only").innerHTML = "community creation admin only: " + local_site_community_creation_admin_only;
      document.getElementById("local_site_default_post_listing_type").innerHTML = "default post listing type: " + local_site_default_post_listing_type;
      document.getElementById("local_site_default_theme").innerHTML = "default theme: " + local_site_default_theme;
      document.getElementById("local_site_enable_downvotes").innerHTML = "enable downvotes: " + local_site_enable_downvotes;
      document.getElementById("local_site_enable_nsfw").innerHTML = "enable nsfw: " + local_site_enable_nsfw;
      document.getElementById("local_site_federation_enabled").innerHTML = "federation enabled: " + local_site_federation_enabled;
      document.getElementById("local_site_federation_worker_count").innerHTML = "federation worker count: " + local_site_federation_worker_count;
      document.getElementById("local_site_hide_modlog_mod_names").innerHTML = "hide modlog mod names: " + local_site_hide_modlog_mod_names;
      document.getElementById("local_site_id").innerHTML = "id: " + local_site_id;
      document.getElementById("local_site_private_instance").innerHTML = "private instance: " + local_site_private_instance;
      document.getElementById("local_site_published").innerHTML = "published: " + local_site_published;
      document.getElementById("local_site_registration_mode").innerHTML = "registration mode: " + local_site_registration_mode;
      document.getElementById("local_site_reports_email_admins").innerHTML = "reports email admins: " + local_site_reports_email_admins;
      document.getElementById("local_site_require_email_verification").innerHTML = "require email verification: " + local_site_require_email_verification;
      document.getElementById("local_site_site_id").innerHTML = "site id: " + local_site_site_id;
      document.getElementById("local_site_site_setup").innerHTML = "site setup: " + local_site_site_setup;
      document.getElementById("local_site_slur_filter_regex").innerHTML = "slur filter regex: " + local_site_slur_filter_regex;
      document.getElementById("local_site_updated").innerHTML = "updated: " + local_site_updated;
      
      document.getElementById("local_site_rate_limit_comment").innerHTML = "rate limit comment: " + local_site_rate_limit_comment;
      document.getElementById("local_site_rate_limit_comment_per_second").innerHTML = "rate limit comment per second: " + local_site_rate_limit_comment_per_second;
      document.getElementById("local_site_rate_limit_id").innerHTML = "rate limit id: " + local_site_rate_limit_id;
      document.getElementById("local_site_rate_limit_image").innerHTML = "rate limit image: " + local_site_rate_limit_image;
      document.getElementById("local_site_rate_limit_image_per_second").innerHTML = "rate limit image per second: " + local_site_rate_limit_image_per_second;
      document.getElementById("local_site_rate_limit_local_site_id").innerHTML = "rate limit local site id: " + local_site_rate_limit_local_site_id;
      document.getElementById("local_site_rate_limit_message").innerHTML = "rate limit message: " + local_site_rate_limit_message;
      document.getElementById("local_site_rate_limit_message_per_second").innerHTML = "rate limit message per second: " + local_site_rate_limit_message_per_second;
      document.getElementById("local_site_rate_limit_post").innerHTML = "rate limit post: " + local_site_rate_limit_post;
      document.getElementById("local_site_rate_limit_post_per_second").innerHTML = "rate limit post per second: " + local_site_rate_limit_post_per_second;
      document.getElementById("local_site_rate_limit_published").innerHTML = "rate limit published: " + local_site_rate_limit_published;
      document.getElementById("local_site_rate_limit_register").innerHTML = "rate limit register: " + local_site_rate_limit_register;
      document.getElementById("local_site_rate_limit_register_per_second").innerHTML = "rate limit register per second: " + local_site_rate_limit_register_per_second;
      document.getElementById("local_site_rate_limit_search").innerHTML = "rate limit search: " + local_site_rate_limit_search;
      document.getElementById("local_site_rate_limit_search_per_second").innerHTML = "rate limit search per second: " + local_site_rate_limit_search_per_second;
      
      document.getElementById("site_actor_id").innerHTML = "actor id: " + site_actor_id;
      document.getElementById("site_description").innerHTML = "description: " + site_description;
      document.getElementById("site_icon").innerHTML = "icon: " + site_icon;
      document.getElementById("site_id").innerHTML = "id: " + site_id;
      document.getElementById("site_inbox_url").innerHTML = "inbox url: " + site_inbox_url;
      document.getElementById("site_instance_id").innerHTML = "instance id: " + site_instance_id;
      document.getElementById("site_last_refreshed_at").innerHTML = "last refreshed at: " + site_last_refreshed_at;
      document.getElementById("site_name").innerHTML = "name: " + site_name;
      document.getElementById("site_public_key").innerHTML = "public key: " + site_public_key;
      document.getElementById("site_published").innerHTML = "published: " + site_published;
      document.getElementById("site_sidebar").innerHTML = "sidebar: " + site_sidebar;
      document.getElementById("site_updated").innerHTML = "updated: " + site_updated;
      
      // img banner
      let thumbnail = data.site_view.site.icon
      document.getElementById("imgSRC").src = thumbnail;

      // descripton
      document.getElementById("description").innerHTML = site_description;

      document.getElementById("local").href = site_actor_id + "?dataType=Post&listingType=Local&page=1&sort=Hot";
      document.getElementById("federated").href = site_actor_id + "?dataType=Post&listingType=All&page=1&sort=Hot";
      hidewarningFunction()
      displayCardFunction()
    })
    .catch((err) => {
      console.log(err)
      hideCardFunction()
      document.getElementById("error").innerHTML = "Failed to connect! <br>Some servers are struggling right now and may fail to connect. <br>Check the url & try again in a few second.";
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