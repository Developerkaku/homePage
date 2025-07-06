
//Preventing the page scroll when the space bar is hit 

document.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        // e.preventDefault();
    }
});

var elems = document.getElementsByTagName("pre");
const ide = document.getElementById("main-container");
var errBuffer = false;

alert("For now statement 'reload' reloads the page \n An error statement falls apart\n New functions will be updated");
function valid(key) {
    let validTxt = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd',
        'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D',
        'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
        ' ', '!', '$', '%', '^', '@', '#', '*', '&', '(', ')', '-', '_',
        '[', ']', '{', '}', '+', '=', '\\', '|', ':', ';', '\'', '\"',
        ',', '<', '.', '>', '/', '?'
    ];

    for (let i = 0; i < validTxt.length; i++) {
        if (validTxt[i] === key) {
            return true;
        }
    }

    return false;
}

function validExtra(key) {
    switch (key) {
        case "Enter": {

            //ANIMATING THE ERROR LINE !!!

            if (predefined(elems[elems.length - 1].innerHTML.slice(8))) { }
            else {
                let errPre = elems[elems.length - 1];
                errPre.style.animation = "errShake .2s linear";

                let maxDelay = 0;

                setTimeout(() => {

                    let container = document.createElement("span");
                    container.className = "errContainer";
                    container.setAttribute('data-link-no', String(document.getElementsByTagName("pre").length));


                    let sh = (elems.length - 1) * errPre.clientHeight;
                    if (sh >= ide.clientHeight) {
                        errBuffer = true;
                        sh = ide.clientHeight - errPre.clientHeight;
                    }
                    container.style.top = sh + "px";

                    errPre.insertAdjacentElement("afterend", container);

                    let statement = errPre.innerHTML.slice(8);

                    for (let i = 0; i < statement.length; i++) {

                        let delay = Math.random() * 1;
                        maxDelay = (maxDelay < delay) ? delay : maxDelay;
                        maxDelay = Math.round(maxDelay);

                        let span = document.createElement("span");
                        span.className = "falling";
                        span.innerHTML = statement[i];
                        span.style.animationDelay = delay + "s";

                        container.appendChild(span);

                    }
                    errPre.innerHTML = "----&gt;";
                    errPre.style.width = "0px";

                    insertPre();
                    updateErrContainers();

                    setTimeout(() => {
                        let errorContainers = document.getElementsByClassName("errContainer");

                        let errors = document.querySelectorAll(".errContainer > .falling");

                        for (let i = 0; i < errors.length; i++) {
                            var windowHeight = window.innerHeight;
                            if (getComputedStyle(errors[i]).top.replace("px", "") >= windowHeight) {
                                errors[i].remove();
                            }
                        }

                        for (let i = 0; i < errorContainers.length; i++) {
                            if (errorContainers[i].innerHTML == "") {
                                errorContainers[i].remove();

                                if (errBuffer != 0) { errBuffer--; }
                            }
                        }

                    }, 4000 + (maxDelay * 1000));

                }, 200);
            }
            break;
        }
        case "Backspace": {
            let elem = document.getElementsByClassName("active");
            elem[0].innerHTML = elem[0].innerHTML.slice(0, elem[0].innerHTML.length - 1);
            break;
        }
        case "Tab": {
            alert("Tab key is not supported yet !");
            let elem = document.getElementsByClassName("active");
            elem[0].innerHTML += "    ";
            break;
        }

        //handling in case of mobile browsers 

        case {}: {
            alert("ochchindi bey !!!");
        }
    }

    return 0;
}

function insertPre() {

    let pre = document.createElement("pre");
    pre.innerHTML = "----&gt;";
    ide.appendChild(pre);

    elems = document.getElementsByTagName("pre");
    let activePre = elems[elems.length - 1];
    activePre.className = "active";

    for (let i = 0; i < elems.length - 1; i++) {
        elems[i].className = "notActive";
    }

    //scroll the page for visibility !!
    ide.scrollTo(0, ide.scrollHeight);
}

function updateErrContainers() {
    let errContainers = document.getElementsByClassName("errContainer");
    // console.log(errContainers.length);
    let i = 0;

    while (errBuffer && (i < errContainers.length)) {
        errContainers[i].style.top = errContainers[i].style.top.replace("px", "") - document.getElementsByTagName("pre")[0].clientHeight + "px";
        i++;
    }
}

function predefined(string) {

    switch (string) {
        
        case "reload":
            location.reload();
            return true;
        
        case "close":
            window.location.href = "about:blank"; // This is a workaround for browsers that block window.close()
            return true;
        
        default:
            // Handle other predefined statements or return false
            let mainAction = string.split("/")[0];
       
            if( mainAction == "search" ) {
                let query = string.split("/")[1];
                if (query) {
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    window.location.href = searchUrl;
                    return true;
                }
            }
            if( mainAction == "open" ) {
                // let url = string.split("/")[2];
                let url = string.substring(string.indexOf("/") + 1); // Remove 'search/' prefix
// alert(query);
                if (url) {
                    if (!url.startsWith("http://") && !url.startsWith("https://")) {
                        url = "https://" + url; // Default to http if no protocol is specified
                    }
                    // the above can't really be use though 
                    //cause the spilt functoin is f'ing up !!
                    window.open(url, "_self");
                    return false;
                }
            }
            // return false;    
    }

    return false;
}

// window.addEventListener("keydown", (e) => {

//     elems = document.getElementsByTagName("pre");

//     if (validExtra(e.key)) {
//         // extra characters !!!
//     } else if (valid(e.key)) {

//         elems[elems.length - 1].innerHTML += e.key;

//     }
// })

let input = document.querySelector("textarea");

if (window.matchMedia("(max-width: 700px)").matches) {
    alert("It appears that you are using a device which has an on-screen keyboard \n\n Please tap anywhere on the page to start typing !!");

    document.onclick = () => {
        input.focus();
        elems[elems.length - 1].className = "active";
    }
} else {
    input.focus();
    elems[elems.length - 1].className = "active";
}
let string = input.value;
let extraInput;

input.addEventListener("input", (e) => {

    elems = document.getElementsByTagName("pre");
    if (!e.data) {
        if (input.value.length > string.length) {
            validExtra("Enter");
            input.value = "";
        } else if (input.value.length < string.length) {
            // alert(input.value + ' ' + string.length);
            validExtra("Backspace");
        }
    }
    if (validExtra(e.data)) {
        // extra characters !!!
    } else if (valid(e.data)) {

        elems[elems.length - 1].innerHTML += e.data;
        // string = input.value;
        // string = elems[elems.length - 1].innerHTML.slice(8);
        // alert(elems[elems.length - 1].innerHTML.slice(8))

    }
    string = input.value;

})