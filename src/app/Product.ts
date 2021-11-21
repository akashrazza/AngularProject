export class Product{
    id:number = 0;
    product_name:string = "";
    Type : string = "";
    price : number = 0;
    category : string = "";
    img : string = "";
    tage : string = ""

    constructor(id:number,product_name:string,Type:string,price:number,category:string,img:string,tage:string)
    {
        this.id = id;
        this.product_name = product_name;
        this.Type = Type;
        this.price = price;
        this.category = category;
        this.img = img;
        this.tage = tage;
    }
}