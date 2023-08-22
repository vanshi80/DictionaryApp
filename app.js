let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let dict = document.querySelector(".welcome-page");
let meaning = document.querySelector(".meaning");
let sound = document.getElementById("sound");
let inp = document.querySelector("input");
let btn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        dict.style.display = "none";
    }, 1500);
});

btn.addEventListener("click", async () => {
    try {
        const res = await axios.get(url + inp.value);
        meaning.innerText = "";

        let urword = document.createElement("h1");
        urword.innerText = inp.value;
        urword.style.marginTop = 0;
        urword.style.marginBottom = "1rem";
        meaning.appendChild(urword);

        let speaker = document.createElement("div");
        speaker.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        speaker.addEventListener("click", async() => {
            try {
                sound.setAttribute("src", `${res.data[0].phonetics[0].audio}`);
                await sound.play();
            }
            catch (err) {
                console.log(err);
                sound.setAttribute("src", `${res.data[0].phonetics[1].audio}`);
                await sound.play();
            }
        });
        urword.appendChild(speaker);

        let speak = document.createElement("h5");
        speak.innerHTML = res.data[0].phonetic;
        meaning.appendChild(speak);

        let underline = document.createElement("div");
        underline.classList.add("underline");
        meaning.appendChild(underline);

        try {
            for (let i = 0; i < 3; i++) {
                let word = document.createElement("h3");
                word.innerHTML = res.data[0].meanings[i].partOfSpeech + "<i> (partofSpeech):</i>";
                meaning.appendChild(word);
                let meanings = document.createElement("p");
                meanings.innerText = res.data[0].meanings[i].definitions[0].definition;
                meaning.appendChild(meanings);
            }
        }
        catch (err) {
            console.log("Err", err);
        }

    }
    catch (err) {
        console.log("Error found", err);
        meaning.innerText="";
        let errorp = document.createElement("p");
        errorp.style.color="black";
        errorp.innerText = "No results found :(";
        errorp.classList.add("pstyle");
        meaning.appendChild(errorp);
    }
});
