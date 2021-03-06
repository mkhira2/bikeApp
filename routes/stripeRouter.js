const Router = require('express').Router,
  stripeRouter = Router(),
  secret = require('../config/secrets.js').client_secret,
  request = require('request'),
  User = require('../db/schema.js').User,
  stripe = require('stripe')(
    'sk_test_B7TsYERO2od3Zwa9hLagSmUA'
  )

stripeRouter.get('/code', function (req, res) {
  var code = req.query.code
  if (code) {
    var data = {
        code: code,
        client_secret: secret,
        client_id: 'ca_AQrrObbvUvoFW4DZh4CmP3xTgX4tS2vY',
        grant_type: 'authorization_code'
      },
      url = 'https://connect.stripe.com/oauth/token'
    request.post({
      url: url,
      form: data
    }, function (stripeErr, stripeResp, stripeBody) {
      if (stripeErr) {

      } else {
        // findbyIDandUpdate user model (user obj is stored on req.user, which has property ._id)

        let StripeBody = JSON.parse(stripeBody)
        User.findByIdAndUpdate(req.user._id, StripeBody, {new: true}, function (err, record) {
          res.redirect('/#item')
        })
      }
    })
  }
  if (req.query.error) {
    res.json({
      error: req.query.error_description
    })
  }
})
stripeRouter.post('/charge', function (req, res) {
  console.log(req.body)

  var tokenId = req.body.tokenId // Stripe charge token
  var CENTS_PRICE = req.body.price // Stripe price in cents
  var CONNECTED_ID = req.body.stripeUserId// Stripe Connect platform user ID
  var APP_FEE = req.body.myFee /// calculated either as flat fee or percentage of price
  var data = {
    amount: CENTS_PRICE, // amount in cents, again
    currency: 'usd',
    source: tokenId,
    description: 'order',
    application_fee: APP_FEE // Platform fee in cents (2%)
  }
  console.log('##DATA##', data)
  console.log({stripe_account: CONNECTED_ID})
  var charge = stripe.charges.create(data, {stripe_account: CONNECTED_ID},

    function (err, charge) {
      if (err) {
        console.log(err)
        return res.json({
          err: err
        })
      }

      res.json(charge)
    }
  )
})
module.exports = stripeRouter
