'use server';


import dbConnect from "./db/dbConnect.mjs";

import subscriberModel from "./db/models/subscriber.model.mjs";
import productModel from "./db/models/product.model.mjs";

import { products, slides, sponsors, employees } from "./db/seed/seedfile.mjs";
import sponsorModel from "./db/models/sponsor.model.mjs";
import employeeModel from "./db/models/employee.model.mjs";
import articleModel from "./db/models/article.model.mjs";
import faqModel from "./db/models/faq.model.mjs";
import orderModel from "./db/models/order.model.mjs";
import basketModel from "./db/models/basket.model.mjs";
import serviceModel from "./db/models/service.model.mjs";
import contactModel from "./db/models/contact.model.mjs";

/* 

    Products

*/
export const getProducts = async () => {
    
    try {

        await dbConnect();
        let result = await productModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const getProductsByRange = async (range) => {
    
    try {

        await dbConnect();

        range = range.split(',');


        let result = await productModel.find({ '_id': { $in: range } });

        return result

    } catch (error) {

        console.log(error)

    }

};

export const getProduct = async (id) => {
        
    try {

        await dbConnect();
        
        let result = await productModel.findById({_id: id});

        return result

    } catch (error) {

        console.log(error)

    }

}

export const createProduct = async (product) => {

    try {

        await dbConnect();
        let result = await productModel.create(product);
      
        
        return result

    } catch (error) {

        console.log(error)

    }

};

export const updateProduct = async (product) => {

    try {

        await dbConnect();
        let result = await productModel.findByIdAndUpdate(product._id, product);
        
        return result

    } catch (error) {

        console.log(error)

    }

};

export const deleteProduct = async (id) => {

    try {

        await dbConnect();
        let result = await productModel.findByIdAndDelete(id);
        return result;
        
    } catch (error) {

        console.log(error)

    } 
};


/* 

    Slides.

*/
export const getSlides = async () => {
    
    try {

        let result = slides;

        return result

    } catch (error) {

        console.log(error)

    }

};

/* 

    Sponsors.

*/

export const getSponsor = async (id) => {
        
    try {

        await dbConnect();
        let result = await sponsorModel.findById({_id: id});

        return result

    } catch (error) {

        console.log(error)

    }

}

export const getSponsors = async () => {
    
    try {

        await dbConnect();
        let result = await sponsorModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const createSponsor = async (sponsor) => {

    try {

        await dbConnect();
        let result = await sponsorModel.create(sponsor);
      
        
        return result

    } catch (error) {

        console.log(error)

    }

};

export const updateSponsor = async (sponsor) => {

    try {

        await dbConnect();
        let result = await sponsorModel.findByIdAndUpdate(sponsor._id, sponsor);
        
        return result

    } catch (error) {

        console.log(error)

    }

};

export const deleteSponsor = async (id) => {

    try {

        await dbConnect();
        let result = await sponsorModel.findByIdAndDelete(id);
        return result;
        
    } catch (error) {

        console.log(error)

    } 
};


/* 

    Employees/Teams.

*/
export const getEmployees = async () => {
    
    try {
        await dbConnect();
        let result = employeeModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

};


export const getEmployee = async (id) => {
        
    try {

        await dbConnect();
        
        let result = await employeeModel.findById({_id: id});

        return result

    } catch (error) {

        console.log(error)

    }

}

export const createEmployee = async (employee) => {

    try {

        await dbConnect();
        let result = await employeeModel.create(employee);
      
        
        return result

    } catch (error) {

        console.log(error)

    }

};

export const updateEmployee  = async (employee) => {

    try {

        await dbConnect();

        let result = {};
        await employeeModel.findByIdAndUpdate({_id: employee.id}, employee).then((data) => {   
            result = data;

            console.log('HVASSS')
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

export const deleteEmployee = async (id) => {
    
    try {

        await dbConnect();

        let result = {};
        await employeeModel.findByIdAndDelete({_id: id}).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

/*

    Subscribers.

*/
export const getSubscribers = async () => {
    
    try {

        await dbConnect();
        return await subscriberModel.find({});

    } catch (error) {

        console.log(error)

    }

};

export const getSubscriberByEmail = async (email) => {
    
    try {

        await dbConnect();
        let result = await subscriberModel.find({'email': email});

        return result.length === 0 ? {'message' : 'no such user found'} : result[0];

    } catch (error) {

        console.log(error)

    }

};

export const getSubscriberById = async (id) => {
    

    try {

        await dbConnect();
        let result = await subscriberModel.find({'_id': id});
        return result.length === 0 ? {'message' : 'no such user found'} : result[0];

    } catch (error) {

        console.log(error)

    }

};

export const postSubscriber = async (subscriber) => {
    

    try {

        await dbConnect();

        let result = {};
        await subscriberModel.create(subscriber).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

export const deleteSubscriber = async (id) => {
    
    try {

        await dbConnect();

        let result = {};
        await subscriberModel.findByIdAndDelete({_id: id}).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

export const putSubscriber = async (subscriber) => {

    try {

        await dbConnect();

        let result = {};
        await subscriberModel.findByIdAndUpdate({_id: subscriber.id}, subscriber).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

/*


    Services.


*/
export const getArticles = async () => {
    
    try {

        await dbConnect();
        // return await subscriberModel.find({});
        return await articleModel.find({});
        

    } catch (error) {

        console.log(error)

    }

};

/* 

    Faq

*/

export const getFAQS = async () => {
    
    try {
        
        await dbConnect();
        let result = await faqModel.find({});
        
        return result


    } catch (error) {

        console.log(error)

    }

};

export const getFAQ = async (id) => {
    
    try {
        
        await dbConnect();
        let result = await faqModel.findById({_id: id});
        
        return result

    } catch (error) {

        console.log(error)

    }
};

export const createFAQ = async (faq) => {
    
    try {

        await dbConnect();
        let result = await faqModel.create(faq);

        return result

    } catch (error) {

        console.log(error)

    }

};

export const updateFAQ = async (faq) => {
    
    try {

        await dbConnect();
        let result = await faqModel.findByIdAndUpdate(faq.id, faq);
        return result

    } catch (error) {

        console.log(error)

    }

};

export const deleteFAQ = async (id) => {

    try {

        await dbConnect();
        let result = await faqModel.findByIdAndDelete(id);

        return result;
        
    } catch (error) {

        console.log(error)

    } 
};

/*

    Create Basket

*/

export const createBasket = async (basket) => {
    
    try {

        await dbConnect();
        let result = await basketModel.create(basket);

        return result

    } catch (error) {

        console.log(error)

    }

};


export const getBasketByEmail = async (email) => {
    
    try {

        await dbConnect();
        let result = await basketModel.findOne({"email": email});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const updateBasket = async (basket) => {

    try {

        await dbConnect();
        let result = await basketModel.findOneAndUpdate({email: basket.email}, basket);
        return result

    } catch (error) {

        console.log(error)

    }

};


export const deleteBasket = async (email) => {
    
    try {

        await dbConnect();

        let result = {};
        await basketModel.findOneAndDelete({email: email}).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

/* 

    ORDERS

*/

export const getOrders = async () => {
    
    try {

        await dbConnect();
        let result = await orderModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const getOrderById = async (id) => {
    
    try {

        await dbConnect();
        let result = await orderModel.find({_id: id});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const getOrderByEmail = async (email) => {
    
    try {

        await dbConnect();
        let result = await orderModel.find({email: email});

        return result

    } catch (error) {

        console.log(error)

    }

};

export const postOrder = async (order) => {
    
    try {

        await dbConnect();

        let result = {};
        result = await orderModel.create(order);

        return result;
     

    } catch (error) {

        console.log(error)

    }

};

export const putOrder = async (order) => {
    

    try {

        await dbConnect();

        let result = {};
        await orderModel.findByIdAndUpdate({_id: order.id}, order).then((data) => {   
            result = data;
        }).catch((error) => {
            result = false;
        });

        return result;

    } catch (error) {

        console.log(error)

    }

};

export const deleteOrderById = async (id) => {
    
    try {

        await dbConnect();

        let result = {};
        result = await orderModel.findByIdAndDelete({_id: id});

        return result;
     

    } catch (error) {

        console.log(error)

    }

};


export const getServices = async () => {
    try {

        await dbConnect();
        let result = await serviceModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

}

/* 

    Contacts

*/

export const getContacts = async () => {
    try {

        await dbConnect();
        let result = await contactModel.find({});

        return result

    } catch (error) {

        console.log(error)

    }

}


export const createContact = async (contact) => {

    try {

        await dbConnect();

        let result = {};
        result = await contactModel.create(contact);

        return result;
     

    } catch (error) {

        console.log(error)

    }

}

export const deleteContact = async (id) => {

    try {

        await dbConnect();

        let result = {};
        result = await contactModel.findByIdAndDelete({_id: id});

        return result;
     

    } catch (error) {

        console.log(error)

    }

}