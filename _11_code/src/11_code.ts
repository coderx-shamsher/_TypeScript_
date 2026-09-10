// class variables without constructor 
// class User {
//     username : string
//     passwd : string
// }

// let user1 = new User ()
// user1.username = "admin"
// user1.passwd = "admin"
// console.log(user1, typeof user1); // i can see the user1 object

// but jaise ki hame user1 koi use kra to hme suggestions milne suru ho gye 


// class with constructor 

class Users {
    // first declare the types of constructor variables like this  ---> 
    username :string
    passwd : string

    constructor (username: string , passwd : string) {
        this.username = username
        this.passwd = passwd
    }

    show(){
        console.log("show users method is running...now.....\n");
       console.log(this.username);
       console.log(this.passwd);
    }
}

let usr1 = new Users("admin_0x","admin0x")
usr1.show()


// Access modifiers 

class Admin {
    
    // public access modifier
    public username : string  = "public user"

    private adminuser : string = "admin_secret"

    

}