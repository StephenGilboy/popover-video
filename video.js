// <iframe width="560" height="315" src="https://www.youtube.com/embed/-KT-r2vHeMM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

(function(popover) {
// https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fvideo%2F-KT-r2vHeMM&format=json
    const videoDIV = document.getElementById('video');
    const inputControl = document.getElementById('video-url');
    const popup = document.getElementById('popover');
    const addVideoBtn = document.getElementById('add-video');
    const popoverText = document.getElementById('popover-text');
    let iframe = document.createElement('iframe');
    let textIndex = 0;
    const textItems = [ 'Sex and Candy', 'Something Else', 'Who knew'];

    addVideoBtn.onclick = (e) => {
        const videoUrl = inputControl.value;
        // getVideoInfo('https://www.youtube.com/watch?v=-KT-r2vHeMM');
        iframe.src = videoUrl;
        iframe.style.setProperty('position', 'relative');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        iframe.setAttribute('allowfullscreen', '');
        videoDIV.removeChild(videoDIV.firstChild);
        videoDIV.appendChild(iframe);
        setInterval(togglePopup, 5000);
        e.preventDefault();
    }

    const getVideoInfo = (videoUrl) => {
        const url = new URL('https://www.youtube.com/oembed');
        url.searchParams.append('url', videoUrl);
        url.searchParams.append('format', 'json');        
        const req = new XMLHttpRequest();
        req.responseType = 'json';
        req.onload = (resp) => {
            console.log(req.response);
        }
        req.open('GET', url);
        req.send();
    }

    const togglePopup = () => {
        if (popup.style.display === 'none') {
            setText();
            const position = getPosition();
            console.log(position);
            popup.style.top = `${position[0]}px`;
            popup.style.left = `${position[1]}px`;
            popup.style.display = 'inline'
        }
        else
            popup.style.display = 'none';
    }

    const getPosition = () => {
        var x = window.innerHeight - 100;
        var y = window.innerWidth - 100;
        var randomX = Math.floor(Math.random()*x);
        var randomY = Math.floor(Math.random()*y);
        return [randomX,randomY];
    }

    const setText = () => {
        if (textIndex >= textItems.length) {
            textIndex = 0;
        }
        popoverText.innerText = textItems[textIndex];
        textIndex++;
    }

}(window.popover = window.popover || {}))