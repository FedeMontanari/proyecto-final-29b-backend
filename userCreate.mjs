import fetch from "node-fetch";
import fs from "fs";

const occupations = [
  "Informatica",
  "Mascotas",
  "Entrenamiento",
  "Construccion",
  "Legal",
  "Jardineria",
  "Mecanica",
  "Electronica",
  "Electricidad",
  "Plomeria",
  "Carpinteria",
  "Herreria",
  "Mensajeria",
  "Cuidador/a",
  "Educacion",
  "Salud",
  "Belleza",
  "Cerrajeria",
  "Limpieza",
  "Seguridad",
  "Pintura",
  "Mudanza",
  "Refrigeracion",
];

const isProfessional = [true, false];

function random(max) {
  return Math.floor(Math.random() * max);
}

let result = [];

let i = 0;

async function callUsers() {
  while (i < 100) {
    let randomOccupation = random(22);
    let randomProf = random(2);
    await fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        let user = {
          fullName:
            data.results[0].name.first + " " + data.results[0].name.last,
          phoneNumber: data.results[0].cell,
          email: data.results[0].email,
          occupation: [occupations[randomOccupation]],
          address:
            data.results[0].location.street.name +
            " " +
            data.results[0].location.street.number,
          password: data.results[0].login.password,
          image: data.results[0].picture.large,
          description: data.results[0].location.timezone.description,
          birthday: data.results[0].dob.date,
          isProfessional: isProfessional[randomProf],
        };
        result = [...result, user];
      });
    i++;
  }
  fs.writeFile("userOutput.txt", JSON.stringify(result), (err) => {
    console.log(err);
  });
}

callUsers();
