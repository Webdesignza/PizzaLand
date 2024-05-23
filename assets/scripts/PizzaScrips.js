
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

