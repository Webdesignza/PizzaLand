
function getBasketFromSession(){
    let arPizzaOrder = [new clsBasketItem()];    

    // Check that the session is empty. if not retrieve basket from session
    if(sessionStorage.getItem("pizzaOrder") != null){              
        arPizzaOrder = JSON.parse(sessionStorage.getItem("pizzaOrder"));          
    }   

    return arPizzaOrder;
}

function buildBasket()
{
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

    }

    let table = document.getElementById("basket");
    
    table.innerHTML = "<tr> <td><b>Ordered</b></td>  <td></td> <td><b>Quantity</b></td>     <td></td>     <td><b>Price</b></td> <td></td> </tr>";     

    // Work out the total price
    arBasket.forEach(elPizza => {
        numTotal += (elPizza.pizzaPrice * elPizza.pizzaQuantity);
        
       table.innerHTML += "<tr> <td>" + elPizza.pizzaName + "</td> <td></td> <td><input type='textbox' value='" + elPizza.pizzaQuantity + "' class='qtyBasketItem' id='" + elPizza.pizzaName + "'></td> <td></td> <td>" + elPizza.pizzaPrice + "</td> <td><input type='button' value='delete' onclick='removeBasketItem(\"" + elPizza.pizzaName + "\");'></td></tr>";

    });

    table.innerHTML += "<tr> <td><b>Total</b></td> <td></td> <td></td> <td></td><td><tag ><b>" + numTotal +"</tag></b></td> <td></td> </tr>";

    if(arPizzaOrder.length < 1)
    {
        // If basket is empty, let the user know
        displayUserMessage(document.getElementById("userMsg")
        ,"Your Basket is currently empty",
        true);
    
    }
    
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

function clearBasket(){
    sessionStorage.clear();
    window.location.href = "index.html";
}

function removeBasketItem(name){

    let arPizzaOrder = getBasketFromSession();
    let intIndexToRemove = -1;
   
    // Loop through all pizza's in the basket and remove the correct one
    for(let counter = 0; counter < arPizzaOrder.length;counter++){
        if(arPizzaOrder[counter].pizzaName == name)
        {
            intIndexToRemove = counter;
            break;
        }
    }

    // Remove the item from the basket array
    arPizzaOrder.splice(intIndexToRemove,1);
    sessionStorage.setItem("pizzaOrder",JSON.stringify(arPizzaOrder)); 

    buildBasket();

}

function updateBasket(){
    let qtyItems = document.getElementsByClassName("qtyBasketItem");
    let arPizzaOrder = getBasketFromSession();  
    
    for(let itmCount = 0; itmCount < qtyItems.length; itmCount++)
    {        
        for(let counter=0;counter < arPizzaOrder.length;counter++){
            
            if(qtyItems[itmCount].id == arPizzaOrder[counter].pizzaName){
                arPizzaOrder[counter].pizzaQuantity = qtyItems[itmCount].value;
            }
        }

    }

    // Update the session variable
    sessionStorage.setItem("pizzaOrder",JSON.stringify(arPizzaOrder)); 

    // Update the table again
    buildBasket();

}