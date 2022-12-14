import axios from "axios";

async function getData(section) {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/${section}`
  );

  return response.data;
}

async function getDataById(section, id) {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/${section}/${id}`
  );

  return response.data;
}

async function searchByName(name) {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );

  return response.data;
}

export { getData, getDataById, searchByName };
