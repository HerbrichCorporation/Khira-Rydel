//RydelJS benannt nach Khira Rydel von der Station 2D aus der Schönklinik Hamburg Eilbek
//Dieses Script stammt von Aleksandar Herbrich (https://www.herbrich.org) Gepriesen sei das Rauhe Haus
function NavigateTo(page) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function () {
        console.log("Rydel Readystate: " + this.readyState);
        console.log("Rydel HTTP-State: " +this.status);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("rydel").innerHTML = GetContent(this.responseText);
            document.title = GetTitle(this.responseText);
            RydelMeta(this.responseText);
            window.history.pushState("", "", '/' + page);
        }
        else if(this.readyState == 4 && this.status == 404) {
            alert("Khira Rydel ist nicht zu hause :D");
        }
    });
    console.log("REQUEST: " + page);
    request.open("GET", page, true);
    request.send();
}
function GetContent(khira) {
    let rydel2E = new DOMParser().parseFromString(khira, 'text/html')
    return rydel2E.getElementById("rydel").innerHTML;
}
function GetTitle(khira){
    let rydel2D = new DOMParser().parseFromString(khira,'text/html');
    return rydel2D.title;
}
function RydelMeta(khira){
    let KhiraRydel = new DOMParser().parseFromString(khira,'text/html');
    let RydelTags = KhiraRydel.querySelectorAll("meta");
    for(let KhirasMetaTag of RydelTags){
        for (let Khira2D of document.querySelectorAll("meta")){
            if(KhirasMetaTag.getAttribute("name") != Khira2D.getAttribute("name") && KhirasMetaTag.hasAttribute("rydel-static") == true){
              let KhirasEntry = document.createElement("meta");
              KhirasEntry.setAttribute("name",KhirasMetaTag.getAttribute("name"));
              KhirasEntry.setAttribute("content",KhirasMetaTag.getAttribute("content"));
              document.querySelector("head").appendChild(KhirasEntry);
            }
        }
    }
}
