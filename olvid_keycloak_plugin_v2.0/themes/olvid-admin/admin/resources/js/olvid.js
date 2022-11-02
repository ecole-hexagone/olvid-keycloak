
function fetchConfiguration(containerElement) {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/auth/realms/master/olvid-rest/configuration", true)
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                displayConfiguration(JSON.parse(xhr.responseText), containerElement)
            } else {
                displayError(containerElement)
            }
        }
    }
    xhr.onerror = function (e) {
        displayError(containerElement)
    }
    xhr.send(JSON.stringify({
        q: 1,
    }))
}

function displayConfiguration(configuration, containerElement) {
    containerElement.innerHTML = '';
    const template = document.createElement('template')

    const realms = Object.keys(configuration.realmConfigurations).sort()
    for (const realm of realms) {
        var html = '<div class="olvid-realm"><h1>Realm <strong>' + realm + '</strong></h1>' +
            '<h2>Settings:</h2>' +
            '<div class="olvid-save-button" id="' + realm + '-save-button">Save<i class="onsuccess fa fa-check fa-2x"></i><i class="onerror fa fa-times fa-2x"></i></div>' +
            '<div class="olvid-form"><label for="' + realm + '-server-url">Olvid Server URL</label>' +
            '<input id="' + realm + '-server-url" name="' + realm + '-server-url" type="text" value=""/></div>' +
            '<div class="olvid-form"><label for="' + realm + '-keycloak-api-key">Keycloak API Key</label>' +
            '<input id="' + realm + '-keycloak-api-key" name="' + realm + '-keycloak-api-key" type="text" value=""/></div>' +
            '<div class="olvid-form"><input id="' + realm + '-revocation-allowed" name="' + realm + '-revocation-allowed" type="checkbox" /><label class="chckbx-label" for="' + realm + '-revocation-allowed">Revocation allowed</label></div>' +
            '<h2>Configuration links:</h2>'

        try {
            const clients = Object.keys(configuration.configurationLinks[realm]).sort()
            for (const client of clients) {
                html += '<div class="olvid-configuration-link">' +
                    '<strong>' + client + '</strong> ' +
                    '<a href="' + configuration.configurationLinks[realm][client] + '" target="_blank">configuration link <i class="fa fa-external-link fa-lg"></i></a></div>'
            }
        } catch (e) {
            // do nothing
            html += "-"
        }

        html += '</div>'

        template.innerHTML = html
        containerElement.appendChild(template.content.firstChild)

        const serverUrl = configuration.realmConfigurations[realm].serverUrl;
        if (serverUrl) {
            containerElement.querySelector('[name="' + realm + '-server-url"]').value = serverUrl
        }
        const serverKeycloakApiKey = configuration.realmConfigurations[realm].serverKeycloakApiKey;
        if (serverKeycloakApiKey) {
            containerElement.querySelector('[name="' + realm + '-keycloak-api-key"]').value = serverKeycloakApiKey
        }
        const revocationAllowed = configuration.realmConfigurations[realm].revocationAllowed;
        if (revocationAllowed) {
            containerElement.querySelector('[name="' + realm + '-revocation-allowed"]').checked = 'checked'
        } else {
            containerElement.querySelector('[name="' + realm + '-revocation-allowed"]').removeAttribute('checked')
        }

        const saveButton = containerElement.querySelector('[id="' + realm + '-save-button"]')
        saveButton.onclick = ev => {
            saveSettings(
                saveButton,
                realm,
                containerElement.querySelector('[name="' + realm + '-server-url"]').value,
                containerElement.querySelector('[name="' + realm + '-keycloak-api-key"]').value,
                containerElement.querySelector('[name="' + realm + '-revocation-allowed"]').checked)
        }
    }
}

function displayError(containerElement) {
    const template = document.createElement('template')
    template.innerHTML = '<div class="olvid-error"><i class="fa fa-exclamation-circle fa-lg"></i> Error retrieving Olvid settings</div>'
    containerElement.innerHTML = '';
    containerElement.appendChild(template.content.firstChild)
}

function saveSettings(saveButton, realm, serverUrl, serverKeycloakApiKey, revocationAllowed) {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/auth/realms/master/olvid-rest/configuration", true)
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                saveSuccess(saveButton)
            } else {
                saveError(saveButton)
            }
        }
    }
    xhr.onerror = function (e) {
        saveError(saveButton)
    }
    xhr.send(JSON.stringify({
        q: 2,
        realmId: realm,
        keycloakConfiguration: {
            serverUrl: serverUrl.trim().length === 0 ? null : serverUrl.trim(),
            serverKeycloakApiKey: serverKeycloakApiKey.trim().length === 0 ? null : serverKeycloakApiKey.trim(),
            revocationAllowed: revocationAllowed
        }
    }))
}

function saveError(saveButton) {
    saveButton.className = 'olvid-save-button olvid-save-error'
    new Promise(() => {
        setTimeout(() => {
            saveButton.className = 'olvid-save-button'
        }, 1000)
    })
}

function saveSuccess(saveButton) {
    saveButton.className = 'olvid-save-button olvid-save-success'
    new Promise(() => {
        setTimeout(() => {
            saveButton.className = 'olvid-save-button'
        }, 1000)
    })
}


document.addEventListener("DOMContentLoaded", async function () {
    const template = document.createElement('template')
    template.innerHTML = '<div id="olvid-button"><a id="opener">Olvid Settings<i id="olvid-openicon" class="fa fa-arrows-alt fa-lg"></i><i id="olvid-closeicon" class="fa fa-times-circle fa-lg"></i></a><div id="olvid-content"></div></div>'
    document.querySelector('html').appendChild(template.content.firstChild)

    template.innerHTML = '<div id="olvid-button-mask"/>'
    document.querySelector('html').appendChild(template.content.firstChild)

    const button = document.getElementById("olvid-button");
    const content = document.getElementById("olvid-content");

    document.getElementById('opener').onclick = ev => {
        if (button.className === "open") {
            button.removeAttribute("class")
            content.innerHTML = ''
        } else {
            button.className = "open"
            fetchConfiguration(content)
        }
        return false
    }
})