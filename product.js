class Good {
    constructor(id, name, description, size, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.size = size
        this.price = price
        this.available = available
    }

    setAvailable() {
        if (this.available === false) {
            this.available = true;
        } if (this.available === true) {
            this.available = false;
        }
    }
}

class GoodsList {
    #goods
    constructor(sortPrice, sortDir, filter) {
        this.#goods = []
        this.sortPrice = sortPrice
        this.sortDir = sortDir
        this.filter = filter
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        for (let index = 0; index < this.#goods.length; index++) {
            if (this.#goods[index].id === id) {
                this.#goods.splice(index, 1);
            } else {
                console.log('ID с номером ' + id + ' нет в каталоге');
            }
        }
    }

    get list() {
        if (this.filter !== undefined ) {
            const filtredItems = this.#goods.filter(good => this.filter.test(good.name));
            if (this.sortPrice === true && this.sortDir === true) {
                return filtredItems.sort((x, y) => x.price - y.price);
            } if (this.sortPrice === true && this.sortDir === undefined) {
                return filtredItems.sort((x, y) => y.price - x.price);
            } else {
                return filtredItems;
            }
        } if (this.filter === undefined) {
            if (this.sortPrice === true && this.sortDir === true) {
                return this.#goods.sort((x, y) => x.price - y.price);
            } if (this.sortPrice === true && this.sortDir === undefined) {
                return this.#goods.sort((x, y) => y.price - x.price);
                
            } else {
                return this.#goods;
            }
        }
    }
}

class BasketGood extends Good {
    constructor(id, name, description, size, price, available, amount) {
        super(id, name, description, size, price, available)
        this.amount = amount
    }
}

class Basket {
    constructor() {
        this.goods = []
    }

    get totalAmount() {
        let totalPrice = 0
        for (let index = 0; index < this.goods.length; index++) {
            const element = this.goods[index];
            let totalPriceElem = element.price * element.amount;
            totalPrice += totalPriceElem;
        }
        return totalPrice;
    }

    get totalSum() {
        let sum = 0;
        for (let index = 0; index < this.goods.length; index++) {
            const element = this.goods[index];
            sum += element.amount;
        }
        return sum;
    }

    add(good, amount) {
        let index = this.goods.findIndex(element => element.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        }
    }

    clear() {
        this.goods.length = 0;
    }

    remove(id) {
        let index = this.goods.findIndex(elemet => elemet.id === id)
        if (this.goods[index].amount >= 2) {
            this.goods[index].amount--;
        } else {
            this.goods.splice(index, 1);
        }
    }

    removeUnavailable() {
        for (let index = 0; index < this.goods.length; index++) {
            const element = this.goods[index];
            if (element.available === false) {
                this.goods.splice(index, 1);
            }
        }
    }
}

const itemOne = new Good(1, 'blanket','white',['S', 'L', 'XXL'], 10000, false);
const itemTwo = new Good(2, 'pillow','white',['S', 'L', 'XXL'], 7000, true);
const itemThere = new Good(3, 'mattress','white',['S', 'L', 'XXL'], 180000, true);
const itemFour = new Good(4, 'bedside table','white',['S', 'L', 'XXL'], 30000, true);
const itemFive = new Good(5, 'bed','grey',['S', 'L', 'XXL'], 60000, true);

itemTwo.setAvailable()

const catalog = new GoodsList(true, true);
catalog.add(itemOne);
catalog.add(itemTwo);
catalog.add(itemThere);
catalog.add(itemFour);
catalog.add(itemFive);
 
console.log(catalog.list);

const basket = new Basket()
basket.add(itemOne, 1);
basket.add(itemOne, 1);
basket.add(itemTwo, 1);
basket.add(itemTwo, 1);
basket.add(itemThere, 2);

basket.remove(1);
basket.removeUnavailable();

console.log(basket.goods);
console.log(basket.totalSum);
console.log(basket.totalAmount);
