const list_items = [];
const list_element = document.getElementById("list");
const pagination_element = document.getElementById('pagination');


const itemsPerPage=30;
let  currentPage=1;

function displayList(items,page) {
    
    list_element.innerHTML="";
    page--;

    let start=itemsPerPage*page;
    let end=start+itemsPerPage
    let paginatedItems=items.slice(start,end)
    console.log(paginatedItems);

    for (let i = 0; i < paginatedItems.length; i++) {
       const item=paginatedItems[i];
       let item_element=document.createElement("div")
       item_element.classList.add("item")
       item_element.innerHTML=`
       <p>Id:${item.id}</P>
       <p>Name: ${item.name}</p>
       <p>Email: ${item.email}</p>`
       list_element.appendChild(item_element)
    }
}


function setupPagination(items) {
    pagination_element.innerHTML = "";

    let pageCount = Math.ceil(items.length / itemsPerPage);

    // Add "First Page" button
    let firstPageButton = document.createElement('button');
    firstPageButton.innerText = 'F';
    firstPageButton.addEventListener('click', function () {
        currentPage = 1;
        displayList(items, currentPage);
    });

    // Add "Previous Page" button
    let previousPageButton = document.createElement('button');
    previousPageButton.innerText = '<';
    previousPageButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayList(items, currentPage);
        }
    });

    // Add page number buttons
    for (let i = 1; i <= pageCount; i++) {
        let button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', function () {
            currentPage = i;
            displayList(items, currentPage);
        });

        pagination_element.appendChild(button);
    }

    // Add "Next Page" button
    let nextPageButton = document.createElement('button');
    nextPageButton.innerText = '>';
    nextPageButton.addEventListener('click', function () {
        if (currentPage < pageCount) {
            currentPage++;
            displayList(items, currentPage);
        }
    });

    // Add "Last Page" button
    let lastPageButton = document.createElement('button');
    lastPageButton.innerText = 'L';
    lastPageButton.addEventListener('click', function () {
        currentPage = pageCount;
        displayList(items, currentPage);
    });

    // Append all buttons to the pagination element
    pagination_element.prepend(previousPageButton);
    pagination_element.prepend(firstPageButton);
    pagination_element.appendChild(nextPageButton);
    pagination_element.appendChild(lastPageButton);
}

// JSON data retrieval and processing
const xhr = new XMLHttpRequest();
const url = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            list_items.push(...data);
            displayList(list_items,  currentPage);
            setupPagination(list_items);
        } else {
            console.log("Error: " + this.status);
        }
    };
};

xhr.open("GET", url, true);
xhr.send();
