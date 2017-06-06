/*
Summary: Github API is called and list of all repos in the CodeHub are returned. Cards are created for each project repo and appended to the page
*/

const PROJECTS_URL = 'https://api.github.com/users/CodeHubOrg/repos'
const GITHUB_URL = 'https://github.com/CodeHubOrg'

 // project is an obj containing keys: projName, description, html_url, homepage plus others!
const makeCard = (project) => { 
  
  const {description, homepage, name: projName, html_url: repo} = project
  const desc = description === null ? 'No description found!' : description
  const app = homepage || repo

  const card = `<div class="col-sm-6 col-md-4 grid-item">
        <div class="thumbnail">
          <div class="caption">
            <h3>${projName}</h3>
            <p>${desc}</p>
            <p><a href=${app} class="btn btn-default" role="button">App</a> <a href=${repo} class="btn btn-default" role="button">Repo</a></p>
          </div>
        </div>
      </div>`

  return card
}

const appendCard = (card, locationToAppend) => {
  locationToAppend.insertAdjacentHTML('beforeend', card)
}

document.addEventListener("DOMContentLoaded", function (event) {

  // cache DOM
  const appendLocation = document.querySelector('.row-github')

  // append projects to page - the fetch will go here and teh forEach inside the fetch.
  // making too many api calls, so temporarily disabled this bit and using testApiResponse
  
    fetch(PROJECTS_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json)
        json.forEach(proj => {
          const card = makeCard(proj)
          appendCard(card, appendLocation)

          // init Masonry - appears to have to be called after the above cards are appended to the DOM.
          var grid = document.querySelector('.grid');
          var msnry = new Masonry(grid, {
            // options...
            itemSelector: '.grid-item'
          });

        })
      });
  

  //for testing, to avoid hitting the github API, comment out the above fetch block completely and uncomment this whole block instead. It will use the testApiResponse var from the top of this file.
/*
  const testApiResponse = [{
      "name": "repo1",
      "description": "this is the description1",
      "html_url": "https://github.com/octocat/repo1",
      "homepage": "https://myApp.com"
    },
    {
      "name": "repo2 - this has a very long title that causes wrapping",
      "description": "this is the description2, it's much longer than the first one and that makes the box bigger. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa enim, dictum sed mi volutpat, pulvinar rhoncus dolor. Cras mollis, massa ut bibendum vestibulum, turpis magna imperdiet tortor, nec consectetur ante justo vel mi. Suspendisse a placerat dui, nec tristique erat. Morbi vel pretium nisi, vitae sagittis risus. Donec porta massa nec augue sodales, vel luctus nunc sagittis. ",
      "html_url": "https://github.com/octocat/repo2",
      "homepage": "https://myApp.com"
    },
    {
      "name": "repo3 - this has a very long title that causes wrapping",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa enim, dictum sed mi volutpat, pulvinar rhoncus dolor. Cras mollis, massa ut bibendum vestibulum, turpis magna imperdiet tortor, nec consectetur ante justo vel mi. ",
      "html_url": "https://github.com/octocat/repo2",
      "homepage": "https://myApp.com"
    },
    {
      "name": "repo4 - this has a very long title that causes wrapping",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa enim, dictum sed mi volutpat, pulvinar rhoncus dolor. Cras mollis, massa ut bibendum vestibulum, turpis magna imperdiet tortor, nec consectetur ante justo vel mi. Suspendisse a placerat dui, nec tristique erat. Morbi vel pretium nisi, vitae sagittis risus. Donec porta massa nec augue sodales, vel luctus nunc sagittis. ",
      "html_url": "https://github.com/octocat/repo2",
      "homepage": "https://myApp.com"
    },
    {
      "name": "repo5 - this has a very long title that causes wrapping",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa enim, dictum sed mi volutpat, pulvinar rhoncus dolor. Cras mollis, massa ut bibendum vestibulum, turpis magna imperdiet tortor, nec consectetur ante justo vel mi. Suspendisse a placerat dui, nec tristique erat. Morbi vel pretium nisi, vitae sagittis risus. Donec porta massa nec augue sodales, vel luctus nunc sagittis. ",
      "html_url": "https://github.com/octocat/repo2",
      "homepage": "https://myApp.com"
    },
    {
      "name": "repo6",
      "description": "this is the description",
      "html_url": "https://github.com/octocat/repo3",
      "homepage": "https://myApp.com"
    }
  ]

  testApiResponse.forEach(proj => {
    const card = makeCard(proj)
    appendCard(card, appendLocation)
  })

  // init Masonry - appears to have to be called after the above cards are appended to the DOM.
  var grid = document.querySelector('.grid');
  var msnry = new Masonry(grid, {
    // options...
    itemSelector: '.grid-item'
  });
*/
})
