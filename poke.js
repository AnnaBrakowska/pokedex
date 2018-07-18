// INSTRUCTIONS ALERT

let alert1 = document.getElementById("container");
let dismiss = document.getElementById("dismiss");

dismiss.addEventListener("click", (e) => {
    alert1.style.visibility = "hidden";
});

// POKEMON CLASS
class Pokemon {
    constructor(name, hp, attack, image, defense, abilities) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.image = image;
        this.defense = defense;
        this.abilities = abilities;
    }
}

// temporary pokemon array shows the history of looked up pokemons

//SEARCH BAR
let temporaryPokemon=[]; 
searchButton.addEventListener("click", (e) => {

    let searchPokemon = document.getElementById("searchPokemon").value;
    let searchButton = document.getElementById("searchButton");
    let imageFound = document.getElementById("imageFound");


    axios.get("https://pokeapi-nycda.firebaseio.com/pokemon/" + searchPokemon +".json").then((response) => {
        // console.log(response.data.sprites['front_shiny']);
        imageFound.src = response.data.sprites['front_shiny'];

        let image = response.data.sprites['front_shiny'];
        let attack = response.data.stats[4]['base_stat'];
        let hp = response.data.stats[5]['base_stat'];
        let name = response.data.forms[0]['name'];
        let abilities = response.data.abilities[0]['ability']['name'];
        let defense = response.data.stats[3]['base_stat'];
        let newPokemon = new Pokemon(name, hp, attack, image, defense, abilities);
        temporaryPokemon.push(newPokemon);

    });
});


//ADD BAR 

let addButton = document.getElementById("addButton");

addButton.addEventListener("click", (e) => {
    anna.add(temporaryPokemon[temporaryPokemon.length-1]);
});



//TRAINER CLASS

class Trainer {
    constructor(trainerName) {
        this.myBall = []; //store all instances of pokemon here
        console.log(this.myBall);
        this.trainerName=trainerName;
    }

    all() {
        return this.myBall;
    }

    get(someName) {

        for (let i = 0; i < this.myBall.length; i++) {
            if (this.myBall[i]['name'] === someName) {
                return this.myBall[i];
            }
        }
    }

    add(pokemonObject) {
        this.myBall.push(pokemonObject);
        console.log(pokemonObject)
    }
}


let anna = new Trainer("Anna");


//DOM ELEMENTS

let sound = document.getElementById("audio");
let nextPokemon = document.getElementById("nextPokemon");
let start = document.getElementById("start");
let counterPower = 1;
let name = document.getElementById('name');
let hp = document.getElementById('hp');
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let abilities = document.getElementById("abilities");
let info = document.getElementsByClassName("info1");




// this button will turn on and off the screen

start.addEventListener("click", (e) => {
     if(anna.myBall.length===0){
         
        console.log("Add some pokemons to your pokedex");
         alert('Add some pokemons to your pokedex');
     }
    // //OFF
        else if (counterPower % 2 === 0) {

        //TURN OFF ANIMATIONS FOR ALL LIGHTS
        document.getElementById("light").style = "animation";
        document.getElementById("red").style = "animation";
        document.getElementById("yellow").style = "animation";
        document.getElementById("green").style = "animation";
        //how to turn off the display of any counter???

        for (let i = 0; i < info.length; i++) {
            info[i].style.display = "none";
        }

        gallery[0].style.display = "none";
        sound.play();
        counterPower++;
        console.log("off");
    } else if (counterPower % 2 !== 0) {


        // //ON

        document.getElementById("light").style = "animation:light 1s infinite ease-in 0.1s;";
        document.getElementById("red").style = "animation:redLight 1s infinite ease-in 0.14s;";
        document.getElementById("yellow").style = "animation:yellowLight 1s infinite ease-in 0.16s;";
        document.getElementById("green").style = "animation:greenLight 1s infinite ease-in 0.18s;";
        sound.play();
        gallery[0].style.display = "block";

        for (let i = 0; i < info.length; i++) {
            info[i].style.display = "block";
        }
        trainerName.innerText="Trainer's name: " +anna.trainerName;
        one.innerText = "Name: " + anna.myBall[0].name;
        two.innerText = "Hp: " + anna.myBall[0].hp;
        three.innerText = "Attack: " + anna.myBall[0].attack;
        four.innerText = "Defense: " + anna.myBall[0].defense;
        five.innerText = "Ability: " + anna.myBall[0].abilities;

        document.getElementsByClassName("gallery")[0].setAttribute('src', anna.myBall[0].image);
        counterPower++;
    } 

    console.log("On/Off" + anna.myBall);

});


// DOM FOR DISPLAY NEXT AND PREVIOUS

let previous = document.getElementById("previous");
let next = document.getElementById("next");
let gallery = document.getElementsByClassName("gallery");
let one = document.getElementById("name");
let two = document.getElementById("hp");
let three = document.getElementById("attack");
let four = document.getElementById("defense");
let five = document.getElementById("abilities");
let trainerName=document.getElementById("trainerName");
let counterInfo = 0;


next.addEventListener("click", (e) => {
    counterInfo += 1;

    if (counterInfo === anna.myBall.length) {
        counterInfo = 0;
    }

    console.log(counterInfo + "BEFORE NEXT");
    gallery[0].setAttribute('src', anna.myBall[counterInfo].image);
    one.innerText = "Name: " + anna.myBall[counterInfo].name;
    two.innerText = "Hp: " + anna.myBall[counterInfo].hp;
    three.innerText = "Attack: " + anna.myBall[counterInfo].attack;
    four.innerText = "Defense: " + anna.myBall[counterInfo].defense;
    five.innerText = "Ability: " + anna.myBall[counterInfo].abilities;
    nextPokemon.play();
    console.log(counterInfo + "AFTER NEXT");


});


previous.addEventListener("click", (e) => {

    if (counterInfo === 0) {
        counterInfo = anna.myBall;
    }

    console.log(counterInfo + "BEFORE DECREASE");// return 2
    counterInfo -= 1; // decrease the count
    console.log(counterInfo + "AFTER DECREASE"); // return 1

    gallery[0].setAttribute('src', anna.myBall[counterInfo].image);
    console.log(counterInfo + "AFTER IMAGE"); // return 1

    one.innerText = "Name: " + anna.myBall[counterInfo].name;
    two.innerText = "Hp: " + anna.myBall[counterInfo].hp;
    three.innerText = "Attack: " + anna.myBall[counterInfo].attack;
    four.innerText = "Defense: " + anna.myBall[counterInfo].defense;
    five.innerText = "Ability: " + anna.myBall[counterInfo].abilities;
    nextPokemon.play();

});


// DISPLAY 'EM ALL!

let counterDis = 0;
let list = document.getElementsByClassName("col-md-4");
let button = document.getElementById("button");
let container = document.getElementById("container");


button.addEventListener("click", (e) => {

    if (counterDis === 0) {
        let title = document.createElement("h3");
        title.innerText = "My Pokemons: ";
        list[0].appendChild(title);
        console.log(counterDis);
        
    
        for (let i = 0; i < anna.myBall.length; i++) {
            let infoDiv = document.createElement("div");
            infoDiv.innerHTML = "<div>" + '<img src="' + anna.myBall[i].image + '"></img>' + "<span>" + "<strong>" + "Name: " + "</strong>" + anna.myBall[i].name + "</span>" + "<span>" + "<strong>" + " HP: " + "</strong>" + anna.myBall[i].hp + "</span>" + "<span>" + "<strong>" + " Attack: " + "</strong>" + anna.myBall[i].attack + "</span>" + "<span><strong> Ability: </strong><" + anna.myBall[i].abilities + "/span>" + "<span><strong> Defense: " + anna.myBall[i].defense + "</strong></span>" + "</div>";
            list[0].appendChild(infoDiv);
        } 
        
    }   else if(counterDis>0) {
            list[0].innerHTML="";
            let title = document.createElement("h3");
            list[0].appendChild(title);
            title.innerText = "My Pokemons: ";

            for (let i = 0; i < anna.myBall.length; i++) {
            let infoDiv = document.createElement("div");
            infoDiv.innerHTML = "<div>" + '<img src="' + anna.myBall[i].image + '"></img>' + "<span>" + "<strong>" + "Name: " + "</strong>" + anna.myBall[i].name + "</span>" + "<span>" + "<strong>" + " HP: " + "</strong>" + anna.myBall[i].hp + "</span>" + "<span>" + "<strong>" + " Attack: " + "</strong>" + anna.myBall[i].attack + "</span>" + "<span><strong> Ability: </strong><" + anna.myBall[i].abilities + "/span>" + "<span><strong> Defense: " + anna.myBall[i].defense + "</strong></span>" + "</div>";
            list[0].appendChild(infoDiv);
        }
    } counterDis++;
    console.log(counterDis);
});

// POKEDEX SEARCH


let searchButtonPokedex = document.getElementById("searchButtonPokedex");

searchButtonPokedex.addEventListener("click", (e)=> {
    let searchPokedex = document.getElementById("searchPokedex").value;
    let pokemonFound=document.getElementById("pokemonFound");
    let pokemonReturned = anna.get(searchPokedex);

    pokemonFound.src=pokemonReturned['image'];
    searchPokedex.reset();

    console.log(pokemonReturned['image']);
    // pokemonFound.src=anna.get(searchPokedex).image;
    // console.log(pokemonReturned.image);


});