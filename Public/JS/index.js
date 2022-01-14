display();

function display() {
  fetch("http://localhost:3000/Student").then(
      res => {
          res.json().then(
              data => {
                  console.log(data)
                  if (data.length > 0) {
                      var temp = "";
                      data.forEach((d) => {
                          temp += "<tr>";
                          temp += "<td>" + d.id + "</td>";
                          temp += "<td>" + d.name + "</td>";
                          temp += "<td>" + d.age + "</td>";
                          temp += "<td>" + d.dept + "</td>";
                          temp += "<td>" + d.prov + "</td></tr>";
                      })

                      document.getElementById("tbody").innerHTML = temp;
                  }
              }
          )
      }
  )
}

function deleteRecord() {
    let id = document.getElementById("id").value;
    if (id.length != 0) {
        fetch("http://localhost:3000/Student/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        })
    }
    else {
        let result = confirm("Are you sure you want to delete all the records?")
        if (result) {
            fetch("http://localhost:3000/Student").then(
                res => {
                    res.json().then(
                        data => {
                            for (let i = 0; i < data.length; i++) {
                                fetch("http://localhost:3000/Student/" + data[i].id, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(data)
                                })
                            }
                        }
                    )
                }
            )
        }
    }
}

function insertion() {
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let department = document.getElementById("dept").value.trim();
    let province = document.getElementById("prov").value.trim();
    if (id.length != 0 && name.length != 0 && age.length != 0 && department.length != 0 && province.length != 0) {
        fetch("http://localhost:3000/Student").then(
            res => {
                res.json().then(data => {
                    data.forEach((d) => {
                        if (d.id == id){
                            alert("Duplicated!");
                        }
                    })
                    var Student = {
                        "id": id.value,
                        "name": name,
                        "age": age,
                        "dept": department,
                        "prov": province,
                    }
            
                    fetch("http://localhost:3000/Student", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(Student)
                    })
                })
            }
        )
    }
    else {
        alert("Fields cannot be empty!")
    }
}

function editRecord() {
    let newId = document.getElementById("id").value
    if (newId.length != 0) {
        fetch("http://localhost:3000/Student/" + newId).then((res) => {
            res.json().then((data) => {
                var newName = document.getElementById("name").value;
                var newAge = document.getElementById("age").value;
                var newDept = document.getElementById("dept").value;
                var newProv = document.getElementById("prov").value;
                if (newName != '' && newAge != '' && newDept != '' && newProv != '') {
                    let Student = {
                        id: newId,
                        name: newName,
                        age: newAge,
                        dept: newDept,
                        prov: newProv,
                    }
                    fetch("http://localhost:3000/Student/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(Student),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newName != '' && newAge == '' && newDept == '' && newProv == '') {
                    let Student = {
                        id: newId,
                        name: newName,
                        age: data.age,
                        dept: data.dept,
                        prov: data.prov,
                    }
                    fetch("http://localhost:3000/Student/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(Student),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newName == '' && newAge != '' && newDept == '' && newProv == '') {
                    let Student = {
                        id: newId,
                        name: data.name,
                        age: newAge,
                        dept: data.dept,
                        prov: data.prov,
                    }
                    fetch("http://localhost:3000/Student/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(Student),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newName == '' && newAge == '' && newDept != '' && newProv == '') {
                    let Student = {
                        id: newId,
                        name: data.name,
                        age: data.age,
                        dept: newDept,
                        prov: data.prov,
                    }
                    fetch("http://localhost:3000/Student/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(Student),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newName == '' && newAge == '' && newDept == '' && newProv != '') {
                    let Student = {
                        id: newId,
                        name: data.name,
                        age: data.age,
                        dept: data.dept,
                        prov: newProv,
                    }
                    fetch("http://localhost:3000/Student/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(Student),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                
            })
        })
    }
    else {
        alert("Please make it clear!")
    }

}

function findRecord() {
    let id = document.getElementById("id").value
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let dept = document.getElementById("dept").value
    let prov = document.getElementById("prov").value
    if (id.length != 0 && name.length == 0 && age.length == 0 && dept.length == 0 &&prov.length ==0) {
        fetch("http://localhost:3000/Student/" + id).then((data) => {
            data.json().then((d) => {
                var temp = "";
                if (d.id != undefined) {
                    temp += "<tr>";
                    temp += "<td>" + d.id + "</td>";
                    temp += "<td>" + d.name + "</td>";
                    temp += "<td>" + d.age + "</td>";
                    temp += "<td>" + d.dept + "</td>";
                    temp += "<td>" + d.dept + "</td></tr>";
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else if (id.length == 0 && name.length != 0 && age.length == 0 && dept.length == 0 &&prov.length ==0) {
        fetch("http://localhost:3000/Student?name" + name).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["name"] + "</td>";
                        temp += "<td>" + d[i]["age"] + "</td>";
                        temp += "<td>" + d[i]["dept"] + "</td>";
                        temp += "<td>" + d[i]["prov"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })

    }
    else if (id.length == 0 && name.length == 0 && age.length != 0 && dept.length == 0 &&prov.length ==0) {
        fetch("http://localhost:3000/Student?age" + age).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["name"] + "</td>";
                        temp += "<td>" + d[i]["age"] + "</td>";
                        temp += "<td>" + d[i]["dept"] + "</td>";
                        temp += "<td>" + d[i]["prov"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else if (id.length == 0 && name.length == 0 && age.length == 0 && dept.length != 0 &&prov.length ==0) {
        fetch("http://localhost:3000/Student?dept" + dept).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["name"] + "</td>";
                        temp += "<td>" + d[i]["age"] + "</td>";
                        temp += "<td>" + d[i]["dept"] + "</td>";
                        temp += "<td>" + d[i]["prov"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else if (id.length == 0 && name.length == 0 && age.length == 0 && dept.length == 0 &&prov.length !=0) {
        fetch("http://localhost:3000/Student?prov" + prov).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["name"] + "</td>";
                        temp += "<td>" + d[i]["age"] + "</td>";
                        temp += "<td>" + d[i]["dept"] + "</td>";
                        temp += "<td>" + d[i]["prov"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else {
        alert("Please make it clear")
    }
}