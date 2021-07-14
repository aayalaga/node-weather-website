console.log('Client side javscript file has loaded...');



const weatherForm= document.querySelector('form');
const searchInput = document.querySelector('input')
const resultParagraph_1 = document.querySelector('#weatherResult-1');  
const resultParagraph_2 = document.querySelector('#weatherResult-2');  
const resultParagraph_3 = document.querySelector('#weatherResult-3');  
const resultParagraph_4 = document.querySelector('#weatherResult-4');  



//Add the eventListener argument to receive the event
weatherForm.addEventListener('submit',(event)=>{
    //This line of code will prevent the page to be reloaded:>> event.preventDefault();
    event.preventDefault();
    const location = searchInput.value;
    console.log(location);
    resultParagraph_1.textContent = 'Loading...';
    resultParagraph_2.textContent = '';
    resultParagraph_3.textContent = '';
    resultParagraph_4.textContent = '';
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            resultParagraph_1.textContent = data.error;
            return console.log(data.error);
        } else {
            console.log(data)
            resultParagraph_1.textContent = data.forecast.location
            resultParagraph_2.textContent = data.forecast.weatherDescription;
            resultParagraph_3.textContent = data.forecast.temperature;
            resultParagraph_4.textContent = data.forecast.precipitation;
        }
    })
    })

})