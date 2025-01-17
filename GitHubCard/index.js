/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios
  .get("https://api.github.com/users/mpaolodr")
  .then(function(response) {
    parentElem.appendChild(createComp(response.data));
  })
  .catch(function(error) {
    console.log(error);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const parentElem = document.querySelector(".cards");

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [
//   "tetondan",
//   "dustinmyers",
//   "justsml",
//   "luishrd",
//   "bigknell",
//   "vinnihoke",
//   "Judson00",
//   "MicheSi",
//   "CAM603",
//   "Jrive204",
//   "skyesaj"
// ];

// followersArray.forEach(function(user) {
//   axios
//     .get(`https://api.github.com/users/${user}`)
//     .then(function(response) {
//       parentElem.appendChild(createComp(response.data));
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createComp(obj) {
  //CREATE ELEMENTS
  const cardCont = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const link = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  //For button
  const openBtn = document.createElement("span");
  const closeBtn = document.createElement("span");

  //For calendar
  const calCont = document.createElement("div");

  //SETUP CLASSES
  cardCont.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  //For calendar
  calCont.classList.add("calContainer");

  //For button
  openBtn.classList.add("btn");
  closeBtn.classList.add("btn", "hide");

  //SETUP ATTRIBUTES
  image.setAttribute("src", obj.avatar_url);
  link.setAttribute("href", obj.html_url);

  //SETUP CONTENT
  name.textContent = obj.name;
  userName.textContent = obj.login;
  if (obj.location !== null) {
    location.textContent = `Location: ${obj.location}`;
  }
  profile.textContent = "Profile: ";
  link.textContent = obj.html_url;
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;
  if (obj.bio !== null) {
    bio.textContent = `Bio: ${obj.bio}`;
  }
  //For button
  openBtn.textContent = "\u21A1";
  closeBtn.textContent = "\u24E7";

  //APPEND
  cardCont.appendChild(image);
  cardCont.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(link);

  // For Button
  cardCont.appendChild(openBtn);
  cardCont.appendChild(closeBtn);

  //For calendar
  cardCont.appendChild(calCont);
  new GitHubCalendar(calCont, obj.login);

  openBtn.addEventListener("click", function() {
    cardCont.classList.toggle("card--open");
    openBtn.classList.toggle("hide");
    closeBtn.classList.toggle("hide");
  });

  closeBtn.addEventListener("click", function() {
    cardCont.classList.toggle("card--open");
    openBtn.classList.toggle("hide");
    closeBtn.classList.toggle("hide");
  });

  return cardCont;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function reqData() {
  axios
    .get(`https://api.github.com/users/mpaolodr`)
    .then(response => {
      axios
        .get(response.data.followers_url)
        .then(newResponse => {
          newResponse.data.forEach(follower => {
            axios
              .get(`https://api.github.com/users/${follower.login}`)
              .then(followerResponse => {
                parentElem.appendChild(createComp(followerResponse.data));
              })
              .catch(followerError => {
                console.log(followerError);
              });
          });
        })
        .catch(newError => {
          console.log(newError);
        });
    })

    .catch(error => {
      console.log(error);
    });
}
reqData();
