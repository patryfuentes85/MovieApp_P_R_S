const puppeteer = require('puppeteer');


const scrapeamedesensacine = async (title) => {
    const browser = await puppeteer.launch({ headless: true });//creamos el navegador
    const page = await browser.newPage();//abrimos el navegador
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.sensacine.com/');//vamos a la direcion web que queremos
    //await page.click('#didomi-notice-agree-button');//aceptar las coockies
    await page.type('#header-search-input', title);//cogemos el selector del input y esribimos titanic||titulo
    await page.click('.header-search-form-container button');//hacemos click en el buscador
    await page.waitForSelector('.gd-col-left .movies-results .mdl');
    await page.click('.thumbnail ');
    await page.waitForSelector('.third-nav');
    await page.click('a[title="Críticas de usuarios"]');
    await page.waitForTimeout(2000)
    
    const criticas = await page.evaluate(() => {
        let elements = document.querySelectorAll('.section >.review-card');
        let elementsArray = Array.from(elements);
        
        let reviews = [];
        for (let i = 0; i <elementsArray.length; i++) {
            let author  = document.querySelectorAll('div.review-card-aside > div > div > .meta-title')[i].innerText
            let comment = document.querySelectorAll('div.review-card-review-holder > div.content-txt.review-card-content')[i].innerText;
            
            if (author != undefined && comment != undefined) {
                reviews.push( {
                    'author': author,
                    'comment': comment
                })
            }
            
        }
        return reviews;
    })
    
    // console.log(criticas);
   
    await browser.close();
    return criticas
    // return reviews;
}
// scrapeamedesensacine("hulk");
module.exports={scrapeamedesensacine}
