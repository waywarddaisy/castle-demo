
const createMenuButtons = (item)=>{
    let menuContainer = document.getElementById('menu-container');
    let menuLink =document.createElement('a');
    menuLink.className = `page-menu-button ${item.ClassList}`;
    menuLink.href = item.Endpoint;
    menuLink.innerHTML=item.DisplayValue;
    menuContainer.appendChild(menuLink);
};

const createMenu = (data)=> {
    let menuArray=data.PageMenu;
    console.log(menuArray);
    menuArray.forEach(item => {
        createMenuButtons(item)
    } );
};

const createRightPanel =()=> {
    let rightPanel= document.getElementById('right-panel');
    let rightRow=document.createElement('div');
    rightRow.id = "right-panel-row";
    rightPanel.appendChild(rightRow);
    let rightImgDiv=document.createElement('div');
    rightImgDiv.id = 'right-image-div';
    rightPanel.appendChild(rightImgDiv);
    let rightCartonsDiv= document.createElement('div');
    rightCartonsDiv.id= "cartons";
    rightPanel.appendChild(rightCartonsDiv);
    let rightParentProducts = document.createElement('div');
    rightParentProducts.className="Parent Products";
    rightPanel.appendChild(rightParentProducts);
};

const populateRightPanel =(data)=> {
    createRightPanel();
    //row
    let rightPanelData = data.InventoryTags;

    rightPanelData.forEach(item => {
        let button =document.createElement('button');
        button.type= "button";
        button.innerHTML = item.DisplayValue;
        button.className = "right-panel-row";
        let rightRow= document.getElementById('right-panel-row');
        rightRow.appendChild(button);

    });
    //image
    let rightImgDiv = document.getElementById('right-image-div');
    rightImgDiv.style.backgroundColor="blue";
    let rightImg = document.createElement('img');
    let imgValue = data.PageTabs.find(item => item.DisplayValue==='Diagrams');
    rightImg.href =imgValue.Endpoint;
    rightImgDiv.appendChild(rightImg);
    //other info

};

const createBottomTabs =(data)=>{
    let bottomTabs = document.getElementById('bottom-tabs');
    data.PageTabs.forEach(item => {
        let newTab = document.createElement('a');
        newTab.innerHTML = item.DisplayValue;
        newTab.href = item.Endpoint;
        newTab.className = item.ClassList;
        bottomTabs.appendChild(newTab);
    })

};

const createProductHeader =(data)=>{
let productName= document.getElementById("product-title");
productName.innerHTML=data.Title;
let productSubtitle = document.getElementById("subtitle");
productSubtitle.innerHTML=data.SubTitle;
let productNav =document.getElementById('product-nav');
let productNavUl =document.createElement('ul');
productNav.appendChild(productNavUl);
let pageLinks =data.PageLinks;
pageLinks.forEach(link =>{
    let productNavLi = document.createElement('li');
    let prodNavLink =document.createElement('a');
    prodNavLink.href=link.Endpoint;
    productNavLi.appendChild(prodNavLink);
    prodNavLink.innerHTML =link.DisplayValue;
    productNavUl.appendChild(productNavLi);
});

};

const createProductInfo =(data)=>{
    let prodInfoDiv = document.getElementById('product-info');
    let prodInfoArray = data.Record;
    prodInfoArray.forEach(record => {
        let infoContainer = document.createElement('div');
        infoContainer.className ="info-group";
        let key = document.createElement('div');
        key.className='info-key';
        key.innerHTML= record.Label;
        infoContainer.appendChild(key);
        let value =document.createElement('div');
        value.className='info-value';
        value.innerHTML=record.DisplayValue;
        infoContainer.appendChild(value);
        prodInfoDiv.appendChild(infoContainer);
    })
};


const populatePage =()=>{
    const getJSON = async ()=> {
        try {
            const response = await fetch('./castle.demo.json');
            const data = await response.json();
            console.log(data);
            console.log(data.Title);
            createMenu(data);
            createProductHeader(data);
            createProductInfo(data);
            populateRightPanel(data);
            createBottomTabs(data);
        } catch (err) {console.log('error', err)};   
        
    };
getJSON();
};

populatePage();