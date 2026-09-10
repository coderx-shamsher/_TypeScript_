import axios, { type AxiosResponse } from "axios";

// 1) create the structure of object (request/response data you have to fetch/send )

interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    login: {
        uuid: string,
        username: string,
        password: string
    },
    phone: string,
    address: {
        street: string,
        city: string,
    }
}


// function ResponseFnc(): void {
//     axios.get("https://jsonplaceholder.org/users")
//         // this is promise based so ese vese he handle krna shi hai
//         .then((response) => {
//             // hame data koi json mein parse krna nhi pardta 
//             // let  data = response.json()
//             // console.log(data); 
//             console.log(response.data);
//         }).catch((err) => {
//             console.log(err);
//         });
// }
// export default ResponseFnc
// this is basic tesitng 


 export async function AxiosFetchUsers() {
    try {

        // axiosResponse is also a generic so ham use use kr skte hain like that 
        const Response: AxiosResponse<User> = await axios.get("https://jsonplaceholder.org/users")

        console.log("data is fetcing");
        console.log(Response);
        // console.log(Response.data.firstname);
        // console.log(Response.data.Email);
        // console.log(Response.data.Login);
        // console.log(Response.data.Address);

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log("axios Error Message -> ", error.message);
            console.log("axios Error Cause -> ", error.cause);
            if (error.response) {
                console.log(error.response.data);
            }
            // ese he ham or bhi structuring kr skte hain age hamari request complex hai 
        }
    }
}

export async function FetchUserFetch() {
    try {

        const Response = await fetch("https://jsonplaceholder.org/users")

        if (!Response.ok) {
            throw new Error(`HTTP Error Reponse Not OK ❌ ${Response}`)
        }
        // data parsering with json 
        const Data : User = await Response.json()

        console.log("Fetching User Data -.....-");
        console.log(Data);

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

