document.addEventListener("DOMContentLoaded", function () {
 const template = document.createElement('template');
 template.innerHTML = '<div>'
  + '<div id="topBanner"></div>'
  + '<div id="olvidlogo"></div>'
  + '</div>';
 document.querySelector('html').appendChild(template.content.firstChild);
});

