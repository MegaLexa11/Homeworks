const basketItem = {
    renderItem(item) {
        return `<div class="item">
                <div>Наименование: ${item.name}</div>
                <div>Цена: ${item.price}</div>
                <div>Количество: ${item.amount}</div>
                <div>Общая стоимость: ${item.amount * item.price}</div>
            </div>`
    }
};

const recItem = {
    renderItem(item) {
        return `<div class="item">
                <div>ID: ${item.id}</div>
                <div>Наименование: ${item.name}</div>
                <div>Цена: ${item.price}</div>
            </div>`
    }
};

const basket = {
    basketElems: null,
    products: [product3 = createProduct(1, 'Монитор', 10000),],
    basketButton: null,
    basketItem,

    basketInit() {
        this.basketElems = document.querySelector(".basketElems");
        this.basketButton = document.querySelector(".removeButton");
        this.basketButton.addEventListener("click", this.emptyBasket.bind(this));

        this.setBasketStatus()
    },

    setBasketStatus() {
        if (this.products.length) {
            this.products.forEach(item => {
                this.basketElems.insertAdjacentHTML("beforeend", this.basketItem.renderItem(item))
            });
            this.basketElems.insertAdjacentHTML('beforeend', `В корзине ${this.products.length} товара(ов) стоимостью ${this.countPrice()}`)
        } else {
            this.basketElems.innerHTML = '';
            this.basketElems.insertAdjacentHTML('beforeend', "Корзина пуста")
        }
    },

    countPrice() {
        var fullPrice = 0;
        for (let el of this.products) {
            itemPrice = el.price * el.amount;
            fullPrice += itemPrice
        };
        return fullPrice
    },

    emptyBasket() {
        for (item of this.products) {
            item.amount = 1
        };

        this.products = [];
        this.setBasketStatus();
    },
};

function createProduct(id, name, price) {
    return {
        id: id,
        name: name,
        price: price,
        amount: 1
    };
};

const recommendList = {
    recElems: null,
    recProducts: [
        product2 = createProduct(145, 'Мышь', 1000),
        product4 = createProduct(12, 'Клавиатура', 2000)
    ],
    recItem,
    recButton: null,
    basket,
    itemNumber: null,

    recInit() {
        this.recElems = document.querySelector(".recommendedElems");
        this.itemNumber = document.querySelector(".itemNumber")
        this.recButton = document.querySelector(".recItemButton");
        this.recButton.addEventListener('click', this.addProduct.bind(this))

        this.setCatalogElems()
    },

    setCatalogElems() {
        if (this.recProducts.length) {
            this.recProducts.forEach(item => {
                this.recElems.insertAdjacentHTML("beforeend", this.recItem.renderItem(item))
            })
        }
    },

    addProduct() {
        let addCount = 0;
        let choice = this.findById(this.itemNumber.value);

        for (let bItem of this.basket.products) {
            if (bItem.id == choice.id) {
                bItem.amount += 1
            } else {
                addCount += 1
            }
        };

        if (addCount == this.basket.products.length) {
            this.basket.products.push(choice)
        };

        this.basket.basketElems.innerHTML = '';
        this.basket.setBasketStatus()
    },

    findById(id) {
        for (rItem of this.recProducts) {
            if (rItem.id == id) {
                return rItem
            }
        }
    }
};

basket.basketInit();
recommendList.recInit()