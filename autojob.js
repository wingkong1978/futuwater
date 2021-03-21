const puppeteer = require('puppeteer');

(()=>puppeteer.launch(
    {
        headless: false
    }
).then(async browser => {
    let args = process.argv

    console.log('args---->', args)

    let accname = args[2]
    let pwd = args[3]

    if(!accname || !pwd || 0 >= accname.length || 0>=pwd.length){
        console.log('please run the script by "node autojob.js <accname> <pwd>"')
        await browser.close()
       return
    }

    const page = await browser.newPage();
    // await page.goto('https://seed.futunn.com/');
    await page.goto('https://passport.futunn.com/?target=https%3A%2F%2Fseed.futunn.com%2F#login');
    // 其他操作...

    const ACCSELECTOR = '#loginFormWrapper > form > ul > li.ui-input-wrapper.ui-content-email > input'

    const accElement = await page.$(ACCSELECTOR)
    await accElement.type(accname, {delay: 100})

    const PWDSELECTOR = '#loginFormWrapper > form > ul > li:nth-child(3) > input'

    const pwdElement = await page.$(PWDSELECTOR)

    await pwdElement.type(pwd, {delay: 100})

    const LOGINBTNSELECTOR = '#loginFormWrapper > form > input.ui-submit.ui-form-submit'

    const btnElement = await page.$(LOGINBTNSELECTOR)

    await btnElement.click()

    const WATER_SELECTOR = 'body > div.seedWrap01 > div > div.animationQh01 > div.mainContent > div.opBtnBox > div'

    await page.waitFor(2000)
    // const response = await page.waitForNavigation()
    try{
        const response = await page.waitForSelector(WATER_SELECTOR)
    }catch (e) {
       throw (e)
    }

    // const [response2] = await Promise.all([
    //     page.waitForNavigation(),
    const result = await    page.click(WATER_SELECTOR )
    console.log('done water myself')
    // ]);

     // console.log('waterElement--->',  result)

    const INTERACTSELCTOR = 'body > div.seedWrap01 > div > div.commsendFootBtnBar > ul > li:nth-child(3) > a'

    await page.waitFor(1000)

    const result2 = await page.click(INTERACTSELCTOR)


    const FILTERSELECTOR = '#friendListContainer > div.friend-filter > div'

    await page.waitFor(1000)
    await page.waitForSelector(FILTERSELECTOR)

    const MORESELECTOR = '#friendListContainer > a'
    const LISTSELECTOR = '#friendListContainer'
    await page.click(FILTERSELECTOR)

    await page.waitFor(1000)
     await page.waitForSelector(FILTERSELECTOR)

    try {
        await page.click(MORESELECTOR)

    }catch (e) {
      console.log('more error--->',e)

    }
    await page.waitFor(1000)
    await page.waitForSelector(LISTSELECTOR)

    try {
        await page.click(MORESELECTOR)

    }catch (e) {
        console.log('more error--->',e)

    }


    await page.waitFor(1000)
    await page.waitForSelector(LISTSELECTOR)


    let seq  =0

    const LISTLISELECTOR = '#friendListContainer > ol > li'
    let listElementList = await page.$$(LISTLISELECTOR)
    while(seq < listElementList.length){

    for(listElement of listElementList){
        try{

            await page.waitFor(1000)
            await page.waitForSelector(LISTSELECTOR)
        let listElementObj = await listElement.$('i.can_fert.icon_friends-fert')
        // console.log('listElement Obj--->', listElementObj)
            await listElementObj.click()

            await page.waitFor(1000)
            await page.waitForSelector('body > div.fertMainArea')


            const PACKAGESELECTOR = 'body > div.fertMainArea > div:nth-child(4) > div'
            await page.click(PACKAGESELECTOR)


           await page.waitFor(1000)

            const GOBACKSELECTOR = 'body > a'

            await page.click(GOBACKSELECTOR)

            console.log('done water one', seq)
            await page.waitFor(1000)
            await page.waitForSelector(FILTERSELECTOR)
            // await page.click(FILTERSELECTOR)

            // await page.waitFor(1000)
            // await page.waitForSelector(FILTERSELECTOR)

            listElementList = await page.$$(LISTLISELECTOR)
            seq=0
            break
        }catch (e) {
            console.log('listElement Obj-error-->', e, seq)
            seq++
        }
    }
    }


    // await page.click('#waterCanvas')
    // const waterElement = await page.$eval(WATER_SELECTOR, node=>node.innerHTML)
    // const waterElement = await page.$(WATER_SELECTOR )
    // console.log('waterElement--->',  waterElement)
    //
    // await waterElement.click()

    await browser.close();
}).catch((ee)=>{
    try {
        browser.close()
    } catch (e) {

    }
}
).finally(()=>{
    try {
        browser.close()
    } catch (eee) {

    }
}))()

