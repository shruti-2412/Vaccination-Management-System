import { func } from './admin.js'
fetch("http://localhost:5000/vaccine/vacview")
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      console.log(response.status)
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    console.log(data)
    let view = document.getElementById('view');
    data.forEach(vaccine => {
      let html = `
      
    
    <div class="card" id="vacview">
      <div class="card-body">   
      <h5>${vaccine.Vname}</h5><br>
      <p>Manufacturer :<h6> ${vaccine.manufacturer}</h6></p><br>
      <p>Vaccine Code : ${vaccine.vcode}</p>
      </div>
    </div>
   
  
      `
      view.innerHTML += html;


    })
  }).catch(error => {
    console.log(error)
    alert("Something went wrong!")
  })





let sign = document.getElementById('signup');
let login = document.getElementById('login');
let phonenum;
let token;

sign.addEventListener('click', signUp);


function signUp() {
  login.disabled = true;
  let html = `

  <div class="card border-primary mb-3" style="position: absolute;top: 50px;z-index: 1;">
  <div class="card-body" id="content">   
  <form id="signForm>
  <div >
    <label for="exampleInputEmail1"  id="phnum">Phone Number</label>
    <input type="number"  id="exampleInputNumber1" aria-describedby="emailHelp">
    <div id="emailHelp" >We'll never share your number with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1"  id="pass">Password</label>
    <input type="password"  id="exampleInputPassword1">
  </div>
 
  <button type="submit" id="submit">Submit</button>
</form>

  </div>
</div>
   
    `
  let sign = document.getElementById('sign')
  sign.innerHTML = html

  const phoneInput = document.querySelector('#exampleInputNumber1');
  const passwordInput = document.querySelector('#exampleInputPassword1');

  let submit = document.getElementById('submit');
  submit.addEventListener('click', (e) => {
    // e.preventDefault()
    const phnum = phoneInput.value;
    const password = passwordInput.value;


    if (phnum != '' && password != '' && phnum.length == 10) {
      const data = { phnum, password };

      fetch(`http://localhost:5000/user/signup`, {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            // Handle a successful response here (status code between 200 and 299)
            console.log(response.status);
            login.disabled = false;
            return response.json();
          } else {
            // Handle an unsuccessful response here (status code outside of 200 to 299)
            login.innerHTML = ''
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          console.log('Success:', data);
          alert("Signed up successfully")
          // login.disabled = false;
          // Handle successful response here
          sign.innerHTML = '';
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`Add the correct 10 digit phone number which is not already used!`)
          // Handle error response here
        });
    } else {

      alert("Make sure the phone number has 10 digits or no null value is passed in as number or password !!")
    }

  })
}



login.addEventListener('click', logIn);
function logIn() {
  sign.disabled = true;

  let html = `

  <div class="card border-primary mb-3" style="position: absolute;top: 50px;z-index: 1;">
      <div class="card-body " id="content">  
      <form id="LoginForm>
      <div >
        <label for="exampleInputEmail1"  id="phnum">Phone Number</label>
        <input type="number"  id="exampleInputNumber1" aria-describedby="emailHelp">
        <div id="emailHelp" >We'll never share your number with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1"  id="pass">Password</label>
        <input type="password"  id="exampleInputPassword1">
      </div>
     
      <button type="submit" id="submit">Submit</button>
    </form>
      </div>
    </div>
    
    `
  let logi = document.getElementById('log')
  logi.innerHTML = html

  const phoneInput = document.querySelector('#exampleInputNumber1');
  const passwordInput = document.querySelector('#exampleInputPassword1');

  let submit = document.getElementById('submit');
  submit.addEventListener('click', (e) => {
    e.preventDefault()
    const phnum = phoneInput.value;
    const password = passwordInput.value;

    if (phnum != '' && password != '') {
      phonenum = phnum;
      const data = { phnum, password };

      fetch(`http://localhost:5000/user/login`, {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            // Handle a successful response here (status code between 200 and 299)
            console.log(response.status);

            return response.json();
          } else {
            // Handle an unsuccessful response here (status code outside of 200 to 299)
            logi.innerHTML = ''
            throw new Error('Network response was not ok.');
          }

        })
        .then(data => {
          token = data.token;
          console.log('Success:', data);
          logi.innerHTML = ''
          login.disabled = true;
          if (data.role == 'U') {
            alert("Logged in successfully as USER")

            benif();
          } else {
            alert("Logged in successfully as ADMIN")

            func()
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`try again!`)
          logi.innerHTML = ''
          // Handle error response here
        });
    } else alert("No null values inside phone number and pasword can be submitted!!")
  })
}




function benif() {

  let html1 = `   <div class="card text-center">

  <div class="card-header">
    <div class="openBtn">
      <button class="openButton"  class="btn btn-primary" id="vacbook">Book Vaccine</button><br>
    </div>
    <p id="head">We provide vaccines for benificiaries from age of 0 to age of 18 yrs</p>
    <div class="openBtn">
        <button class="openButton"  class="btn btn-primary" id="addben">Add Benificiary</button>
    </div>
  </div>

  <div class="loginPopup">
    <div class="formPopup" id="popupForm1">

      <form class="formContainer" id="formContainer0">
         <h2 style="z-index:1;">To book vaccine</h2>
        <label>Enter the ID of Benificiary</label>
        <input type="text" id="benf_id" placeholder="Benificiary Id" name="benf_id" required>
        <button type="submit" id="ok">OK</button>

      </form>

      <form class="formContainer" id="formContainer1">

        <label>Select your vaccine</label>
        <select id="vaccine-select"></select>
        <label>Which dose is this? eg. 1,2..</label>
        <input type="number" id="dose" placeholder="Dose" name="dose" required>
        <br><br>

        <button type="submit" class="btn" id="book">Book</button>
        <button type="button" class="btn cancel" id="close1">Close</button>
        
      </form>
    </div>
  </div>



  <div class="card-body custom-bg">
    <h5 class="card-title">Benificiaries linked to this account</h5>
      <br>
    <div>
      <ul id="bnf" style=" list-style: none;"></ul>
    </div>
   
  </div>
 
  <div class="card-footer ">
  <p>Add the details of benificiaries and book their vaccine.</p>
  </div>
    <div class="loginPopup">
      <div class="formPopup" id="popupForm2">
        <form class="formContainer" id="formContainer2">
          <h2>Please add enough details!</h2>

          <input type="text" id="name" placeholder="Benificiary Name" name="name" required>
          <label for="dob">
            <strong>Date of Birth</strong>
          </label>
          <input type="date" id="date" placeholder="DOB" name="dob" min="2004-01-01" required>
          <br><br>

          <input type="text" id="addr" placeholder="Address" name="addr" required>
          <label><strong>Gender</strong></label><br>
          <label for="male">Male</label>
          <input type="radio" id="male" name="gender" value="male">

          <label for="female">Female</label>
          <input type="radio" id="female" name="gender" value="female"><br><br>

          <input type="text" id="adhar" placeholder="12 digit adhar number" name="adhar">
          <button type="submit" class="btn" id="add">Submit</button>
          <button type="button" class="btn cancel" id="close2">Close</button>
        </form>

      </div>

    </div>
  
</div>
`

  let ben = document.getElementById('benf');
  ben.innerHTML = html1;
  getBenf(phonenum)
  document.getElementById('vacbook').addEventListener('click', openForm1)
  document.getElementById('addben').addEventListener('click', openForm2)
  document.getElementById('close1').addEventListener('click', closeForm1)
  document.getElementById('close2').addEventListener('click', closeForm2)
  let benf_id;
  document.getElementById('ok').addEventListener('click', (e) => {
    e.preventDefault();

    benf_id = document.getElementById('benf_id').value;
    fetch(`http://localhost:5000/vaccine/getvac/${benf_id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        // Get the select element
        const select = document.getElementById('vaccine-select');

        // Add options for each vaccine
        data.forEach(vaccine => {
          const option = document.createElement('option');
          option.text = vaccine.Vname;
          option.value = vaccine.Vcode;
          select.appendChild(option);
        });
      })
      .catch(error => console.error(error));
  })



  let bookbtn = document.getElementById('book')
  bookbtn.addEventListener('click', (e) => {
    e.preventDefault()

    let Dose_No = document.getElementById('dose').value;
    let Vcode = document.getElementById('vaccine-select').value;
    var Reg_Dt = new Date();
    let year1 = Reg_Dt.getFullYear();
    let month1 = Reg_Dt.getMonth() + 1; // Add 1 to get month from 1-12 instead of 0-11
    let day1 = Reg_Dt.getDate();
    Reg_Dt = year1 + '-' + month1 + '-' + day1

    let Vacc_Dt = new Date();
    let year = Vacc_Dt.getFullYear();
    let month = Vacc_Dt.getMonth() + 1; // Add 1 to get month from 1-12 instead of 0-11
    let day = Vacc_Dt.getDate() + 2;
    Vacc_Dt = year + '-' + month + '-' + day
    let PhNum=phonenum;

    let details = { benf_id, Vcode, Reg_Dt, Dose_No, Vacc_Dt,PhNum }
    console.log(details)
    var allow = 0;

    fetch(`http://localhost:5000/vaccine/vac/${Vcode}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          // Handle a successful response here (status code between 200 and 299)
          console.log(response.status);
          return response.json();
        } else {
          // Handle an unsuccessful response here (status code outside of 200 to 299)
          console.log(response.status);
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        data.forEach(data => {
          if (data.No_of_Doses < Dose_No) {
            console.log("fir", allow)
            alert(`This particular vaccine has ${data.No_of_Doses} number of doses only.`)
          }
          else {
            console.log("In prev fetch")
            fetch(`http://localhost:5000/vaccination/prev/${benf_id}/${Vcode}/${Dose_No}`).then(response => {
              if (response.ok) {
                // Handle a successful response here (status code between 200 and 299)
                console.log(response.status);
                return response.json()
              } else {
                // Handle an unsuccessful response here (status code outside of 200 to 299)
                console.log(response.status);
                throw new Error('Network response was not ok.');
              }
            }).then(data => {

              if (data.length > 0) {
                alert("This dose of vaccine is already been taken")
                document.getElementById('formContainer1').reset();
                document.getElementById('formContainer0').reset();
                document.getElementById("vaccine-select").innerHTML = '';
                closeForm1()
              } else {
                console.log("In addition")
                fetch('http://localhost:5000/vaccination/add', {
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json,text/plain, */*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(details)
                })

                  .then(response => {
                    if (response.ok) {
                      // Handle a successful response here (status code between 200 and 299)
                      console.log(response.status);
                      return response.json();
                    } else {
                      // Handle an unsuccessful response here (status code outside of 200 to 299)
                      console.log(response.status);
                      throw new Error('Network response was not ok.');
                    }
                  })
                  .then(data => {
                    alert(`Vaccine booked successfully- Benificiary will be vaccinated after two days from todays date i.e. on ${details.Vacc_Dt} at our location`)
                    document.getElementById('formContainer1').reset();
                    document.getElementById('formContainer0').reset();
                    document.getElementById("vaccine-select").innerHTML = '';
                    closeForm1()
                  })
                  .catch(
                    error => {
                      // e.preventDefault()
                      console.error('Error:', error.value);
                      alert(`Make sure benficiary can't book vaccine more than one time.`)
                      document.getElementById('formContainer1').reset();
                      document.getElementById('formContainer0').reset();
                      document.getElementById("vaccine-select").innerHTML = '';
                      closeForm1()
                    })

              }
            })
          }
        })

      })




  })

  // this is for benificiary table


  let add = document.getElementById('add');

  add.addEventListener('click', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const address = document.getElementById('addr').value;
    let adharNum = document.getElementById('adhar').value;

    const dob = document.getElementById("date").value;
   


    const genderGroup = document.querySelector('input[name="gender"]:checked');
    let gender;
    // Check which radio button was chosen
    if (genderGroup.value === "male") {
      gender = 'M'
    } else if (genderGroup.value === "female") {
      gender = 'F'
    } else {
      gender = 'O'
    }
    document.getElementById('formContainer2').reset();
    closeForm2();
    const phnum = phonenum;
    console.log(adharNum)
    console.log(name, address, dob, gender, phnum, adharNum)
    const data = { name, address, dob, gender, phnum, adharNum }


    fetch("http://localhost:5000/benificiary/add", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: "application/json,text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(data.adharNum)

        if (response.ok) {
          // Handle a successful response here (status code between 200 and 299)
          console.log(response.status);

          return response.json();
        } else if (response.status == 400) {
          alert('Benificiary already added !')
          throw new Error('Network response was not ok.');
        }
        else {
          // Handle an unsuccessful response here (status code outside of 200 to 299)
          document.getElementById('formContainer2').reset();
          throw new Error('Network response was not ok.');

        }

      })
      .then(data => {
        getBenf(phonenum)
        // Handle successful response here

      })
      .catch((error) => {
        console.error('Error:', error.value);
        alert(`try again!`)
        document.getElementById('formContainer2').reset();
        // Handle error response here
      });

  })
  // till this benifiacairy data will be added/get
}

let count;
let list = [];
// let bookhtml=``
function getBenf(phoneNum) {
  list = []
  let id = document.getElementById('bnf');
  id.innerHTML = ''
  let data = { phoneNum }
  fetch(`http://localhost:5000/benificiary/get/${phonenum}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then((response) => {
      if (response.ok) {
        // Handle a successful response here (status code between 200 and 299)
        console.log(response.status);
        return response.json();

      } else {
        // Handle an unsuccessful response here (status code outside of 200 to 299)
        throw new Error('Network response was not ok.');
      }

    })
    .then(data => {
      console.log(data)
      data.forEach(data => {

        console.log(data)
        let lid = data.benf_id;
        let name = data.name;
        let address = data.address
        let dob = data.DOB

        const date = new Date(dob); // Assuming the date is in ISO format
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        console.log(formattedDate); // Output: "7 May 2003"


        let gender = data.gender
        let phnum = data.phnum
        let adhar = data.adharNum
        count += 1;
        id.innerHTML = id.innerHTML + `
        <li>
        <div class="benific">
        <br>
        Benificiary Id: <strong>${lid}</strong> <br>
        Name: <strong>${name}</strong> <br>
        Address: <strong>${address}</strong> <br>
        DOB: <strong>${formattedDate}</strong> <br>
        Gender: <strong>${gender} </strong><br>
        Phone Number: <strong>${phnum} </strong><br>
        Adhar Number: <strong>${adhar} </strong><br>
          
      </div></li>

            `

        list += [{

          "id": `${lid}`,
          "dob": `${dob}`
        }]
      });


    })
    .catch((error) => {
      console.error('Error:', error);
      alert(`try again!`)

      // Handle error response here
    });

}
function openForm1() {
  document.getElementById("popupForm1").style.display = "block";
  console.log("clicked book")
  if (list.length <= 0) {
    alert("First add the benificiary details!!!")
    closeForm1()
  }

}

function closeForm1() {
  document.getElementById("popupForm1").style.display = "none";
}
function openForm2() {
  document.getElementById("popupForm2").style.display = "block";
}
function closeForm2() {
  document.getElementById("popupForm2").style.display = "none";
}


