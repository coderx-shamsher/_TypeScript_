let smartphone = {
    modelName: "redme",
    price: 20000,
    ram: "16gb",
    storage: "521gb",
    color: "special_blue"
}

// declaring object types in ts 
// jab hame type declare krna hai to make sure ki ham ( = equal to na use kre ) hame : use krna hai 
let phone: {
    name: string,
    price: number,
    ram: string,
    storage: string,
    color: string
}

// note jab bhi objects create kr k use krne hai to pahle uska Type create krte or then use kre -- > 
// example 

type Iphone = {
    model: string,
    price: number,
    color: string,
    storage: string
}

// let create object or iphone 
let iphone: Iphone = {
    model: "Iphone 12",
    price: 30000,
    color: "skyblue",
    storage: "128gb"
}

phone = {
    name: "realme",
    price: 35000,
    ram: "16gb",
    storage: "1tb",
    color: "special_golden"
}


// or properties ki names mein mistakes hoti hai to errors or suggestion show hota hai jo ki achi batt hai 

// partial keyword 

type user = {
    username: string,
    password: string,
    id: string,
    isadmin: boolean
}

let users: user = {
    username: "default",
    password: "default",
    id: "default",
    isadmin: false
}

console.log("User db ==> ");
console.log(users);

const updaterole = (updates: Partial<user>) => {
    console.log("updating user db with => ", updates);

    // with returning values 
    // let users =  updates
    // return users
}


updaterole({ username: "yuta" })
// now muje baki ki fields dene ki jarurat nhi hai... 

updaterole({ id: "yuta_0y" })

// > with returning value <
// let user1 = updaterole({username : "rojin"})
// console.log(user1)

//  hame sare he object ki fields koi optional bana sakte hain with partial 
//Note -->  esmein ke problem hai ki ham empty objects bhi pass kr skate hain koi bhi error nhi ata jo ki dikkat kr sakta hai..

console.log();
console.log("------->>> Reuqired testing code <<<--------")
console.log();
// maine  ek type declare kra hai jismein mere sari values optional hai 
type coffee = {
    name?: string,
    price?: number
}

let placeOrder = (order: Required<coffee>) => {
    let orders = order
    return orders
}

// ab keoki mere dono properties optionals hai but ager maine required use kra hai to muje dono he dene he pardegi its not optional anymore or yeh ek se jada properties par bhi alse work krta hai 

let order1 = placeOrder({ name: "catppuccino", price: 150 })
console.log(order1);
console.log();


// pick in ts 

type User = {
    Uname: string,
    id: string,
    isadmin: boolean,
}

//
// From T(object), pick a set of properties whose keys are in the union K
type adminUser = Pick<User, "id" | "isadmin">

// yahan maine kra kiya ki pick  ki help say mein kuch field choose kri jise muje kam hai yan fir koi muje needed hai 

let testuser: adminUser = {
    id: "_00x01",
    isadmin: true
}

console.log();
console.log(testuser);
console.log();

// or ese he ham objects mein se special values pick kr skate hain its useful


// -->> omit << -- 

type developer = {
    devname: string
    userid: string
    role: string
    isadmin: boolean
    secretCode: string
}

// esmein suggestions nhi aate 
type devuser = Omit<developer, "secretCode">

// ab mai jo bhi object create krta hun ussmein meri omit ki huyi field ki pass krne ki jarurat nhi hai 

let testdev: devuser = {
    devname: "testdev",
    userid: "tst_user1",
    role: "backend eng",
    isadmin: true
}
// see muje koi bhi required properties essa koi bhi error show nhi huta.. 
console.log();
console.log(testdev);
console.log();



//  <-- minimum object requirements and with extra fields -->
type Cup = { size: string }
let smallcup: Cup = { size: "200ml" }

console.log();
console.log(smallcup);
// ab meine ek or let vairable create kra 
let bigCup = { size: "500ml", price: 50 }
// ham maine eh variable mein ek extra field create kri hai 
console.log(bigCup);
console.log();
smallcup = bigCup
console.log(smallcup);
console.log();

// esmein koi dikat nhi ayi keoki hame smallcup k minimum requirements puri kri jo ki ek string field pass krna or than ager koi or extra fields add krte hain to koi dikat nhi hai but make sure ki field ki minimum requirements puri ho.. 

// 1) smallcup ko hame ek cup type data type ki help se create kra hai or uski minimum requirement hai ki size ek string honi chaahie ager vo fulfill ho rahi hai to hame next koi bhi field extra add kr sakte hain koi pareshani nhi hogi.. 

type AdminUser = {
    username: string,
    userid: string
}

let user1 = {
    username: "admin_0",
    userid: "0x01",
    role: "Admin"
}

// maine ek admin user create kra jo ki AdminUser type par create hga but uski values ayengi user1 se 
let adminuser: AdminUser = user1

console.log(adminuser);

// ts mein ager minimum requirements puri hai to extra values koi dikat nhi hai but kabhi hame extra vales nhi chaahie so take care about this concept bs.. 


// data type splitout  code separations 
type item1 = {
    street: string
    country: string
    city: string
    pin: number
}

type item2 = {
    name: string
    orderid: string
    userid: string

}

type order = {
    producdid: string,
    userdetails: item2
    address: item1
}

let ordertest: order = {
    producdid: "10000x",
    userdetails: {
        name: "testuser1",
        orderid: "testid-011",
        userid: "testuser_001"
    },
    address: {
        street: "local",
        country: "norway",
        city: "maincity",
        pin: 1234
    }
}

// this is the usecase of this cocept  
// is trah ki code separations se code mein clearlty ati hai its a good practice in ts also 
console.log(ordertest);




// --> that's all about the object in ts done 