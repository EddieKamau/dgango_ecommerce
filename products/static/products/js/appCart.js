
var cookieController = (function () {


    return {
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" +  JSON.stringify(cvalue) + ";" + expires + ";path=/";
        },
        getCookie: function (cname) {

            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    //return c.substring(name.length, c.length);
                    return JSON.parse(c.substring(name.length, c.length));

                }
            }
            return "";


            /*
            var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
            result && (result = JSON.parse(result[1]));
            return result;
            */


        },

        deleteCookie: function (cname) {
            document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },

        checkCookie: function (cname) {
            var item=this.getCookie(cname);
            if (item !== "") {
                return item;
            } else {
                return '';
            }
        }


    };

})();




var  cartController = (function () {


    var productObj = function (id, name, price, image, quantity, totalPrice = 0) {
        this.id= id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    };

    productObj.prototype.calcTotalPrice = function (quantity) {
        this.totalPrice = parseFloat(this.price)*parseFloat(quantity);
    };
    productObj.prototype.getTotalPrice = function () {
        return this.totalPrice;
    };



    var cart = {
        products: [],
        totals: 0
    };



    return{
        // AddProduct from Cookies
        addProductFromCookies: function (id, image, name, price, quantity, totalPrice) {
            var newItem;
            newItem = new productObj(id, name,price,image, quantity, totalPrice);
            cart.products.push(newItem);

        },


        addProduct: function (id, name, price, image, quantity = 1) {
            var newItem;


            var id
            if(cart.products.length > 0){
                id = cart.products[cart.products.length - 1].id + 1;
            } else {
                id = 0;
            }


            newItem = new productObj(id, name,price,image, quantity);
            cart.products.push(newItem);

            return cart.products;


        },


        getData: function () {
            return cart;
        },

        calcTotals: function () {
            cart.products.forEach(function (current) {
                current.calcTotalPrice(current.quantity)
            });
        },

        calcTotalCost: function () {
            var sum = 0;
            cart.products.forEach(function (current) {
               sum = sum + parseFloat(current.totalPrice);
            });
            cart.totals = sum;
        },

        updateQuantity: function (type, id) {
            var index, customList;
            customList = cart.products.map(function (current) {
                return parseFloat(current.id);
            });
            index = customList.indexOf(parseFloat(id));

            console.log(customList);
            if(index !== -1){
                if(type === 'add'){
                    cart.products[index].quantity += 1;
                } else if(type === 'sub' && cart.products[index].quantity > 1){
                    cart.products[index].quantity -= 1;
                }
            }

            this.calcTotals();
            this.calcTotalCost();

            return {quantity: cart.products[index].quantity,
                totalPrice: cart.products[index].totalPrice,
                totalCost: cart.totals
            };

        },

        deleteItem: function (itemId) {
            var index, customList;
            customList = cart.products.map(function (current) {
                return parseFloat(current.id);
            });
            index = customList.indexOf(parseFloat(itemId));
            if(index !== -1){
                cart.products.splice(index, 1);
            }

            this.calcTotalCost();

            return cart.totals;

        }

    };

})();


var UIController = (function () {

    var DOMStrings = {
        addToCartBtn: '.addToCartBtn',
        productName: '.product-name',
        productPrice: '.product-price',
        productImage: '.product-img',
        checkoutBtn: '.checkout-btn',
        tableList: '.display-table',
        totalCostContainer: '.totalCost',
        btnAdd: '.btn-add',
        btnSub: '.btn-sub',
        productList: '.productList'
    };


    return{
        getDOMstrings: function () {
            return DOMStrings;
        },

        getProductDetails: function () {
            return{
                image: document.querySelector(DOMStrings.productImage).src,
                name: document.querySelector(DOMStrings.productName).textContent,
                price: document.querySelector(DOMStrings.productPrice).textContent
            };

        },

        populateCartList: function (item) {
            var htmlList, newHtmlList, costHtml, listContainer, costContainer;
            listContainer = DOMStrings.tableList;
            costContainer = DOMStrings.totalCostContainer;
            htmlList =' <div class="row list" id="cartProduct-%id%"><div class="col-3">%Name%</div><div class="col-3">' +
                '<button class="btn-sub" >-</button><label class="quantityLabel">%quantity%</label>' +
                '<button class="btn-add">+</button></div>' +
                '<div class="col-2">%price%</div><div class="col-2"><label class="totalPriceLabel">%totalPrice%</label></div><div class="col-2">' +
                '<button class="btn-remove">-</button></div></div>';
            costHtml= '<div class="row"><label>%totalCost%</label></div>';
            costHtml = costHtml.replace('%totalCost%', item.totals);
            var i;
            for(i=0; i < item.products.length; i++){
                newHtmlList = htmlList.replace('%Name%', item.products[i].name);
                newHtmlList = newHtmlList.replace('%quantity%', item.products[i].quantity);
                newHtmlList = newHtmlList.replace('%price%', item.products[i].price);
                newHtmlList = newHtmlList.replace('%totalPrice%', item.products[i].totalPrice);
                newHtmlList = newHtmlList.replace('%id%', item.products[i].id);

                document.querySelector(listContainer).insertAdjacentHTML('beforeend', newHtmlList);
            }

            document.querySelector(costContainer).insertAdjacentHTML('afterbegin', costHtml);

        },

        updateUI: function (itemId, obj) {
            var element = document.getElementById('cartProduct-'+itemId);
            var costelement = document.querySelector(DOMStrings.totalCostContainer);
            // Update quantity
            element.childNodes.item(1).childNodes.item(1).textContent = obj.quantity;
            // Update price
            element.childNodes.item(3).childNodes[0].textContent = obj.totalPrice;
            // Update Total Cost
            costelement.childNodes.item(0).childNodes.item(0).textContent = obj.totalCost;
        },

        deleteItemUI: function (itemId) {
            var element = document.getElementById('cartProduct-'+itemId);
            element.parentNode.removeChild(element);
        },

        updateTotalCost: function (totalCost) {
            var costelement = document.querySelector(DOMStrings.totalCostContainer);
            costelement.childNodes.item(0).childNodes.item(0).textContent = totalCost;

        }

    };

})();

var cartApp = (function (cartCtrl, UICtrl, cookieCtrl) {
    var cookieName = 'myCart';

    //Setup event Listeners
    var setUpEventListeners = function () {
        DOMstrings = UICtrl.getDOMstrings();
        document.querySelector(DOMstrings.tableList).addEventListener('click', itemController);
        //document.querySelector(DOMstrings.checkoutBtn).addEventListener('click', cookieCtrl.deleteCookie(cookieName));
    };


    // Create some fake products
    /**
    cartCtrl.addProduct('Name Name 1', 300, 'http://localhost:63342/onlineShop/src/assets/img1.jpg',3);
    cartCtrl.addProduct('Name Name', 100, 'http://localhost:63342/onlineShop/src/assets/img1.jpg', 3);
    cartCtrl.addProduct('Name Name', 100, 'http://localhost:63342/onlineShop/src/assets/img1.jpg');
    cartCtrl.addProduct('Name Name', 100, 'http://localhost:63342/onlineShop/src/assets/img1.jpg', 2);
     **/

    // Update Cookies
    var updateCookie = function () {
        cookieCtrl.setCookie(cookieName, cartCtrl.getData().products, 60)
    };


    var displayCart = function () {
        // Check Cookies
        var cartCookies = cookieCtrl.checkCookie(cookieName);
        for(var i = 0; i < cartCookies.length; i++){
            //id, image, name, price, quantity, totalPrice
            cartCtrl.addProductFromCookies(cartCookies[i].id, cartCookies[i].image, cartCookies[i].name, cartCookies[i].price, cartCookies[i].quantity, cartCookies[i].totalPrice);
        }


        // console.log(cartCtrl.getData());

        // Call Total product price
        cartCtrl.calcTotals();


        // Call total cost
        cartCtrl.calcTotalCost();


        // Update UI
        UICtrl.populateCartList(cartCtrl.getData());


        setUpEventListeners();

    };


    var itemController = function (event) {
        var itemClass = event.target.className;
        var itemId = event.target.parentNode.parentNode.id;
        itemId = itemId.split('-');
        itemId = itemId[1];
        if(itemClass === 'btn-add'){
            addQuantity(itemId);
        } else if(itemClass === 'btn-sub'){
            subQuantity(itemId);
        } else if(itemClass === 'btn-remove'){
            removeItem(itemId);
        }

    };

    var addQuantity = function (itemId) {
        // Update quantity && Get Quantity && totalPrice && totalCost
        var obj = cartCtrl.updateQuantity('add', itemId);

        // Update Cookies
        updateCookie();

        // Update UI
        UICtrl.updateUI(itemId, obj);


    };

    var subQuantity = function (itemId) {
        // Update quantity && Get Quantity && totalPrice && totalCost
        var obj = cartCtrl.updateQuantity('sub', itemId);

        // Update Cookies
        updateCookie();

        // Update UI
        UICtrl.updateUI(itemId, obj);


    };



    var removeItem = function (itemId) {
        // Remove item from Cart && Update totalCost
        var totalCost = cartCtrl.deleteItem(itemId);

        // Update Cookies
        updateCookie();

        // Update UI

        UICtrl.deleteItemUI(itemId);
        UICtrl.updateTotalCost(totalCost);


    };




    return{

        addToCart: function (event) {

            /**
            // Add to cart obj
            var cart = cartCtrl.addProduct(name, price, image);

            // Set Cart Cookie
            // Check if it Exists
            var oldCookie = cookieCtrl.checkCookie(cookieName);
            if(oldCookie !==''){
                oldCookie.push(cart[cart.length - 1]);
                cookieCtrl.setCookie(cookieName, oldCookie, 60);
            } else {
                cookieCtrl.setCookie(cookieName, cart, 60);
            }

             **/

            var id = event.target.parentNode.id;
            var name = event.target.parentNode.parentNode.parentNode.parentNode.childNodes.item(3).childNodes.item(1).childNodes.item(1).childNodes.item(0).textContent;
            var image = event.target.parentNode.parentNode.parentNode.parentNode.childNodes.item(1).childNodes.item(1).childNodes.item(1).src;
            var price = event.target.parentNode.parentNode.parentNode.parentNode.childNodes.item(3).childNodes.item(1).childNodes.item(3).childNodes.item(0).textContent;

            var splitPrice = price.split('.');
            price = splitPrice[1];
            price = parseFloat(price);


            // Add to cart obj
            var cart = cartCtrl.addProduct(id, name, price, image);

            // Set Cart Cookie
            // Check if it Exists
            var oldCookie =cookieCtrl.checkCookie(cookieName);
            var newCookie = [];
            for(var i=0; i< oldCookie.length; i++){
                newCookie.push(oldCookie[i]);
            }
            if(oldCookie !==''){
                newCookie.push(cart[cart.length - 1]);
                cookieCtrl.setCookie(cookieName, newCookie, 60);
            } else {
                cookieCtrl.setCookie(cookieName, cart, 60);
            }


        },

        getCartDisplay: function () {
            return displayCart();
        },

        getAddQuantity: function () {
            return addQuantity();
        },

        getSubQuantity: function () {
            return subQuantity();
        },

        init: function () {
            //setUpEventListeners();
        }


    };

})(cartController, UIController, cookieController);

cartApp.init();