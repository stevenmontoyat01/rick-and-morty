//------------------------------ tags -----------------------------
const url = "https://rickandmortyapi.com/api";
const contentParent = document.querySelector("main")
const input = document.querySelector("#searchePerson");
//-----------------------------------------------------------------

//------------------------------ events ---------------------------
input.addEventListener('keyup',functionInput);
//-----------------------------------------------------------------

function functionInput (event){
    let letters =event.target.value;
    if(letters.length >= 1){
        contentParent.innerHTML= "";
        return fuctionUrl(letters);
    }else{
        contentParent.innerHTML= "";
    }

}

const fuctionUrl = async (letters)=>{
    try{
        let direction;
        let convert;
        direction =  await fetch(url);
        convert = await direction.json();
        //-------------- URL API ------------------
        const characters = convert.characters;
        //-------------- JSON ---------------------
        direction = await fetch(characters);
        convert = await direction.json();
        direction = await fetch(convert.info.next);
        convert = await direction.json();
        //-----------------------------------------
        let arrayUrl= [convert];
        let expresion = new RegExp(`${letters}.*`, "i");
        for (i=2;i<convert.info.pages;i++){
            direction = await fetch(convert.info.next);
            convert = await direction.json(); 
            arrayUrl.push(convert);
        }
        arrayUrl.map((elements,index)=>{
            let names = elements.results.filter((elements) => expresion.test(elements.name));
            if(index){
                createCards(names)
            }
        })
        //-----------------------------------------
    }catch(e){
        console.log(e)
    }
}

const createCards = (names)=>{

    names.map((elements)=>{
        const contentSon = document.createElement('div');
        contentSon.classList.add('contanerCard');

        const contentparrf = document.createElement('div');
        contentparrf.classList.add('info');

        const title1 = document.createElement('h4');
        title1.textContent= 'name:'

        const title2 = document.createElement('h4');
        title2.textContent= 'specie:'

        const title3 = document.createElement('h4');
        title3.textContent= 'status:'

        const name = document.createElement('p');
        let text1 = document.createTextNode(elements.name);
        name.appendChild(text1);

        const specie = document.createElement('p');
        let text2 = document.createTextNode(elements.species);
        specie.appendChild(text2);

        const status = document.createElement('p');
        let text3 = document.createTextNode(elements.status);
        status.appendChild(text3);

        const img = document.createElement('img');
        img.setAttribute('src',elements.image);
        img.setAttribute('alt',elements.name);

        contentparrf.appendChild(title1);
        contentparrf.appendChild(name)
        contentparrf.appendChild(title2);
        contentparrf.appendChild(specie);
        contentparrf.appendChild(title3);
        contentparrf.appendChild(status);
        contentSon.appendChild(img);
        contentSon.appendChild(contentparrf);
        contentParent.appendChild(contentSon);
    })
}