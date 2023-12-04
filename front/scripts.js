/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pacientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      data.pacientes.forEach(item => insertList(item.name,
        item.age,
        item.anaemia,
        item.creatinine_phosphokinase,
        item.diabetes,
        item.ejection_fraction,
        item.high_blood_pressure,
        item.platelets,
        item.sex,
        item.serum_creatinine,
        item.serum_sodium,
        item.smoking,
        item.time,
        item.outcome
      ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()




/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputAge, inputAnaemia,
  inputCrPh, inputdiabetes, inputEjFr,
  inputHBPr, inputPlatelets, inputSex,
  inputSCre, inputSSod, inputSmoking, inputTime, callback) => {

  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('age', inputAge);
  formData.append('anaemia', inputAnaemia);
  formData.append('creatinine_phosphokinase', inputCrPh);
  formData.append('diabetes', inputdiabetes);
  formData.append('ejection_fraction', inputEjFr);
  formData.append('high_blood_pressure', inputHBPr);
  formData.append('platelets', inputPlatelets);
  formData.append('sex', inputSex);
  formData.append('serum_creatinine', inputSCre);
  formData.append('serum_sodium', inputSSod);
  formData.append('smoking', inputSmoking);
  formData.append('time', inputTime);

  let url = 'http://127.0.0.1:5000/paciente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data.outcome);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/paciente?name=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/

// const postItem = async (inputName, inputAge, inputAnaemia,
//   inputCrPh, inputdiabetes, inputEjFr, 
//   inputHBPr, inputPlatelets, inputSCre,
//   inputSSod, inputSmoking, inputTime) => {

const newItem = async () => {
  let inputName = document.getElementById("newName").value;
  let inputAge = document.getElementById("newAge").value;
  let inputAnaemia = document.getElementById("newAnaemia").value;
  let inputCrPh = document.getElementById("newCrPh").value;
  let inputDiabetes = document.getElementById("newDiabetes").value;
  let inputEjFr = document.getElementById("newEjFr").value;
  let inputHBPr = document.getElementById("newHBPr").value;
  let inputPlatelets = document.getElementById("newPlatelets").value;
  let inputSex = document.getElementById("newSex").value;
  let inputSCre = document.getElementById("newSCre").value;
  let inputSSod = document.getElementById("newSSod").value;
  let inputSmoking = document.getElementById("newSmoking").value;
  let inputTime = document.getElementById("newTime").value;

  // Verifique se o nome do produto já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/pacientes?nome=${inputName}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.pacientes && data.pacientes.some(item => item.name === inputName)) {
        alert("O paciente já está cadastrado.\nCadastre o paciente com um nome diferente ou atualize o existente.");
      } else if (inputName === '') {
        alert("O nome do paciente não pode ser vazio!");
      } else if (isNaN(inputAge) || isNaN(inputAnaemia) || isNaN(inputCrPh) || isNaN(inputDiabetes) || isNaN(inputEjFr) || isNaN(inputHBPr) || isNaN(inputPlatelets) || isNaN(inputSCre) || isNaN(inputSSod) || isNaN(inputSmoking) || isNaN(inputTime)) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        var inputOutcome = null;

        postItem(inputName, inputAge, inputAnaemia, inputCrPh,
          inputDiabetes, inputEjFr, inputHBPr, inputPlatelets,
          inputSex, inputSCre, inputSSod, inputSmoking, inputTime,
          (outcome) => {

            inputOutcome = outcome;

            insertList(inputName, inputAge, inputAnaemia, inputCrPh, inputDiabetes, inputEjFr, inputHBPr, inputPlatelets, inputSex, inputSCre, inputSSod, inputSmoking, inputTime, inputOutcome);
            alert("Item adicionado!");

          });

      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, age, anaemia, creatinine_phosphokinase, diabetes, ejection_fraction, high_blood_pressure, platelets, sex, serum_creatinine, serum_sodium, smoking, time, outcome) => {
  var item = [name, age, anaemia, creatinine_phosphokinase, diabetes, ejection_fraction, high_blood_pressure, platelets, sex, serum_creatinine, serum_sodium, smoking, time, outcome];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    var valor = item[i] 

    // Condições para converter valores binários em strings
    var anemiaString       = valor === 1 ? "Sim" : "Não";
    var diabetesString     = valor === 1 ? "Sim" : "Não";
    var hypertensionString = valor === 1 ? "Sim" : "Não";
    var genderString       = valor === 1 ? "Masculino" : "Feminino";
    var smokingString      = valor === 1 ? "Sim" : "Não";
    var outcomeString      = valor === 1 ? "Sim" : "Não";

    // Verifica o índice e atribui a string correspondente
    switch (i) {
      case 2:
        valor = anemiaString;
        break;
      case 4:
        valor = diabetesString;
        break;
      case 6:
        valor = hypertensionString;
        break;
      case 8:
        valor = genderString;
        break;
      case 11:
        valor = smokingString;
        break;
      case 13:
        valor = outcomeString;
        break;
      default:
        break;
    }

    cell.textContent = valor;
    //console.log("Linhas: [" + i + "]" + item[i])
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  document.getElementById("newName").value = "";
  document.getElementById("newAge").value = "";
  document.getElementById("newAnaemia").value = "0";
  document.getElementById("newCrPh").value = "";
  document.getElementById("newDiabetes").value = "0";
  document.getElementById("newEjFr").value = "";
  document.getElementById("newHBPr").value = "0";
  document.getElementById("newPlatelets").value = "";
  document.getElementById("newSex").value = "1"
  document.getElementById("newSCre").value = "";
  document.getElementById("newSSod").value = "";
  document.getElementById("newSmoking").value = "0";
  document.getElementById("newTime").value = "";

  removeElement();
}