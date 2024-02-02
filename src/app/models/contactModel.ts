export class ContactModel {
    mobilenumber!: string;
    name!: string;
    isActive!: boolean;
    isFavorite!: boolean;
    isDeleted!: boolean;
    contactDateCreated!:string;
    username!:string;
    email!:string

    constructor(mobile:string,name:string,isActive:boolean,isFavorite:boolean,isDeleted:boolean,
        username:string,email:string){
            this.name=name
            this.mobilenumber=mobile
            this.isActive=isActive
            this.isDeleted=isDeleted
            this.isFavorite=isFavorite
            this.username=username
            this.email=email
    }
   }
   