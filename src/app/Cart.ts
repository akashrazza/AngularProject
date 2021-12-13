export class Cart{
    id:number=0;
    product_name:string="";
    price:number=0;
    image:string="";
    checked:boolean=false
    category:string=""
    variant_id:number=0
    quantity : number=0
    cart_id:number=0;
    constructor(id:number,product_name:string,price:number,image:string,category:string,variant_id:number,quantity:number){
        this.id = id;
        // this.cart_id = cart_id;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
        this.category = category
        this.variant_id = variant_id
        this.quantity=quantity
    }
}