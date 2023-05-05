
let menu = document.getElementById('menu')
let html = `
<div class="card border-primary mb-3" >
<div class="card-body">
  <ul style="list-style: none; display:flex; justify-content:center ;" >
    <li><button id="booking" class="btn btn-outline-success">Bookings Till Date</button></li> 
<li><button id="vaccines" class="btn btn-outline-success" >Vaccine Data</button></li>
<li><button id="done" class="btn btn-outline-success">Vaccination Done Today</button></li>
<li><button id="expired" class="btn btn-outline-success">Expired Vaccines</button></li>
<li><button id="unavail" class="btn btn-outline-success">Unavailable Vaccines</button></li>
</ul>
</div>
</div>

`

export function func() {

  menu.innerHTML = html


  document.getElementById('booking').addEventListener('click', () => {

    let con = `
    <div class="card border-secondary mb-4">
      <div class="card-body">  
      <h4 style="text-align:center;"> Bookings Till Date </h4> <br>
      <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Reg No</th>
          <th scope="col">Name</th>
          <th scope="col">Booking Date</th>
          <th scope="col">Vaccination Date</th>
          <th scope="col">Vaccine</th>
          <th scope="col">Dose</th>
        </tr>
      </thead>
      <tbody id="cont">
      
      </tbody>
      </table>
      </div>
    </div>

`

    let content = document.getElementById('content')
    content.innerHTML = con
    let cont = document.getElementById('cont')

    fetch('http://localhost:5000/vaccination/booking')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response.status)
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {


        data.forEach(data => {
          let r = new Date(data.Reg_Dt).getDate() + '/' + new Date(data.Reg_Dt).getMonth() + '/' + new Date(data.Reg_Dt).getFullYear()
          let v = new Date(data.Vacc_Dt).getDate() + '/' + new Date(data.Vacc_Dt).getMonth() + '/' + new Date(data.Vacc_Dt).getFullYear()
          cont.innerHTML += `
            <tr>
            <th scope="row">${data.Reg_No}</th>
            <td>${data.name}</td>
            <td>${r}</td>
            <td>${v}</td>
            <td>${data.Vname}</td>
            <td>${data.Dose_No}</td>
          </tr>
            `
        })

      })

  })

  document.getElementById('vaccines').addEventListener('click', () => {

    let con = `

    <div class="card border-primary mb-3">
      <div class="card-body">   
      <h4 style="text-align:center;"> Vaccine Data </h4>
      <br>
      <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Vaccine code</th>
    <th scope="col">Lot Number</th>
    <th scope="col">vaccine Name</th>
    <th scope="col">Manufacturer</th>
    <th scope="col">Availability</th>
    <th scope="col">Manufacturing Date</th>
    <th scope="col">Expiry Date</th>
  </tr>
</thead>
<tbody id="cont">
</tbody>
</table>
      </div>
    </div>

`

    let content = document.getElementById('content')
    content.innerHTML = con
    let cont = document.getElementById('cont')

    fetch('http://localhost:5000/vaccine/get')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response.status)
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {


        data.forEach(data => {
          let r = new Date(data.Manuft_Dt).getDate() + '/' + new Date(data.Manuft_Dt).getMonth() + '/' + new Date(data.Manuft_Dt).getFullYear()
          let v = new Date(data.Exp_Dt).getDate() + '/' + new Date(data.Exp_Dt).getMonth() + '/' + new Date(data.Exp_Dt).getFullYear()
          cont.innerHTML += `
            <tr>
            <th scope="row">${data.Vcode}</th>
            <td>${data.LotNo}</td>
            <td>${data.Vname}</td>
            <td>${data.Manufacturer}</td>
            <td>${data.Availability}</td>
            <td>${r}</td>
            <td>${v}</td>
          </tr>
            `
        })

      })




  })

  document.getElementById('done').addEventListener('click', () => {

    let con = `
    <div class="card border-primary mb-3">
      <div class="card-body">   
      <h4 style=" text-align:center;"> Vaccination Done Today </h4><br>
      <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Reg No</th>
      <th scope="col">Name</th>
      <th scope="col">Booking Date</th>
      <th scope="col">Vaccination Date</th>
      <th scope="col">Vaccine</th>
      <th scope="col">Dose</th>
    </tr>
  </thead>
  <tbody id="cont">
  
  </tbody>
  </table>
      </div>
    </div>

  
  `

    let content = document.getElementById('content')
    content.innerHTML = con
    let cont = document.getElementById('cont')

    fetch('http://localhost:5000/vaccination/day')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response.status)
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        data.forEach(data => {
          let r = new Date(data.Reg_Dt).getDate() + '/' + new Date(data.Reg_Dt).getMonth() + '/' + new Date(data.Reg_Dt).getFullYear()
          let v = new Date(data.Vacc_Dt).getDate() + '/' + new Date(data.Vacc_Dt).getMonth() + '/' + new Date(data.Vacc_Dt).getFullYear()
          cont.innerHTML += `
            <tr>
            <th scope="row">${data.Reg_No}</th>
            <td>${data.name}</td>
            <td>${r}</td>
            <td>${v}</td>
            <td>${data.Vname}</td>
            <td>${data.Dose_No}</td>
          </tr>
            `
        })

      })




  })

  document.getElementById('unavail').addEventListener('click', () => {

    let con = `
    <div class="card border-primary mb-3">
      <div class="card-body">   
      <h4 style=" text-align:center;"> Unavailable Vaccines </h4><br>
      <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Vaccine code</th>
    <th scope="col">Lot Number</th>
    <th scope="col">vaccine Name</th>
    <th scope="col">Manufacturer</th>
  </tr>
</thead>
<tbody id="cont">
</tbody>
</table>
<button id="new" class="btn btn-outline-primary">Add new Lot</button>
<div class="loginPopup">
      <div class="formPopup" id="popupForm">
        <form class="formContainer" id="formContainer" name="myform">
          <h2>Please add enough details!</h2>

          <input type="text" id="lot" placeholder="Lot Number" name="lot" required>
          <input type="text" id="manuf" placeholder="Manufacturer" name="manuf" required>
          <label for="mandt">Manufacturing Date</label><br>
          <input type="date" id="mandt" placeholder="Man. Date" name="mandt"><br>
          <label for="expdt">Expiry Date</label><br>
          <input type="date" id="expdt" placeholder="exp. Date" name="expdt"><br>
          <input type="number" id="vcode" placeholder="Vaccine Code" name="vcode">
          <input type="number" id="avail" placeholder="Number of Vaccines to add" name="avail">
          <button type="submit" class="btn" id="submit">Submit</button>
          <button type="button" class="btn cancel" id="close">Close</button>
        </form>

      </div>

    </div>
      </div>
    </div>


`

    let content = document.getElementById('content')
    content.innerHTML = con
    let cont = document.getElementById('cont')

    fetch('http://localhost:5000/vaccine/zero')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response.status)
          throw new Error('Network response was not ok.');
        }
      })

      .then(data => {

        data.forEach(data => {
          cont.innerHTML += `
            <tr>
            <th scope="row">${data.Vcode}</th>
            <td>${data.LotNo}</td>
            <td>${data.Vname}</td>
            <td>${data.Manufacturer}</td>
          </tr>
            `
        })
      })

      document.getElementById('new').addEventListener('click', () => {

        document.getElementById("popupForm").style.display = "block";
        console.log("clicked new")
        //Lot_No,_Manufacturer,ManufDt,ExpDt, Availability, Vcode
        document.getElementById('submit').addEventListener('click', (e) => {
          e.preventDefault();
          // var form =  document.querySelector('form[name="myForm"]');;
  
          // Access the input element by name
          var Lot_No = document.getElementById("lot").value;
          var Manufacturer = document.getElementById("manuf").value;
          var Manuf_Dt = document.getElementById("mandt").value;
          var Exp_Dt = document.getElementById("expdt").value;
          var Vcode = document.getElementById("vcode").value;
          var Availability = document.getElementById("avail").value;
  
          let details = { Lot_No, Manufacturer, Manuf_Dt, Exp_Dt, Vcode, Availability }
  
          fetch('http://localhost:5000/manufacturing/addLot', {
            method: "POST",
            headers: {
              Accept: "application/json,text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
          }).then(response => {
            if (response.ok) {
              // Handle a successful response here (status code between 200 and 299)
              console.log(response.status);
              console.log(details)
              return response.json();
            } else {
              // Handle an unsuccessful response here (status code outside of 200 to 299)
              // document.getElementById('formContainer').reset();
              
              throw new Error('Network response was not ok.');
  
            }
  
          }).then(data => {
            console.log(data)
            document.getElementById('formContainer').reset();
            document.getElementById("popupForm").style.display = "none";
            alert("Data added succesfully")
          }).catch(error=>{
            console.error('Error:', error.value);
            alert('Add relevant data. Make sure vaccine code is correct, no null value is passed or even unique lot number is added')
          })
        })
  
      })
      document.getElementById('close').addEventListener('click', () => {
        document.getElementById("popupForm").style.display = "none";
  
      })
    

  })

  document.getElementById('expired').addEventListener('click', () => {

    let con = `
    <div class="card border-secondary mb-3">
      <div class="card-body">   
      <h4 style=" text-align:center;"> Expired Vaccine Data </h4><br>
      <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Vaccine code</th>
    <th scope="col">Lot Number</th>
    <th scope="col">vaccine Name</th>
    <th scope="col">Manufacturer</th>
    <th scope="col">Manufacturing Date</th>
    <th scope="col">Expiry Date</th>
  </tr>
</thead>
<tbody id="cont">
</tbody>
</table>

<button id="new" class="btn btn-outline-primary">Add new Lot</button>
<div class="loginPopup">
      <div class="formPopup" id="popupForm">
        <form class="formContainer" id="formContainer" name="myform">
          <h2>Please add enough details!</h2>

          <input type="text" id="lot" placeholder="Lot Number" name="lot" required>
          <input type="text" id="manuf" placeholder="Manufacturer" name="manuf" required>
          <label for="mandt">Manufacturing Date</label><br>
          <input type="date" id="mandt" placeholder="Man. Date" name="mandt"><br>
          <label for="expdt">Expiry Date</label><br>
          <input type="date" id="expdt" placeholder="exp. Date" name="expdt"><br>
          <input type="number" id="vcode" placeholder="Vaccine Code" name="vcode" required>
          <input type="number" id="avail" placeholder="Number of Vaccines to add" name="avail" required>
          <button type="submit" class="btn" id="submit">Submit</button>
          <button type="button" class="btn cancel" id="close">Close</button>
        </form>

      </div>

    </div>
      </div>
    </div>



`

    let content = document.getElementById('content')
    content.innerHTML = con
    let cont = document.getElementById('cont')

    fetch('http://localhost:5000/vaccine/expired')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response.status)
          throw new Error('Network response was not ok.');
        }
      })

      .then(data => {


        data.forEach(data => {
          let r = new Date(data.Manuft_Dt).getDate() + '/' + new Date(data.Manuft_Dt).getMonth() + '/' + new Date(data.Manuft_Dt).getFullYear()
          let v = new Date(data.Exp_Dt).getDate() + '/' + new Date(data.Exp_Dt).getMonth() + '/' + new Date(data.Exp_Dt).getFullYear()
          cont.innerHTML += `
            <tr>
            <th scope="row">${data.Vcode}</th>
            <td>${data.LotNo}</td>
            <td>${data.Vname}</td>
            <td>${data.Manufacturer}</td>
            <td>${r}</td>
            <td>${v}</td>
          </tr>
            `
        })

      })

      document.getElementById('new').addEventListener('click', () => {

        document.getElementById("popupForm").style.display = "block";
        console.log("clicked new")
        //Lot_No,_Manufacturer,ManufDt,ExpDt, Availability, Vcode
        document.getElementById('submit').addEventListener('click', (e) => {
          e.preventDefault();
          // var form = document.forms["myForm"];
  
          var Lot_No = document.getElementById("lot").value;
          var Manufacturer = document.getElementById("manuf").value;
          var Manuf_Dt = document.getElementById("mandt").value;
          var Exp_Dt = document.getElementById("expdt").value;
          var Vcode = document.getElementById("vcode").value;
          var Availability = document.getElementById("avail").value;
  
  
          let details = { Lot_No, Manufacturer, Manuf_Dt, Exp_Dt, Vcode, Availability }
  
          fetch('http://localhost:5000/manufacturing/addLot', {
            method: "POST",
            headers: {
              Accept: "application/json,text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
          }).then(response => {
            if (response.ok) {
              // Handle a successful response here (status code between 200 and 299)
              console.log(response.status);
  
              return response.json();
            } else {
              // Handle an unsuccessful response here (status code outside of 200 to 299)
              document.getElementById('formContainer').reset();
              throw new Error('Network response was not ok.');
  
            }
  
          }).then(data => {
            console.log(data)
            document.getElementById('formContainer').reset();
            document.getElementById("popupForm").style.display = "none";
            alert("Data added succesfully")
          })
        })
  
      })
      document.getElementById('close').addEventListener('click', () => {
        document.getElementById("popupForm").style.display = "none";
  
      })




  })

  
}
