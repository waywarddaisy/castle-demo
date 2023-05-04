//helper function for iterating through classes
let getClassList =(item)=>{
    let thisClass = '';
    item.ClassList.forEach(nameClass => {thisClass+=`${nameClass} `});
    return thisClass;
};

const createMenuButtons = (item) => {
    let menuContainer = document.getElementById('menu-container');
    let menuLink = document.createElement('a');
    menuLink.className = `page-menu-button ${getClassList(item)}`;
    menuLink.href = item.Endpoint;
    menuLink.innerHTML = item.DisplayValue;
    menuContainer.appendChild(menuLink);
};

const createMenu = (data) => {
    let menuArray = data.PageMenu;
    console.log(menuArray);
    menuArray.forEach(item => {
        createMenuButtons(item)
    });
};

const createRightPanel = () => {
    let rightPanel = document.getElementById('right-panel');
    //Top row div
    let rightRow = document.createElement('div');
    rightRow.id = "right-panel-row";
    rightPanel.appendChild(rightRow);

    //Pricing Div
    let rightPricing = document.createElement('div');
    rightPricing.className = "right-pricing";
    rightPanel.appendChild(rightPricing);

    //NSO/RPL Pricing
    let nsoRPL = document.createElement('div');
    nsoRPL.className = "pricing";
    nsoRPL.id = "nso-rpl";
    rightPricing.appendChild(nsoRPL);

    //sjp pricing
    let sjp = document.createElement('div');
    sjp.className = "pricing";
    sjp.id = "spj";
    rightPricing.appendChild(sjp);

    //diagram div 
    let rightImgDiv = document.createElement('div');
    rightImgDiv.id = 'right-image-div';
    rightPanel.appendChild(rightImgDiv);

    //cartons
    let rightCartonsDiv = document.createElement('div');
    rightCartonsDiv.id = "cartons";
    rightPanel.appendChild(rightCartonsDiv);

    //parent products
    let rightParentProducts = document.createElement('div');
    rightParentProducts.id = "parent-products";
    rightPanel.appendChild(rightParentProducts);
};

const populateRightPanel = (data) => {
    createRightPanel();
    //row
    let rightPanelData = data.InventoryTags;

    rightPanelData.forEach(item => {
        let button = document.createElement('button');
        button.type = "button";
        button.innerHTML = item.DisplayValue;
        button.className = `right-panel-row ${item.ClassList}`;
        let rightRow = document.getElementById('right-panel-row');
        rightRow.appendChild(button);

    });

    //NSO/RPL Pricing

    let NSO = document.getElementById('nso-rpl');
    let nsoHeader = document.createElement('h4');
    nsoHeader.innerHTML = "NSO/RPL Pricing:";
    NSO.appendChild(nsoHeader);
    data.NsoPricingTags.forEach(item => {
        let button = document.createElement('button');
        button.innerHTML = item.DisplayValue;
        button.type = "button";
        button.className = `pricing-button ${getClassList(item)}`;
        NSO.appendChild(button)
    });

    //SPJ Pricing
    let SPJ = document.getElementById('spj');
    let spjHeader = document.createElement('h4');
    spjHeader.innerHTML = "SPJ Pricing:";
    SPJ.appendChild(spjHeader);
    data.SpjPricingTags.forEach(item => {
        let button = document.createElement('button');
        button.innerHTML = item.DisplayValue;
        button.type = "button";
        button.className = `pricing-button ${getClassList(item)}`;
        SPJ.appendChild(button);
    });

    //diagram
    let rightImgDiv = document.getElementById('right-image-div');
    let rightImg = document.createElement('img');
    let imgValue = data.PageTabs.find(item => item.DisplayValue === 'Diagrams');
    rightImg.href = imgValue.Endpoint;
    rightImgDiv.appendChild(rightImg);

    //Cartons
    let cartonsDiv = document.getElementById('cartons');
    let cartonsHeader = document.createElement('h4');
    cartonsHeader.innerHTML = "Cartons";
    cartonsDiv.appendChild(cartonsHeader);
    let line = document.createElement('hr');
    cartonsDiv.appendChild(line);
    data.Cartons.forEach(item=> {
        let section = document.createElement('div');
        section.className = "right-cartons-parent-section";
        let key = document.createElement('p');
        key.className = "key";
        key.innerHTML = item.Description;
        section.appendChild(key);
        let value = document.createElement('p');
        value.className = "value";
        value.innerHTML = item.Weight;
        section.appendChild(value); 
        cartonsDiv.appendChild(section);
    });

    //Parent Products

    let parentProductsDiv = document.getElementById('parent-products');
    let pProductsHeader = document.createElement('h4');
    pProductsHeader.innerHTML = "Parent Products";
    parentProductsDiv.appendChild(pProductsHeader);
    let lineTwo = document.createElement('hr');
    parentProductsDiv.appendChild(lineTwo);
    data.ParentProducts.forEach(item=> {
        let section = document.createElement('div');
        section.className = "right-cartons-parent-section";
        let key = document.createElement('p');
        key.className = "key";
        key.innerHTML = item.Description;
        section.appendChild(key);
        let value = document.createElement('p');
        value.className = "value";
        value.innerHTML = item.Weight;
        section.appendChild(value); 
        parentProductsDiv.appendChild(section);
    });

};

const createBottomTabs = (data) => {
    let bottomTabs = document.getElementById('bottom-tabs');
    data.PageTabs.forEach(item => {
        let newTab = document.createElement('a');
        newTab.innerHTML = item.DisplayValue;
        newTab.href = item.Endpoint;
        newTab.className = item.ClassList;
        bottomTabs.appendChild(newTab);
    })

};

const createProductHeader = (data) => {
    let productName = document.getElementById("product-title");
    productName.innerHTML = data.Title;
    let productSubtitle = document.getElementById("subtitle");
    productSubtitle.innerHTML = data.SubTitle;
    let productNav = document.getElementById('product-nav');
    let productNavUl = document.createElement('ul');
    productNav.appendChild(productNavUl);
    let pageLinks = data.PageLinks;
    pageLinks.forEach(link => {
        let productNavLi = document.createElement('li');
        let prodNavLink = document.createElement('a');
        prodNavLink.href = link.Endpoint;
        productNavLi.appendChild(prodNavLink);
        prodNavLink.innerHTML = link.DisplayValue;
        productNavUl.appendChild(productNavLi);
    });

};

const createProductInfo = (data) => {
    let prodInfoDiv = document.getElementById('product-info');
    let prodInfoArray = data.Record;
    prodInfoArray.forEach(record => {
        let infoContainer = document.createElement('div');
        infoContainer.className = "info-group";
        let key = document.createElement('div');
        key.className = 'info-key';
        key.innerHTML = record.Label;
        infoContainer.appendChild(key);
        let value = document.createElement('div');
        value.className = 'info-value';
        value.innerHTML = record.DisplayValue;
        infoContainer.appendChild(value);
        prodInfoDiv.appendChild(infoContainer);
    })
};


const populatePage = () => {
    const getJSON = async () => {
        try {
            const response = await fetch('./castle.demo.json');
            const data = await response.json();
            createMenu(data);
            createProductHeader(data);
            createProductInfo(data);
            populateRightPanel(data);
            createBottomTabs(data);
        } catch (err) { console.log('error', err) };

    };
    getJSON();
};

populatePage();