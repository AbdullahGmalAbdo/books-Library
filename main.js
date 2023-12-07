let title = document.querySelector('.title');
let price = document.querySelector('.Price');
let taxies = document.querySelector('.taxies');
let Ads = document.querySelector('.Ads');
let discount = document.querySelector('.discount');
let totl = document.querySelector('.total');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let create = document.querySelector('.create');
let Search = document.getElementById('Search');
let SearchFlag = 'Title';
let flag = 1;
let temp;
function getTotal() {
	let res = +price.value + +taxies.value + +Ads.value - discount.value;
	if (price.value != '') {
		totl.innerHTML = res;
		totl.style.background = '#09c';
	} else {
		totl.innerHTML = '';
		totl.style.background = '';
	}
}
let libirary;
if (localStorage.products != null) {
	libirary = JSON.parse(localStorage.products);
} else {
	libirary = [];
}

create.onclick = function() {
	let boooks = {
		title: title.value,
		price: price.value,
		taxies: taxies.value,
		Ads: Ads.value,
		discount: discount.value,
		totl: totl.innerHTML,
		count: count.value,
		category: category.value
	};
	if (flag == 1) {
		if (boooks.count > 1) {
			for (let i = 0; i < boooks.count; i++) {
				libirary.push(boooks);
			}
		} else {
			libirary.push(boooks);
		}
	} else {
		libirary[temp] = boooks;
		flag = 1;
		create.innerHTML = 'create';
		count.style.display = 'block';
	}

	localStorage.setItem('products', JSON.stringify(libirary));
	clear();
	showBooks();
};
function clear() {
	title.value = '';
	price.value = '';
	taxies.value = '';
	Ads.value = '';
	discount.value = '';
	totl.innerHTML = 'Total ';
	totl.style.background = 'black';
	count.value = '';
	category.value = '';
}

function showBooks() {
	let table = '';
	for (let i = 0; i < libirary.length; i++) {
		table += `
    <tr>
          <td>${libirary[i].title}</td>
          <td>${libirary[i].price}</td>
          <td>${libirary[i].taxies}</td>
          <td>${libirary[i].Ads}</td>
          <td>${libirary[i].discount}</td>
          <td>${libirary[i].category}</td>
          <td>${libirary[i].totl}</td>
          <td> <i class="fa-sharp fa-solid fa-trash" onclick=delBook(${i})> </i></td>
          <td><i class="fa-sharp fa-solid fa-pen-to-square" onclick=update(${i}) ></i></i></td>
    </tr>
    
    `;
	}
	document.getElementById('tbody').innerHTML = table;
	let deleteAllBooks = document.getElementById('deletAllBooks');
	if (libirary.length > 0) {
		deleteAllBooks.innerHTML = ` 
    <button id="del" onclick=delAllBook()> Delet All Books ${libirary.length} </button>
    `;
	} else {
		deleteAllBooks.innerHTML = ` `;
	}
}
showBooks();
function delBook(i) {
	libirary.splice(i, 1);
	localStorage.products = JSON.stringify(libirary);
	showBooks();
}
function delAllBook() {
	localStorage.clear();
	libirary.splice(0);
	showBooks();
}
function update(i) {
	title.value = libirary[i].title;
	price.value = libirary[i].price;
	taxies.value = libirary[i].taxies;
	category.value = libirary[i].category;
	Ads.value = libirary[i].Ads;
	discount.value = libirary[i].discount;
	totl.innerHTML = libirary[i].totl;
	count.style.display = 'none';
	flag = 0;
	create.innerHTML = 'Update';
	temp = i;
	scroll({
		top: 0,
		behavior: 'smooth'
	});
}

function search(id) {
	if (id == 'searchByTitle') {
		SearchFlag = 'Title';
	} else {
		SearchFlag = 'prise';
	}
	Search.placeholder = 'Search By ' + SearchFlag;
	Search.focus();
}

function searchBook(value) {
	var table = '';
	if (SearchFlag == 'Title') {
		for (let i = 0; i < libirary.length; i++) {
			if (libirary[i].title.includes(value)) {
				table += `
          <tr>
                <td>${libirary[i].title}</td>
                <td>${libirary[i].price}</td>
                <td>${libirary[i].taxies}</td>
                <td>${libirary[i].Ads}</td>
                <td>${libirary[i].discount}</td>
                <td>${libirary[i].category}</td>
                <td>${libirary[i].totl}</td>
                <td> <i class="fa-sharp fa-solid fa-trash" onclick=delBook(${i})> </i></td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square" onclick=update(${i}) ></i></i></td>
          </tr>
          
          `;
			}
		}
	} else {
		for (let i = 0; i < libirary.length; i++) {
			if (libirary[i].price.includes(value)) {
				table += `
          <tr>
                <td>${libirary[i].title}</td>
                <td>${libirary[i].price}</td>
                <td>${libirary[i].taxies}</td>
                <td>${libirary[i].Ads}</td>
                <td>${libirary[i].discount}</td>
                <td>${libirary[i].category}</td>
                <td>${libirary[i].totl}</td>
                <td> <i class="fa-sharp fa-solid fa-trash" onclick=delBook(${i})> </i></td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square" onclick=update(${i}) ></i></i></td>
          </tr>
          
          `;
			}
		}
	}
	document.getElementById('tbody').innerHTML = table;
}
