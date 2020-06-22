const form = document.getElementById('form')
const youtubeChannelId = require('get-youtube-channel-id')
const API_KEY = '#'
let channelId
let id
let result
let username
let user

form.addEventListener('submit' , function(event){
    event.preventDefault()
    channelId = document.getElementById('channelId').value
    result = youtubeChannelId(channelId)
    result.then(function(data){
        console.log(data)
        if(!data.username){
            id = data.id
            getData(id)
        }
        else{
            username = data.username
            convertUserNameToId(username)
        }
    })
})

function convertUserNameToId(username){
    const url = "https://www.googleapis.com/youtube/v3/channels?key="+
    API_KEY+"&forUsername="+username+
    "&part=id"

    $.get(url , function(data){
        console.log(data)
        id = data.items[0].id
        getData(id)
    })

}


function getData(id){

    clearFields()

    const url = "https://www.googleapis.com/youtube/v3/channels?key="+API_KEY+"&id="+id+"&part=snippet,contentDetails,statistics"
    
    $.get(url , function(data){
        console.log(data)
        user = `
            <h2>${data.items[0].snippet.title}</h2>
            <img class="img-circle" src="${data.items[0].snippet.thumbnails.default.url}"/>
            <h2> Subscribers : ${data.items[0].statistics.subscriberCount}</h2>
            <h2> Views: ${data.items[0].statistics.viewCount}</h2>
            <h2> Videos: ${data.items[0].statistics.videoCount}</h2>
            <h2> Published At ${data.items[0].snippet.publishedAt} </h2>
        `
        $("#result").html(user)
    })
}

function clearFields(){
    $("#channelId").val("")
    $("result").empty()
}