const cardHead = {
    "Work" : {
        color : "hsl(15, 100%, 70%)",
        path : "images/icon-work.svg"
    },
    "Play" : {
        color : "hsl(195, 74%, 62%)",
        path: "images/icon-play.svg"
    },
    "Study" : {
        color : "hsl(348, 100%, 68%)",
        path : "images/icon-study.svg"
    },
    "Exercise" : {
        color : "hsl(145, 58%, 55%)",
        path: "images/icon-exercise.svg"
    },
    "Social" : {
        color: "hsl(264, 64%, 52%)",
        path: "images/icon-social.svg"
    },
    "Self Care" : {
        color : "hsl(43, 84%, 65%)",
        path: "images/icon-self-care.svg"
    }
};

(function(){
    window.myApp = {};
    fetch('../data/data.json')
    .then(res => {
        if(!res)
            return console.error("Something went wrong!");
        return res.json();
    })
    .then(data => {
        window.myApp.globalData = data;
        renderCards("weekly");
    })
    .catch(error => console.error(error));
})();


const buttons = document.querySelectorAll('.time-period');
buttons.forEach(category =>{
    category.addEventListener('click', ()=>{
        buttons.forEach(button =>{
            button.classList.remove('active');
        })
        category.classList.add('active');
        let timePeriod = category.dataset.type;
        renderCards(timePeriod);
    })
})

function renderCards(timePeriod){
    const data = window.myApp.globalData;
    const container = document.querySelector('.containers');

    removeChildren(container); //remove all children cards except the first one

    const time = getTimePeriod(timePeriod);

    window.myApp.globalData.forEach( (card)=>{
        template = `
    <div class="divs card" style="background-color:${cardHead[card.title].color}">
        <img class="card-img " src="${cardHead[card.title].path}">
        <div class="details">
          <div class="name-and-ellipsis">
            <p class="name">${card.title}</p>
            <img class="ellipse-img" src="images/icon-ellipsis.svg" alt="ellipsis">
          </div>
          <div class="time-spent">
            <p class="total-hours">${card.timeframes[timePeriod].current}hrs</p>
            <p class="last-week-hours">Last ${time} - ${card.timeframes[timePeriod].previous}hrs</p>
          </div>
        </div>
    </div>
    `;
        const singleCard = document.createElement('div');
        singleCard.innerHTML = template;
        container.appendChild(singleCard);

        requestAnimationFrame( ()=>{
            singleCard.querySelector('.card').classList.add('show');
        })
    }) 
}

function removeChildren(container){
    while(container.children.length > 1){
        container.removeChild(container.lastChild);
    }
}

function getTimePeriod(timePeriod){
    if(timePeriod === "weekly")
        return "Week";
    else if(timePeriod === "monthly")
        return "Month";
    else 
        return "Day";
}

