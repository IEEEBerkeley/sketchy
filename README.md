## IEEE Berkeley - Sketchy Project
Sketchy is a free online game that takes inspiration from the games skribbl.io and Among Us. There are two teams: the imposters and the crewmates. Each game consists of several drawing rounds. The crewmates win if they score a certain number of points or catch all of the impostors. The imposters win if they score a certain number of points.

## Contributors
**Developers:** Allison Jung, Arthur Deng, Saransh Saini, Jessie Hong, Isabella Borkovic, Barnett Yang, Roy Huang, Arda Demirci, Vivian Hsu

**Advisors:** Wilson Nguyen, John Lee, Maanuj Vora

## Preview

<p float="left">
  <img src="https://github.com/IEEEBerkeley/sketchy/blob/master/public/img/1.png" width="400" />
  <img src="https://github.com/IEEEBerkeley/sketchy/blob/master/public/img/2.png" width="400" /> 
</p>
<p float="left">
  <img src="https://github.com/IEEEBerkeley/sketchy/blob/master/public/img/3.png" width="400" />
  <img src="https://github.com/IEEEBerkeley/sketchy/blob/master/public/img/4.png" width="400" /> 
</p>

## Tests Performed
. 


## How to run

Make sure Redis is installed. If not, `brew install redis && brew services start redis`

Install dependencies: `npm install`

Run development server: `npm run watch`

**Note:** Compiled CSS found at `public/styles/all.css`

## Linting (Making code look nicer):

JavaScript:

`npm run lint`

`npm run lint:fix` (Automatically fixes linting issues within JS)

Handlebars & SCSS:

`npm run beautify` (Does both!)

`npm run beautify:scss`

`npm run beautify:hbs`


## License

Copyright (c) 2020 contributors (listed above) and IEEE Student Branch at UC Berkeley. Released under the BSD 3-Clause License.
