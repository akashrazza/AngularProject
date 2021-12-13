export class User{
    id:number = 0;
    first_name:string = "";
    last_name:string = "";
    city:string = "";
    mobile_no:string = '';
    email:string = "";
    password:string = ""
    question:string = ""
    answer:string = ""
    DOB:Date=new Date()
    role:string = ""

    constructor( id:number,first_name:string,last_name:string,city:string,mobile_no:string,email:string,password:string,question:string,answer:string,DOB:Date,role:string){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.city = city;
        this.mobile_no = mobile_no;
        this.email = email;
        this.password = password;
        this.question = question;
        this.answer = answer;
        this.DOB = DOB;
        this.role = role;
    }
;}