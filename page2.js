
// IP Data
const lat = document.getElementById('lat')
const long = document.getElementById('long')
const city = document.getElementById('city')
const region = document.getElementById('region')
const organisation = document.getElementById('organisation')
const hostname = document.getElementById('hostname')
const ip = document.getElementById('ip')
const map = document.getElementById('map')
const timezone = document.getElementById('timezone')
const pinCode = document.getElementById('PC')
const dateTime = document.getElementById('DT')
const message = document.getElementById('msg')
const postbox = document.getElementById('post-box')



async function getDetails() {
    // const ipData = localStorage.getItem('userIp')
    console.log('page2 loaded')
    const ipData = JSON.parse(localStorage.getItem('userIp'))
    console.log(ipData)
    lat.innerText = ipData.latitude
    long.innerText = ipData.longitude
    city.innerText = ipData.city
    region.innerText = ipData.region
    organisation.innerText = ipData.organisation
    ip.innerText = ipData.ip
    hostname.innerText = ipData.asn
    timezone.innerText = ipData.timezone
    pinCode.innerText = ipData.postal

    // Map
    map.src = `https://maps.google.com/maps?q=${ipData.latitude}, ${ipData.longitude}&z=15&output=embed`


    // current time
    const currentTime = new Date().toLocaleString('en-US', { timeZone: `${ipData.timezone}` })
    console.log(currentTime.split(','))
    dateTime.innerText = currentTime

    // List of the Post Offices

    try {
        const post = await fetch(`https://api.postalpincode.in/pincode/440024`)
        const list = await post.json()
        console.log(list[0].PostOffice)
        message.innerText = list[0].Message
        // console.log(post)
        list[0].PostOffice.forEach(element => {
            const newElement = document.createElement('div')
            const newElementHtml =`<h4 class="text-white-50">Name: <span class="ipDetails">${element.Name}</span></h4>
            <h4 class="text-white-50">Branch Type: <span class="ipDetails">${element.BranchType}</span></h4>
            <h4 class="text-white-50">Delivery Status: <span class="ipDetails">${element.DeliveryStatus}</span></h4>
            <h4 class="text-white-50">District: <span class="ipDetails">${element.District}</span></h4>
            <h4 class="text-white-50">Division: <span class="ipDetails">${element.Division}</span></h4>`
        //     const newCard = `<div class="col bg-purple p-4 text-start">
        
        // </div>`
            newElement.innerHTML = newElementHtml
            newElement.classList.add('p-4', 'bg-purple', 'text-start')
        postbox.appendChild(newElement)
        });
    //     
    
    
        return ipData
        
    } catch (error) {
        console.error('error:', error)
    }

   
}







window.addEventListener('load', getDetails)