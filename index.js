let cont = document.getElementById("form")
let container = document.getElementById("container")



async function getfield(){
    try{
        let res= await fetch(`http://localhost:3000/formFields`)
        let data= await res.json()
        console.log(data)
        createForm(data)
    }
    catch(err){
        console.log(err)
    }
}
getfield()


function createForm(data){
    let form = document.createElement("form")
    data.forEach(element => {
        let input =document.createElement("input")
        input.placeholder=element.label
        input.key= element.key
        input.type=element.type
        input.id=element.key
        input.minLength="5"
        if(element.maxLength==null){
            input.maxLength="50"
        }else{
            input.maxLength= element.maxLength
        }
        form.append(input)
    });
    let submit = document.createElement("input")
    submit.type="submit"
    submit.addEventListener("click",(e)=>{
        e.preventDefault()
        let obj = {}
        data.forEach(elem => {
            let key = document.getElementById(elem.key).value
            
            obj[elem.key]=key
        });
        if (obj.user_name =="" ||obj.mobile_no =="" || obj.email =="") {
            alert("PLese Enter valid values");
            
        }else{

            createData(obj); 
        }
        
    })
    form.append(submit)
    cont.append(form)
}

function createData(data){
    
fetch('http://localhost:3000/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
  
    
}


async function showAll(){
    try{
        let res= await fetch(`http://localhost:3000/submissions`)
        let data= await res.json()
        console.log(data)
        showData(data)
    }
    catch(err){
        console.log(err)
    }
}


function showData(data){
data.forEach(thing => {
    
    let card =document.createElement("div")
    card.className="card"
    let name =document.createElement("h3")
    let email =document.createElement("p")
    let mobile =document.createElement("p")
    name.innerText= `Name: ${thing.user_name}`
    email.innerText= `Name: ${thing.email}`
    mobile.innerText= `Name: ${thing.mobile_no}`
    card.append(name,mobile,email)
    container.append(card)
});

}
showAll();