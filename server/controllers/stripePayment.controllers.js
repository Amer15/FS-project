const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');


exports.makePayment = ( req, res) => {
   const {totalPrice, token} = req.body;
//    console.log('PRICE: ' + totalPrice);
//    console.log('TOKEN: ' + token);

   //This key helps in not charging a customer double times because of any network issues etc
   const idempotencyKey = uuid();

   //Create customer with the token coming from frontend
   return stripe.customers.create({
       email: token.email,
       source: token.id
   })
   .then( customer => {
       //Charge now if customer is created
       stripe.charges.create({
        amount: totalPrice * 100,
        currency: 'inr',
        customer: customer.id,
        description: 'a test account',
        receipt_email: token.email,
        shipping:{
            name: token.card.name,
            address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.city,
                country: token.card.country
            }
        }
       }, {idempotencyKey})
       .then( response =>{
        //    console.log(response);
        //    console.log(response.data)
          return res.status(200).send(response);
       })
       .catch( err => console.log(err))
   })

}