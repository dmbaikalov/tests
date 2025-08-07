import { PageHolder } from "./abstract.classes";
import { CartPage } from "./cart.page";
import { CheckoutPage } from "./checkout.page";
import { LoginPage } from "./login.page";
import { ProductsPage } from "./products.page";
import { FooterPage } from "./footer.page";


export class Application extends PageHolder {
    public cart = new CartPage(this.page);
    public checkout = new CheckoutPage(this.page);
    public login = new LoginPage(this.page);
    public products = new ProductsPage(this.page);
    public footer = new FooterPage(this.page)
}
