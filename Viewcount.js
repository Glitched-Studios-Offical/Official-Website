// Create an iframe to load a tracking pixel from http://besucherzaehler.co/conversion
const ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://besucherzaehler.co/conversion");
ifrm.style.width = "0" + "px";
ifrm.style.height = "0" + "px";
ifrm.style.border = "0" + "px";
document.body.appendChild(ifrm);

// Function to remove trailing slashes from a string
function trimTrailingSlash(string) {
  if (string != null) {
    return string.replace(/\/+$/, '');
  } else {
    return string;
  }
}

// Set ctrHref and ctrHref2 to https://www.easybooking.eu/ with trailing slashes removed
const ctrHref = trimTrailingSlash('https://www.easybooking.eu/'.trim());
const ctrHref2 = trimTrailingSlash('https://www.easybooking.eu/'.trim());

// Function to check if an element is within the document
function eInDoc(e) {
  while (e = e.parentNode) {
    if (e == document) {
      return true;
    }
  }
  return false;
}

// Function to check if a link's href attribute matches the target URL
function lCheck(l) {
  if (null != l && null != l.getAttribute('href') && (ctrHref === '' || trimTrailingSlash(l.getAttribute('href').trim()) === ctrHref || trimTrailingSlash(l.href.trim()) === ctrHref || trimTrailingSlash(l.getAttribute('href').trim()) === ctrHref2 || trimTrailingSlash(l.href.trim()) === ctrHref2)) {
    return true;
  } else {
    return false;
  }
}

// Flag to indicate if a link matching the criteria is found
let linkfound = false;

// Variable to store the link element to be hidden if found
let linkToHide;

// Code execution on window load
window.onload = function() {
  const els = document.getElementsByTagName('a');
  const l = els.length;
  for (let i = 0; i < l; i++) {
    const el = els[i];
    if (trimTrailingSlash(el.href) === ctrHref || trimTrailingSlash(el.getAttribute('href')) === ctrHref || trimTrailingSlash(el.href) === ctrHref2 || trimTrailingSlash(el.getAttribute('href')) === ctrHref2) {
      linkfound = true;
      linkToHide = el;
      if (el.getAttribute('rel') === 'nofollow' || !eInDoc(el) || !lCheck(el)) {
        linkfound = false;
      }
      const linktext = el.innerHTML;
      if (linktext === undefined) {
        linkfound = false;
      } else if (linktext.trim() === '') {
        linkfound = false;
      }
      if (el.offsetHeight !== undefined && el.offsetHeight < 8) {
        linkfound = false;
      }
      break;
    }
  }
  if (linkfound) {
    linkToHide.innerHTML = '';
  }
  if (linkfound === false) {
    const div = document.createElement('div');
    div.id = 'error_a823c8d4b1bffbd00305d29472d1cd70a8539a2e';
    div.innerHTML = '<a href="http://besucherzaehler.co/?id=a823c8d4b1bffbd00305d29472d1cd70a8539a2e">Besucherzähler Fehler: Code nicht ändern. Hier klicken, um den neuen Code zu generieren!</a>';
    if (document.getElementById('besucherzaehler2') !==null) {
      document.getElementById('besucherzaehler2').parentNode.insertBefore(div, document.getElementById('besucherzaehler2').nextSibling);
    } else {
      document.body.appendChild(div);
    }
    const widget = document.getElementById('besucherzaehler2');
    if (widget) {
      widget.style.visibility = 'hidden';
    }
  }
  (function() {
    const d = document,
      g = d.createElement('img'),
      s = d.getElementsByTagName('script')[0];
    g.src = '//stats.symptoma.com/matomo.php?idsite=1&rec=1&action_name=Chatbot&url=https://www.symptoma.com/chatbot&urlref=';
    g.style = 'border:0;';
    g.alt = '';
    s.parentNode.insertBefore(g, s);
  })();
}
