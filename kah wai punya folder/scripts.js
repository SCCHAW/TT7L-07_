function comparePrices() {
    var product1 = document.getElementById('product1').value.trim();
    var price1 = parseFloat(document.getElementById('price1').value);
    var product2 = document.getElementById('product2').value.trim();
    var price2 = parseFloat(document.getElementById('price2').value);
    var comparisonResult = document.getElementById('comparisonResult');

    if (isNaN(price1) || isNaN(price2)) {
        comparisonResult.textContent = 'Please enter valid prices.';
    } else {
        if (price1 < price2) {
            comparisonResult.innerHTML = `<strong>${product1}</strong> is cheaper than <strong>${product2}</strong>.`;
        } else if (price1 > price2) {
            comparisonResult.innerHTML = `<strong>${product2}</strong> is cheaper than <strong>${product1}</strong>.`;
        } else {
            comparisonResult.textContent = 'Both items have the same price.';
        }
    }
}
