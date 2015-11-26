# Prism
[![Circle CI](https://circleci.com/gh/ksespinola/prism/tree/develop.svg?style=svg&circle-token=71d24ca9a009fb6f020a171db03119cd94ada988)](https://circleci.com/gh/ksespinola/prism/tree/master)

Prism provides business owners with an ultra high performant and flexible web/mobile application without a team of developers.

## Features
- Secure user management with role permissions
- Create custom page templates for any route you choose
- Modern design inspired by [Material Design](https://www.google.com/design/spec/material-design/introduction.html)
- Dynamically generate custom collections (comming soon)
- E-commerce support using [Stripe](https://stripe.com/) (coming soon)

## Getting Started
```
npm install
npm run seed
```
### Seed user
Email: `seed@prism.com`
Password: `pw`

The seed script generates a test webmaster, so you can access the user, roles, and site management areas. After creating your official user give it `webmaster` privileges and make it the `siteowner`.

## Script Options
- Development Environment (http://localhost:3000) `npm run dev`
- Web Test Runner (http://localhost:3333) `npm run test`
- Production `npm run production`
- Database Seed `npm run seed`
