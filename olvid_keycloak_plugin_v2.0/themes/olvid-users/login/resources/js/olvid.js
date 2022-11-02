document.addEventListener("DOMContentLoaded", function () {
 if (document.location.pathname.endsWith('login-actions/authenticate')) {
  const template = document.createElement('template');
  template.innerHTML = '<div>'
   + '<div id="topBanner"></div>'
   + '<a id="signout"><button class="button">Sign Out</button></a>'
   + '<div id="olvidlogo"></div>'
   + '</div>';
  template.content.querySelector('#signout').addEventListener("click", function() {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', '../protocol/openid-connect/logout');
   xhr.addEventListener("load", function() {
    history.back();
   });
   xhr.addEventListener("error", function () {
    history.back();
   });
   xhr.send();
  });
  document.querySelector('html').appendChild(template.content.firstChild);
 } else {
  const template = document.createElement('template');
  template.innerHTML = '<div>'
   + '<div id="topBanner"></div>'
   + '<div id="olvidlogo"></div>'
   + '</div>';
  document.querySelector('html').appendChild(template.content.firstChild);
 }
});
