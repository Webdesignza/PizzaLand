function buildOrderSummary(){
    let arPizzaOrder = [new clsBasketItem()];
    let arBasket = [];
    let intExistIndex = -1;
    let numTotal = 0;
       
    // Check that the session is empty. if not retrieve basket from session
    if(sessionStorage.getItem("pizzaOrder") != null){              
        arPizzaOrder = JSON.parse(sessionStorage.getItem("pizzaOrder"));  
        
    }   
    else{
        // If basket is empty, let the user know
        displayUserMessage(document.getElementById("userMsg")
                           ,"Your Basket is currently empty",
                           true);
        return;
    }
   

    // loop through the name array to add to the basket
    for(let i = 0; i < arPizzaOrder.length;i++ ){
        
        let arPizza;
        arPizza =  arPizzaOrder[i]; 
        intExistIndex = -1;
        
        // Check if the basket already has some stuff
        if(arBasket.length > 0)
        {
            for(let ii = 0; ii < arBasket.length;ii++){
                                
                // Check if the pizza already exists inside the basket
                if(arPizza.pizzaName == arBasket[ii].pizzaName) {                    
                    intExistIndex = ii;    

                }
            }

            // If the entry exists update the existing one,
            if(intExistIndex > -1)
            {
                arBasket[intExistIndex].pizzaQuantity++;                
            }
            else
            {
                // If it doesn't exist simply add it
                arBasket.push(arPizza);                                    
            }
        }
        else
        {            
            // Add the first entry of unique pizza to the basket
            arBasket.push(arPizza);            
        }

        arBasket[i].pizzaTotal = arBasket[i].pizzaQuantity * arBasket[i].pizzaPrice;

    }

    let table = document.getElementById("basket");
    
    table.innerHTML = "<tr> <td><b>Ordered</b></td>  <td></td> <td><b>Quantity</b></td>     <td></td>     <td><b>Price</b></td> <td><b>Total</b></td> <td></td> </tr>";     

    // Work out the total price
    arBasket.forEach(elPizza => {
        numTotal += (elPizza.pizzaPrice * elPizza.pizzaQuantity);
        
       table.innerHTML += "<tr> <td>" + elPizza.pizzaName + "</td> <td></td> <td>" + elPizza.pizzaQuantity + "</td> <td></td> <td>" + elPizza.pizzaPrice + "</td>  <td>" + elPizza.pizzaTotal + "</td> <td></td></tr>";

    });

    table.innerHTML += "<tr> <td><b>Total</b></td> <td></td> <td></td> <td></td><td></td><td><tag ><b>" + numTotal +"</tag></b></td> <td></td> </tr>";

    if(arPizzaOrder.length < 1)
    {
        // If basket is empty, let the user know
        displayUserMessage(document.getElementById("userMsg")
        ,"Your Basket is currently empty",
        true);
    
    }
    
}

function validateForm(){
    
    if(document.getElementById('name').value == ''){
        displayUserMessage(document.getElementById("userMsg")
        ,"Name is Required",
        true);
        return false;
    }

    if(document.getElementById('email').value == '' ||
       document.getElementById('email').value.indexOf("@") < 0 ||
       document.getElementById('email').value.indexOf(".") < 0
      ){
        displayUserMessage(document.getElementById("userMsg")
        ,"Enter a valid Email",
        true);
        return false;
    }

    if(document.getElementById('phone').value == ''){
        displayUserMessage(document.getElementById("userMsg")
        ,"Phone Number is Required",
        true);
        return false;
    }

    if(document.getElementById('address').value == ''){displayUserMessage(document.getElementById("userMsg")
        ,"Address  is Required",
        true);
        return false;
    }

    return true;
    
}

function displayUserMessage(element,message,isCrital){
    element.innerHTML = message;
    if(isCrital){
        element.className = "userMsgCritical";
    }
    else{
        element.className = "userMsgSuccess";
    }
    
}