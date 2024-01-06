console.log("Hi, Tim");

let knitted;
const baseId = "appJI1Go4n9X5dv1B";
const tableName = "Products";
const apiKey =
  "patDFDzPFpduQiKfS.f35f46dccca26e65e2102e38760f3d5a1ec81a2fee7e07775a4881c6e2705087";

// Airtable API endpoint
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

//select the component wrapper, and the item to be copied
const componentWrap = document.querySelector('[data-attribute="wrap"]');
const componentItem = document.querySelector('[data-attribute="item"]');

// Headers for the Fetch request
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const fetchOptions = {
  method: "GET",
  headers: headers,
};

// Perform the Fetch request
fetch(apiUrl, fetchOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Handle each data item and append to Webflow div
    renderList(data);
    knitted = data;
  })
  .catch((error) => {
    // Handle any errors that occurred during the Fetch request
    console.error("Error fetching data from Airtable:", error);
  });

//filtering functions

//select components
const filterButton = document.querySelector("#search");
const searchInput = document.querySelector("#searchInput");
const radioBag = document.querySelector("#Bag");
const allRadios = document.querySelectorAll('[radio="btn"]');

console.log(allRadios);

allRadios.forEach((radio) => {
  radio.addEventListener("change", radioFilter);
});
//functions
filterButton.addEventListener("click", () => renderList(knitted));
radioBag.addEventListener("change", radioFilter);

//radioFilter
function radioFilter(e) {
  const category = e.target.value;
  if (category === "All") return renderList(knitted);
  const filteredList = [];
  console.log(knitted.records);
  let arr = knitted.records;
  arr.forEach((item) => {
    let tagArr = item.fields.Tags;
    if (tagArr.includes(category)) filteredList.push(item);
    // if (items.fields.Tags.includes("Bag")) console.log("HIT");
  });
  updateList(filteredList);
}

//render list function
function renderList(data) {
  componentWrap.innerHTML = "";
  data.records.forEach((record) => {
    // Assuming 'fields' is the key for the data in each record
    const fields = record.fields;

    // clone the item template that was selected earlier
    const item = componentItem.cloneNode(true);

    //select all components to change
    let image = item.querySelector("[data-element = 'image']");
    let title = item.querySelector("[data-element = 'name']");
    let price = item.querySelector("[data-element = 'price']");
    let productNumber = item.querySelector("[data-element = 'number']");
    let description = item.querySelector("[data-element = 'paragraph']");

    //change them

    image.src = fields.Image;
    title.innerHTML = fields.Item;
    price.innerHTML = `$${fields.Price}`;
    productNumber.innerHTML = fields.ItemNumber;
    description.innerHTML = fields.Description;

    //add the template to the component wrapper
    componentWrap.appendChild(item);
  });
}

function updateList(data) {
  componentWrap.innerHTML = "";
  data.forEach((record) => {
    // Assuming 'fields' is the key for the data in each record
    const fields = record.fields;

    // clone the item template that was selected earlier
    const item = componentItem.cloneNode(true);

    //select all components to change
    let image = item.querySelector("[data-element = 'image']");
    let title = item.querySelector("[data-element = 'name']");
    let price = item.querySelector("[data-element = 'price']");
    let productNumber = item.querySelector("[data-element = 'number']");
    let description = item.querySelector("[data-element = 'paragraph']");

    //change them

    image.src = fields.Image;
    title.innerHTML = fields.Item;
    price.innerHTML = `$${fields.Price}`;
    productNumber.innerHTML = fields.ItemNumber;
    description.innerHTML = fields.Description;

    //add the template to the component wrapper
    componentWrap.appendChild(item);
  });
}
