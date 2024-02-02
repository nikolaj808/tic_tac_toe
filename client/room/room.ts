import "../style.css";

console.log(location);
console.log(location.search);

const params = new URLSearchParams(location.search);

console.log(params);

console.log(params.get("name"));
