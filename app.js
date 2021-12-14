// Date : 17th August 2021
// PostMan clone project 
// jsonRadio ||  paramsRadio [id]< requestJsonBox || parametersbox >

//utility function to get the DOM elemnet from the string [ut-x01]
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize no of parameters
let addedParamCount = 0;


// Hide parametes box parametersbox- initially [01]
let parametersbox = document.getElementById('parametersbox');
parametersbox.style.display = 'none';


// if click -> " parametersbox " - hide- " requestJsonBox" [02]
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersbox').style.display = 'block';

})

// if click -> " requestJsonBox " - hide- " parametersbox" [03]
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersbox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';

})

//If user clicks on plus(+)button add more parameters , id=addParam , params [04]
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');

    let string = `
                         <div class="row g-3 my-2">
                                    <!-- <label for="inputEmail4" class="form-label">Email</label> -->
                                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2} </label>


                                    <div class="col-md-4">
                                        <input type=" text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter paramenter key ${addedParamCount + 2}">
                                    </div>

                                    <div class="col-md-4">
                                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter paramenter value ${addedParamCount + 2}">
                                    </div>
                                    <button id="deleteParam" class="btn btn-primary deleteParam" style="width: 50px;">-</button>
                            </div>`;

    let paramElement = getElementFromString(string);
    console.log(paramElement);
    params.appendChild(paramElement)

    //Delete Parameters (*);
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

// Working on submit button //
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJsonText').value = "Please wait we are fetching your data from server....";
    document.getElementById('responsePrism').innerHTML = "Please wait we are fetching your data from server....";


    ///Fetch values(*all) that user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    //Log-values-for debugging
    console.log(" url   ", url);
    console.log(" requestType   ", requestType);
    console.log(" contentType   ", contentType);
    console.log("data", data);



    if(requestType == 'GET'){
        fetch(url,{
            method :'GET'
        })
        .then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

})

// Code written by :{    mondalCodeHub -GitHUb    } 