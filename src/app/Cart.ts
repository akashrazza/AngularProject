export class Cart{
    id:number=0;
    product_name:string="";
    price:number=0;
    image:string="";

    constructor(id:number,product_name:string,price:number,image:string){
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
    }
}