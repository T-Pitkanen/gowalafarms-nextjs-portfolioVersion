import { exit } from 'process';
import dbConnect from '../dbConnect.mjs';
import { 
    dbExists, 
    seedDefaultUser, 
    seedDefaultSubscriber, 
    seedDefaultProduct, 
    seedDefaultSponsor, 
    seedDefaultEmployee, 
    seedDefaultArticle,
    seedDefaultFAQ,
    createDummyOrderWithProductId,
    seedDefaultOrder,
    seedDefaultService
} from './seedhelpers.mjs';
import bcrypt from 'bcryptjs';
import { users, subscribers, products, sponsors, employees, articles, faqs, services } from './seedfile.mjs';


/* 

    SEED

    Dette script er til at seede databasen med dummy data.

*/

await dbConnect();
let exists = await dbExists();

if(exists === undefined)
{
    console.log('----------------------')
    console.log('Opretter Database')

   
    // Seed´er Users
    for (let i = 0; i < users.length; i++) {
        await seedDefaultUser({
            "name" : users[i].name,
            "email" : users[i].email,
            "hashedPassword" : await bcrypt.hash(users[i].password, 10)
        })
    }

    // Products
    let productsList = [];

    for (let i = 0; i < products.length; i++) {
        productsList = await seedDefaultProduct(products[i]);
    }
    console.log('Products seeded : ', products.length, productsList)
    
    let order = createDummyOrderWithProductId(productsList._id)
    let newOrder = await seedDefaultOrder(order);

    // Sponsors
    let sponsorsList = [];

    for (let i = 0; i < sponsors.length; i++) {
        sponsorsList = await seedDefaultSponsor(sponsors[i]);
    }
    console.log('Sponsors seeded : ', sponsors.length, sponsorsList)

    // Employees
    let employeeList = [];

    for (let i = 0; i < employees.length; i++) {
        employeeList = await seedDefaultEmployee(employees[i]);
    }
    console.log('Employees seeded : ', sponsors.length, employeeList)

    // Employees
    let articleList = [];

    for (let i = 0; i < articles.length; i++) {
        articleList = await seedDefaultArticle(articles[i]);
    }
    console.log('Articles seeded : ', articles.length, articleList)

    // Faqs
    let faqList = [];

    for (let i = 0; i < faqs.length; i++) {
        faqList = await seedDefaultFAQ(faqs[i]);
    }

    console.log('Faqs seeded', faqs.length)

    // Services
    let serviceList = [];

    for (let i = 0; i < services.length; i++) {
        serviceList = await seedDefaultService(services[i]);
    }

    console.log('Services seeded', services.length)
    // Subscriber
    let subscriber = await seedDefaultSubscriber(subscribers[0]);
    console.log('Subscriber seeded', subscriber)



} else {

    console.log('----------------------')
    console.log('Database er allerede oprettet')
    console.log('Slet/drop databasen hvis du ønsker at køre seed scriptet igen.')
    console.log('----------------------')

}

exit();