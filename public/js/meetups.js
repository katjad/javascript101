// const MEETUP_NEXT = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=CodeHub-Bristol&page=20'
// var processStatus = function (response) {
//     // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
//     if (response.status === 200 || response.status === 0) {
//         return Promise.resolve(response)
//     } else {
//         return Promise.reject(new Error(response.statusText))
//     }
// };

  $.ajax({
    url: 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=CodeHub-Bristol&page=20',
    type: "GET",
    dataType: 'jsonp',
    success: function (response) {
      var js101Events = response.results.filter(function(event) {
        return event.name === 'JavaScript 101'
      })
      let nextJS101 = js101Events.shift()
      let nextMeetTime = new Date(nextJS101.time)
      let nextMeet = document.getElementById('meet-next')
      let nextMeetLink = nextMeet.querySelector('a')
      nextMeetLink.setAttribute('href', nextJS101.event_url)
      let displayDate = nextMeetTime.toLocaleDateString('en-GB',{day: 'numeric', month: 'long', year: 'numeric'})
      nextMeetLink.innerHTML = displayDate
  }})

fetch('https://api.github.com/repos/codehuborg/discussions/issues?labels=js101')
  // .then(processStatus)
  .then(function (response) {
    return response.json()
  })
  .then(function(json){
    const lastMeet = json[0]
    const lastMeetHTML = '<a class="btn btn-primary" href="'+json[0].html_url+'">'+json[0].title+'</a>'
    const lastMeetDiv = document.getElementById('meet-prev')
    const links = lastMeetDiv.querySelectorAll('a')
    // console.log(links)
    if (links.length < 2) {
      lastMeetDiv.insertAdjacentHTML('afterbegin', lastMeetHTML)
    }
  })
  .catch(function(error){
    console.log(error)
})





// fetch(MEETUP_NEXT) // cannot use this, as not possible to send jsonp
//   .then(processStatus)
//   .then(function(response) {
//     return response.json()
//   })
//   .then(function(json){
//     const js101Events = json.results.filter(function(event) {
//         return event.name === EVENT_NAME
//     })
//     let nextJS101 = js101Events.shift()
//     let nextMeetTime = new Date(nextJS101.time)
//     let nextMeet = document.getElementById('meet-next')
//     let nextMeetLink = nextMeet.querySelector('a')
//     nextMeetLink.setAttribute('href', nextJS101.event_url)
//     let displayDate = nextMeetTime.toLocaleDateString('en-GB',{day: 'numeric', month: 'long', year: 'numeric'})
//     nextMeetLink.innerHTML = displayDate
//    })
//   .catch(function(error){
//     console.log(error)
//   })
