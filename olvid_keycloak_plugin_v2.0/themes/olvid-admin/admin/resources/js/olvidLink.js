document.addEventListener("DOMContentLoaded", async function () {
    const template = document.createElement('template')
    template.innerHTML = '<div id="olvid-button"><a id="opener"> Olvid Admin Console <svg id="linkIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">\n' +
        '  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>\n' +
        '  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>\n' +
        '</svg></i></a><div id="olvid-content"></div></div>'
    document.querySelector('html').appendChild(template.content.firstChild)

    template.innerHTML = '<div id="olvid-button-mask"/>'
    document.querySelector('html').appendChild(template.content.firstChild)

    const button = document.getElementById("olvid-button");
    const content = document.getElementById("olvid-content");

    document.getElementById('opener').onclick = ev => {
        if (button.className === "open") {
            button.removeAttribute("class")
            content.innerHTML = ''
            console.log("=open")
        } else {
            console.log("else")
            window.open('/olvid/#/');
            content.innerHTML = '<div><a href="/olvid" target="_blank"> Hello </a></div>'

        }
        return false
    }
})

