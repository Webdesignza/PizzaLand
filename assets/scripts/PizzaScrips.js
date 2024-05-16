
let imgBasket = document.getElementById("imgBasket");
let btnOrder = document.getElementById("btnOrder");
let tmrStart = Date.now();
let x = 150;
let y = -500;
let h = 150;

function showOrderForm(name, price)
{   
    document.getElementById("pizzaOrdered").value = name;
    document.getElementById("priceOrdered").value = price;

    document.getElementById("orderForm").style.display = "block";
}

function addToOrder(quantity){
    
    let arPizzaOrder = [];
    let name = "";
    let price = 0;

    if(isNaN(quantity) || quantity == ""){        
        document.getElementById("orderMsg").innerHTML = "Please enter a number.";
        return;
    }

    name = document.getElementById("pizzaOrdered").value;
    price = document.getElementById("priceOrdered").value;
    
    if(sessionStorage.getItem("pizzaOrder") != null){      
        arPizzaOrder = JSON.parse(sessionStorage.getItem("pizzaOrder"));
    }
    
    let clsPizza = new clsBasketItem();

    clsPizza.name = name;
    clsPizza.price = price;
    clsPizza.quantity = quantity;

    arPizzaOrder.push(clsPizza);    
    sessionStorage.setItem("pizzaOrder",JSON.stringify(arPizzaOrder)); 
    
    x = 150;
    y = -500;
    h = 150;

    basketAnimate();

    document.getElementById("orderForm").style.display = "none";

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

    table.innerHTML += "<tr> <td><b>Ordered</b></td>  <td></td> <td><b>Quantity</b></td>     <td></td>     <td><b>Price</b></td> </tr>";     

    // Work out the total price
    arBasket.forEach(elPizza => {
        numTotal += (elPizza.pizzaPrice * elPizza.pizzaQuantity);
        
       table.innerHTML += "<tr> <td>" + elPizza.pizzaName + "</td> <td></td> <td>" + elPizza.pizzaQuantity + "</td> <td></td> <td>" + elPizza.pizzaPrice + "</td> </tr>"

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

function basketAnimate(){

    imgBasket.style.display = "inline-block";
    imgBasket.style.position = "relative";
    imgBasket.style.left = x + "px";
    imgBasket.style.top =  y + "px";
    imgBasket.style.height = h + "px";
    imgBasket.style.width = "auto";

    
        // Timer 
        while(Date.now() - tmrStart  < 75)
        {
            let t = 0;
        }

        // Reset timer
        tmrStart = Date.now();
        
        x += 100;
        y -= 27;
        h -= 12;

        imgBasket.style.left = x + "px";
        imgBasket.style.top =  y + "px";
        imgBasket.style.height = h + "px";
        imgBasket.style.width = "auto";

        if (x < 1300)
        {
            requestAnimationFrame(basketAnimate);
        }
           
    }

class clsBasketItem{
    
    constructor(){

    }

    get name(){ 
        return this.pizzaName;
    }

    set name(prmName){
        this.pizzaName = prmName;
    }

    get price(){
        return this.pizzaPrice;
    }

    set price(prmPrice){
        this.pizzaPrice = prmPrice;
    }

    get quantity(){
        return this.pizzaQuantity;
    }

    set quantity(prmQuantity ){
        this.pizzaQuantity = prmQuantity;
    }

    

}

