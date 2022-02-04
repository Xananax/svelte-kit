# Payments

Payments are made through [Stripe](https://stripe.com/).

Two packages are needed:

- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) loads the stripe API _in the browser_.
- [stripe](https://www.npmjs.com/package/stripe) is a wrapper around the _server-side stripe API_

Documentation is found at: https://stripe.com/docs/development/quickstart

You will need both the `public key` and `secret key` found on your [dashboard](https://dashboard.stripe.com/test/dashboard) after you sign up/in.


## Products Handling

Products have to exist on Stripe before they can be used.

A build script is provided for that reason. Run:

```sh
npm run build:products -- -h
```

For an overview. In most cases, you can just run the script only with the `fresh` flag (to delete previously saved products on disk), but you might want to run it as a simulation (dry run)