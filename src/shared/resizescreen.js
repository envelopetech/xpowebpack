export function resizescreenpopup(elements) {    
    var screenheight = window.innerHeight;
    var bottomsectionheight = document.getElementById("divright").offsetHeight
    console.log(screenheight)
    console.log(bottomsectionheight)
    //if (document.getElementById("popupdiv")) {               
    elements.style.overflowY = "scroll";
    var height = (screenheight - bottomsectionheight) + "px";
    elements.style.height = height.toString();
    //}
}