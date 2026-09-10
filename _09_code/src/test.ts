// testing cl ->
// console.log("hello");

// basic ts function with types 
// ham koi value return nhi kr rahe from this funciton 
function showuser(userdetail:usertype) {

    let {username, role, isadmin} = userdetail

    let user = `%c ${username} `
    let role_ = `%c ${role} `
    let isadmin_ = `%c ${isadmin} `

    console.log(user, "color:lightblue ");
    console.log(role_, "color:gold");
    console.log(isadmin_, "color:lightgreen");
}

// showuser("coderx","linux admin", true)



// input function  ek return type function hai jo ki ek object return kr rha hai 

type usertype = {
    username : string | null;
    role : string | null; 
    isadmin : boolean | null;
}

// type mein hamne union mein null es li

 function inputuserdetails() : usertype {
    let userN = prompt("Enter your username")
    let role = prompt("Enter your role ")
    let isadmin = prompt("Enter your admin right (true or false)")

    return {
       username :  userN,
       role :  role,
       isadmin : isadmin
    }
        
} 


let btn = document.querySelector("#inputbtn")


btn?.addEventListener("click",() =>{
    let inputdetail =  inputuserdetails()
   
    showuser(inputdetail)
})
