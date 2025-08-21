import { test } from '@playwright/test';
import { LoginPage } from '../testingpage/loginPage';
import { logoutPage } from '../testingpage/logoutPage';
import { ItemGroupPage } from '../testingpage/itemGroupPage';
import { ItemSubGroupPage } from '../testingpage/itemSubGroupPage';

test("Full Flow Testing", async ({ page }) => {

    const login = new LoginPage(page);
    const itemgroup = new ItemGroupPage(page);
    const itemsubgroup = new ItemSubGroupPage(page);
    const logout = new logoutPage(page);

    await login.goto();
    await login.loginData('a', 'a');
    await login.loginNavigate();

    await itemgroup.menuClick();
    await itemgroup.gotoSubGroup();

    const itemGroupArray = ["Meat", "Powder", "Sea Foods", "Spices", "Oil", "Grain", "Ice Cream", "Beverage"];
    for (const itemValue of itemGroupArray) {
        await itemgroup.addItemGroup(itemValue);
    }
    /*
    for(let i=0;i<3;i++){
        await itemgroup.deleteItemGroup(i);
    } */
    await itemgroup.deleteItemGroup(3);
    await itemgroup.editItemGroup(3, "Egg Items");

    await itemsubgroup.menuClick();
    await itemsubgroup.gotoSubGroup();
    const itemMasterArray = [
        { value: '7up', group: 'Beverage' },
        { value: 'Chilli', group: 'Spices' },
        { value: 'Fish', group: 'Sea Foods' },
    ]
    for (const item of itemMasterArray) {
        await itemsubgroup.addItemSubGroup(item.value, item.group);
    }

    await logout.accountClick();
    await logout.logoutNavigate();

});