export class ContactModel {
    mobile!: string;
    name!: string;
    isActive!: boolean;
    isFavorite!: boolean;
    isDeleted!: boolean;
    contactDateCreated!:string

    constructor(mobile:string,name:string,isActive:boolean,isFavorite:boolean,isDeleted:boolean,dateCreated:string){
            this.name=name
            this.mobile=mobile
            this.isActive=isActive
            this.isDeleted=isDeleted
            this.isFavorite=isFavorite
            this.contactDateCreated=dateCreated
    }
   }
   