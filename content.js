//-------------------
// append toolkit div
//-------------------

var arena_toolkit = document.createElement("div");
arena_toolkit.setAttribute("id", "arena_toolkit");
document.body.appendChild(arena_toolkit);


//--------------
// attatch tools
//--------------

function newTool(tool_name) {

  var arena_tool;

  arena_tool = document.createElement("div");
  arena_tool.setAttribute("class", "arena_tool arena_tool_closed");
  arena_tool.setAttribute("id", tool_name);
  arena_tool.innerHTML = '<a class="arena_tool_resize" <a class="modalize-close js-modalize-close"><span class="iconic iconic-sm" data-glyph="x" title="x" aria-hidden="true"></span></a><div class="arena_tool_canvas"></div>';
  arena_toolkit.appendChild(arena_tool);
}

newTool("arena_toolkit_print");

newTool("arena_toolkit_maps");

newTool("arena_toolkit_radio");


//---------------
// resizing logic
//---------------

let arena_toolkit_tool = document.getElementsByClassName('arena_tool');

Object.keys(arena_toolkit_tool).map((key, index) => {
  arena_toolkit_tool[key].onclick = function() {
    if(arena_toolkit_tool[key].classList.contains("arena_tool_closed")) {
      arena_toolkit_tool[key].classList.add("arena_tool_open");
      arena_toolkit_tool[key].classList.remove("arena_tool_closed");
    } else {
      arena_toolkit_tool[key].classList.add("arena_tool_closed");
      arena_toolkit_tool[key].classList.remove("arena_tool_open");
    }
  }
});


//----------------------
// reloaded notification
//----------------------

function updateNotification(message, duration) {
  var updated = document.createElement("h3");
  updated.setAttribute("class", "arena_toolkit_updated arena_toolkit_updated_hidden");
  updated.innerHTML = message;
  setTimeout(function(){
    updated.classList.remove("arena_toolkit_updated_hidden");
    updated.classList.add("arena_toolkit_updated_visible");
  }, 100);
  setTimeout(function(){
    updated.classList.add("arena_toolkit_updated_hidden")
  }, duration - 1000);
  setTimeout(function(){
    updated.parentNode.removeChild(updated);
  }, duration);
  document.body.appendChild(updated);
}

chrome.storage.local.get(['status'], function(items) {
  if(items.status === 'reloaded') {
    // notification
    updateNotification("reloaded", 4000);
    console.log('> content reloaded')
    // record reloaded message
    chrome.storage.local.set({'status': 'notified'}, function() {
      console.log('> notified');
    });
  }
});


//--------------------------------
// watch for local sotrage changes
//--------------------------------

chrome.storage.onChanged.addListener(function(changes, namespace) {

  for (key in changes) {
    var storageChange = changes[key];
    // log storage change
    console.log('key "%s" in namespace "%s" changed ' +
              '"%s" -> "%s"',
              key,
              namespace,
              storageChange.oldValue,
              storageChange.newValue);
  }
});


//-----------------
// toolkit settings
//-----------------

//if(window.location.href.indexOf('are.na/tools/') > -1) {
//  console.log('hello!')
//}
//  <li class="tab--container__nav__item tab--container__nav__item--bookmarklet is-active"><h5><a href="/tools/bookmarklet">Bookmarklet</a></h5></li>
