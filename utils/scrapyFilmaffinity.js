const puppeteer = require('puppeteer');

const scrapeamedefilmaffinity = async (title) => {
    const browser = await puppeteer.launch({ headless: true });//creamos el navegador
    const page = await browser.newPage();//abrimos el navegador
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.filmaffinity.com/es/main.html');//vamos a la direcion web que queremos
    await page.click('.css-v43ltw');//aceptar las coockies
    await page.type('#top-search-input', title);//cogemos el selector del input y esribimos titanic||titulo
    await page.click('#button-search');//hacemos click en el buscador
    await page.waitForSelector('#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-poster');
    await page.click('#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-poster > a > img ');
    await page.waitForSelector('.ntabs');
    const criticas = await page.evaluate(() => {
        let elements = document.querySelectorAll('#pro-reviews > li');
        let elementsArray = Array.from(elements);
        
        let reviews = [];
        for (let i = 0; i < 3; i++) {
            let author  = document.querySelectorAll('#pro-reviews > li > div > div.pro-crit-med')[i].innerText
            let comment =document.querySelectorAll('#pro-reviews > li > div  div[itemprop="reviewBody"]')[1].innerText
            
            if (author != undefined && comment != undefined) {
                reviews.push( {
                    'author': author,
                    'comment': comment
                })
            }
            
        }
        
        return reviews;
    })
    //  console.log(criticas);
    await browser.close();
    return criticas
}

// scrapeamedefilmaffinity("titanic")

module.exports = { scrapeamedefilmaffinity };