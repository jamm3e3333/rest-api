const targetIP = '192.168.1.227:8008';
const taskName = 'subscriber_task';
/////////////////////////////////////////////////////////////////////////////////
//promenne
/////////////////////////////////////////////////////////////////////////////////
//nazev bloku, hodnota promenne, output pro status
const $inputValue_w = document.querySelector('#input-value-post-1');
const $inputName_w = document.querySelector('#input-name-post-1');
const $buttonValue_w = document.querySelector('#btn-value-post-1');
const resultW = document.querySelector('#result-w-1');
resultW.innerHTML = '';

/////////////////////////////////////////////////////////////////////////////////
//promenne pro mqtt
const $buttonMqtt_st = document.querySelector('#btn-mqtt');
const paraMqtt_st = document.querySelector('#status-mqtt');
$buttonMqtt_st.setAttribute('class','green');

//promenne pro pro on/off mqtt bloky
const $buttonMqtt_switch = document.querySelector('#toggle-mqtt');
const paraMqtt_switch = document.querySelector('#para-mqtt-switch');
$buttonMqtt_switch.setAttribute('class','blue');
let mqtt_status = 0;

////////////////////////////////////////////////////////////////////////
//EVENTS
////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
//tlacitko na zjisteni mqtt status
$buttonMqtt_st.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.setAttribute('disabled','disabled');
    paraMqtt_st.setAttribute('style','color:black');
    paraMqtt_st.innerText = 'Loading...';
    getData('Display4')
        .then((data) => {
            e.target.removeAttribute('disabled');
            e.target.setAttribute('class','green');
            paraMqtt_st.setAttribute('style','color:black');
            let stat = JSON.parse(data).v;
            if(stat){
                paraMqtt_st.setAttribute('style','color:dodgerblue');
                return paraMqtt_st.innerText = 'ON';

            }
            paraMqtt_st.setAttribute('style','color:red');
            paraMqtt_st.innerText = 'OFF';
        })
        .catch((err) => {
            e.target.removeAttribute('disabled');
            e.target.setAttribute('class','green');
            paraMqtt_st.setAttribute('style','color:red');
            paraMqtt_st.innerText = 'Zkontrolujte připojení HIL simulátoru';
            console.log(err);
        })


})

/////////////////////////////////////////////////////////////////////////////////
//tlacitko na zjisteni mqtt status
$buttonMqtt_switch.addEventListener('click',(e) => {
    e.preventDefault();
    e.target.setAttribute('disabled','disabled');

    paraMqtt_switch.setAttribute('style','color:black');
    paraMqtt_switch.innerText = 'Loading...';

    if(mqtt_status){
        mqtt_status = 0;
    }
    else{
        mqtt_status = 1;
    }
    console.log(mqtt_status);
    postData('CNB1', 'YCN', mqtt_status)
        .then((data) => {
            e.target.removeAttribute('disabled');
            e.target.setAttribute('class','blue');
            let mqtt_bool = data.value == 1 ? 'ON' : 'OFF';
            console.log(data.value);
            paraMqtt_switch.setAttribute('style','color:dodgerblue');
            paraMqtt_switch.innerHTML = `
                Status: ${JSON.parse(data.data).error.message}, switch ${mqtt_bool}
            `
        })
        .catch((err) => {
            console.log(err);
            e.target.removeAttribute('disabled');
            e.target.setAttribute('class','blue');
            paraMqtt_switch.setAttribute('style','color:red');
            paraMqtt_switch.innerHTML = `
                Status: 400. \n 
                Zkontrolujte zapojení HIL simulátoru.
            `  
        })
    
})

/////////////////////////////////////////////////////////////////////////////////
//input na naslouchani udalost 'input'

$inputValue_w.addEventListener('input',(e) => {
    if(isNaN(parseFloat(e.target.value)) === true && (e.target.value !== '' && e.target.value !== '-')){
        e.target.value = '';
        alert('Je povoleno pouze číslo.');
        e.target.focus();
    }

    if(!e.target.value || $inputName_w.value === ''){
        $buttonValue_w.setAttribute('disabled','disabled');
        $buttonValue_w.setAttribute('class','red');
    }
    else{
        $buttonValue_w.removeAttribute('disabled');
        $buttonValue_w.setAttribute('class','green');
    }
})

////////////////////////////////////////////////////////////////////////
//zadani nazvu bloku, udalost na 'input', jestlize nazev, 
// nebo hodnota promenne jsou prazdne
//tak nejde tlacitko na poslani dat
$inputName_w.addEventListener('input',(e) => {
    if(!e.target.value || $inputValue_w.value === ''){
        $buttonValue_w.setAttribute('disabled','disabled');
        $buttonValue_w.setAttribute('class','red');
    }
    else{
        $buttonValue_w.removeAttribute('disabled');
        $buttonValue_w.setAttribute('class','green');
    }
})


////////////////////////////////////////////////////////////////////////
//udalost na 'click' tlacitko na poslani hodnot metodou POST
$buttonValue_w.addEventListener('click',(e) => {
    e.preventDefault();

    //hodnoty 'input' nazev bloku a hodnota promenne
    const value = parseFloat($inputValue_w.value);
    const name_block = $inputName_w.value.toString().trim();

    //nazev bloku nesmi byt 'CNB1' - spinac MQTT
    if(name_block === 'CNB1'){
        $inputValue_w.value = '';
        $inputName_w.value = '';
        $inputName_w.focus();
        e.target.setAttribute('disabled','disabled');
        e.target.setAttribute('class','red');

        return alert('Tento blok nelze modifikovat.')
    }
    resultW.setAttribute('style','color:black');
    resultW.innerHTML = 'Loading...';
    $inputValue_w.value = '';
    $inputValue_w.setAttribute('disabled','disabled');
    e.target.setAttribute('disabled','disabled');
    e.target.setAttribute('class','red');
    
    //posilani requestu pomoci fetch (metoda POST)
    postData(name_block,'ycn',value)
        .then((data) => {
            console.log(data);
            $inputValue_w.removeAttribute('disabled');
            $inputValue_w.focus();

            resultW.setAttribute('style','color:dodgerblue');
            resultW.innerHTML = `
                Status: ${JSON.parse(data.data).error.message}, hodnota byla změněna na ${data.value}
            `
        })
        .catch((err) => {
            console.log(err);
            $inputValue_w.removeAttribute('disabled');
            $inputValue_w.focus();

            resultW.setAttribute('style','color:red');
            resultW.innerHTML = `
                Status: 400. \n 
                Zkontrolujte, název bloku, nebo zapojení HIL simulátoru.
            `
        })
})

//metoda GET pomoci fetch
const getData = async (blockName) => {
    const response = await fetch(`/get_methods?block_name=${blockName}:u`)
    if(response.status !== 200){
        throw new Error(`Data not fetched, response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

//metoda POST pomoci fetch
const postData = async(blockName, output, value) => {
    const response = await fetch(`/post_methods?block_name=${blockName}:${output}&val=${value}`)
    if(response.status !== 200){
        throw new Error(`Data not fetched, response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}