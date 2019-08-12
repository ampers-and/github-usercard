/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/ampers-and')
  .then( response => {
    const cards = document.querySelector('.cards');
    const gcard = createCard(response.data);
    cards.appendChild(gcard);
  })

  .catch( err => {
    console.log ('User Get Error', err);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//Instructors, not followers
const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(a => {
  axios.get(`https://api.github.com/users/${a}`)
  .then( response => {
    const cards = document.querySelector('.cards');
    const gcard = createCard(response.data);
    cards.appendChild(gcard);
  })

  .catch( err => {
    console.log ('Instructor Get Error', err);
  })
})

//Stretch
axios.get('https://api.github.com/users/ampers-and/followers')
  .then(response => {
    const cards = document.querySelector('.cards');
    response.data.forEach(a => {

      axios.get(`https://api.github.com/users/${a.login}`)
        .then( resp => {
          const gcard = createCard(resp.data);
          cards.appendChild(gcard);
        })

        .catch( err => {
          console.log ('Follower Info Get Error', err);
        })

    })
  })

  .catch( err => {
    console.log ('Follower Get Error', err);
  })



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

function createCard(x){

  //New Elements
  const card = document.createElement('div');
  const cpic = document.createElement('img');
  const cinfo = document.createElement('div');
  const cname = document.createElement('h3');
  const cusername = document.createElement('p');
  const clocation = document.createElement('p');
  const cprofile = document.createElement('p');
  const clink = document.createElement('A');
  const cfollowers = document.createElement('p');
  const cfollowing = document.createElement('p');
  const cbio = document.createElement('p');
  

  //Structure
  card.appendChild(cpic);
  card.appendChild(cinfo);
  cinfo.appendChild(cname);
  cinfo.appendChild(cusername);
  cinfo.appendChild(clocation);
  cinfo.appendChild(cprofile);
  cprofile.appendChild(clink);
  cinfo.appendChild(cfollowers);
  cinfo.appendChild(cfollowing);
  cinfo.appendChild(cbio);


  //Class Names
  card.classList.add('card');
  cinfo.classList.add('card-info');
  cname.classList.add('name');
  cusername.classList.add('username');

  //Content
  // cpic.setAttribute('src', x.avatar_url);
  cpic.src = x.avatar_url;
  cname.textContent = x.name;
  cusername.textContent = x.login;
  clocation.textContent = `Location: ${x.location}`;
  // cprofile.textContent = `Profile:`;
  // clink.setAttribute('href', x.url);
  clink.href = x.html_url;
  clink.textContent = "Profile: address to user's github page";
  // clink.text = "address to user's github page";
  cfollowers.textContent = `Followers: ${x.followers}`;
  cfollowing.textContent = `Following: ${x.following}`;
  cbio.textContent = `Bio: ${x.bio}`;

  //Stretch
  const button = document.createElement('span');
  button.classList.add('button');
  card.appendChild(button);
  button.textContent = `More`;
  button.addEventListener('click', () => {
    card.classList.toggle('card-open');
  });

  //Calendar Stretch
  const calendar = document.createElement('img');
  calendar.classList.add('calendar');
  cinfo.appendChild(calendar);
  calendar.src = `https://gist.github.com.ru/jcouyang/6336168ecbbf4fbdc46e.svg?username=${x.login}&width=400&height=60`;


  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
