
function addToOrder(name,cost){

    let arPizzaOrder = [];
    
    if(sessionStorage.getItem("pizzaOrder") != null){      
        arPizzaOrder = JSON.parse(sessionStorage.getItem("pizzaOrder"));
    }
    
    let arPizza = [name,cost];
    arPizzaOrder.push(arPizza);    
    
    alert("You've ordered a " + name + " and your total billed is at " + cost + "Ft");

    sessionStorage.setItem("pizzaOrder",JSON.stringify(arPizzaOrder)); 
    
    alert(sessionStorage.getItem("pizzaOrder"));
}

function buildBasket()
{
    let arPizzaOrder = [];
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

        let arPizza = arPizzaOrder[i]; 
        intExistIndex = -1;
        
        // Check if the basket already has some stuff
        if(arBasket.length > 0)
        {
            for(let ii = 0; ii < arBasket.length;ii++){
                                
                // Check if the pizza already exists inside the basket
                if(arPizza[0] == arBasket[ii][0] ){                    
                    intExistIndex = ii;                                                         
                }
            }

            // If the entry exists update the existing one,
            if(intExistIndex > -1)
            {
                arBasket[intExistIndex][1]++;
            }
            else
            {
                // If it doesn't exist simply add it
                arBasket.push([arPizza[0],1,arPizza[1]]);                    
            }
        }
        else
        {            
            // Add the first entry of unique pizza to the basket
            arBasket.push([arPizza[0],1,arPizza[1]]);            
        }

    }

    let table = document.getElementById("basket");

    table.innerHTML += "<tr> <td>Ordered</td>  <td></td> <td>Quantity</td>     <td></td>     <td>Price</td> </tr>";     

    // Work out the total price
    arBasket.forEach(elPizza => {
        numTotal += (elPizza[1] * elPizza[2]);
        
       table.innerHTML += "<tr> <td>" + elPizza[0] + "</td> <td></td> <td>" + elPizza[1] + "</td> <td></td> <td>" + elPizza[2] + "</td> </tr>"

    });

    table.innerHTML += "<tr> <td>Total</td> <td></td> <td></td> <td></td><td><tag >" + numTotal +"</tag></td> </tr>";

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

