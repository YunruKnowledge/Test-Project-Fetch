



//Global var
var nextPage = 1;

//Fetch
async function fetchImages(query) {
    return await fetch(`https://jsonplaceholder.typicode.com/albums/${query}/photos`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const data = Array.from(json)
            return data
        })
        .catch(err=>{
            console.log(err);
        })
}

async function fetchProfile(query) {
    return await fetch(`https://randomuser.me/api/${query}`)
        .then(response => response.json())
        .then(json => {
            // console.log(json.results[0])
            const data = json.results[0]
            return data
        })
        .catch(err=>{
            console.log(err);
        })
}

//Gallery functions
function addImages(ImageArray) {
    for (let index = 0; index < ImageArray.length; index++) {
        const data = ImageArray[index];
        
        const container = document.querySelector("main")
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("image_container")
        const image = document.createElement("img")
        image.classList.add("image_thumb")
        image.src = data.thumbnailUrl
        const imageTitle = document.createElement("p")
        imageTitle.classList.add("image_container_text")
        imageTitle.textContent = data.title

        //appends and adds eventlistener
        container.appendChild(imageContainer).appendChild(image).addEventListener("click", ()=> {viewFullImage(data.id, data.url, data.title)})
        container.appendChild(imageContainer).appendChild(imageTitle)
    }
}

function viewFullImage(past_id, past_url, past_title) {
    const container = document.querySelector("body")
    const overlay = document.createElement("div")
    overlay.classList.add("overlay")

    container.appendChild(overlay)

    fetchProfile("?inc=email,gender,location,login,picture,registered&noinfo") 
        .then(data => {
            const text = document.createElement("p")
            const div = document.createElement("div")
            const display = document.createElement("div")
            display.classList.add("overlay_display")
            
            const image = document.createElement("img")
            image.src = past_url
            const title = document.createElement("span")
            title.textContent = past_title
            let intro = title.cloneNode()
            intro.textContent = "Published by:"
            
            const profile = document.createElement("div")
            profile.classList.add("overlay_profile")
            let p_name = text.cloneNode()
            let p_email = text.cloneNode()
            let p_gender = text.cloneNode()
            let p_pic = image.cloneNode()
            let p_loc = text.cloneNode()
            let p_date = text.cloneNode()
        
            p_name.textContent = data.login.username
            p_email.textContent = data.email
            p_gender.textContent = data.gender
            p_pic.src = data.picture.thumbnail
            p_loc.textContent = data.location.country
            p_date.textContent = data.registered.date
            
            //appends
            container.appendChild(overlay).appendChild(display).appendChild(image)
            container.appendChild(overlay).appendChild(display).appendChild(title)
            container.appendChild(overlay).appendChild(display).appendChild(intro)
            container.appendChild(overlay).appendChild(display).appendChild(profile).appendChild(p_pic)
            container.appendChild(overlay).appendChild(display).appendChild(profile).appendChild(div).appendChild(p_name)
            container.appendChild(overlay).appendChild(display).appendChild(profile).appendChild(div).appendChild(p_email)
            container.appendChild(overlay).appendChild(display).appendChild(profile).appendChild(p_loc)
            container.appendChild(overlay).appendChild(display).appendChild(profile).appendChild(p_date)
            //adds eventlistener
            container.appendChild(overlay).addEventListener("click", (e)=>{
                if (!e.target.classList.contains("overlay")) return
                e.target.remove()
            })
        })
}

function viewMore() {
    fetchImages(nextPage)
        .then(data => (addImages(data)))
        .then(nextPage++)
}

//init
function OnInit() {
    const input_btn = document.getElementById("btn")
    input_btn.addEventListener("click", ()=>{
        viewMore()
    })
    
    viewMore()
}
OnInit()