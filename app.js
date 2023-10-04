let ip;

const ipData = document.getElementById('ip')
const startbtn = document.getElementById('start')




const ipAddress = () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            ipData.innerText = data.ip
            console.log(data.ip)
            ip = data.ip;
        })
}


// Get Started, get Geo Location
const getLocation =  async () => {
    if (!ip) {
        console.log('no IP available')
        return
    }

    
    locationURL = `https://ipapi.co/${ip}/json/`
    const res = await fetch(locationURL)
    const data = await res.json()
    console.log(data)
    const userData = JSON.stringify(data)
    localStorage.setItem('userIp', userData)
    
    window.location.href='./page2.html'
    // const map = document.getElementById('map')
    // console.log(map)


    // current location map
    
    
    mapData = data
    return data;
}


window.onload = function () {
    ipAddress()

}

startbtn.addEventListener('click', getLocation)