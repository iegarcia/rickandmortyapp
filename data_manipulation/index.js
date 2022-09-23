const fs = require("fs");

const rutaJson1 = "./in/Json1.json";
const rutaJson2 = "./in/Json2.json";

const jsonFile1 = JSON.parse(fs.readFileSync(rutaJson1, "utf-8"));
const jsonFile2 = JSON.parse(fs.readFileSync(rutaJson2, "utf-8"));

const content1 = jsonFile1.data;
const content2 = jsonFile2.data;

const getPatientKey = (info) => {
  const keys = Object.keys(info);
  return keys[0];
};

const validateData = (e, paciente, id) => {
  return e[id] === paciente[id] && e.fecha === paciente.fecha;
};

const removeExistingData = (c1, c2) => {
  for (let i = 0; i < c1.length; i++) {
    let paciente = c1[i].data;
    let id = getPatientKey(paciente);
    let found = c2.find((e) => validateData(e, paciente, id));
    if (found) c2.splice(c2.indexOf(found), 1);
  }

  return c2;
};

const newData = {
  data: removeExistingData(content1, content2),
};

// Opte crear uno nuevo y dejar el original a modo de bkp por si las dudas.
// Nunca se es demasiado precavido...
fs.writeFileSync("./out/nuevoJson1.json", JSON.stringify(newData));
