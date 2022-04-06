const puppeteer = require('puppeteer');


const scrapeame = async () => {
    let title = "titanic"
    const browser = await puppeteer.launch({headless:true});//creamos el navegador
    const page = await browser.newPage();//abrimos el navegador

    await page.goto('https://www.sensacine.com/');//vamos a la direcion web que queremos
    await page.screenshot({ path: "sensacine.jpg" });
    
    await page.type('#header-search-input', `${title}`);
    await page.screenshot({ path: "sensacine.jpg" });


    await browser.close();

}
scrapeame()

module.exports={scrapeame}
