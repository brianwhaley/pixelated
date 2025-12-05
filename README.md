
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brianwhaley/pixelated-components">
    <img src="images/bg6.gif" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pixelated Components</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/brianwhaley/pixelated-components"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/brianwhaley/pixelated-components">View Demo</a>
    &middot;
    <a href="https://github.com/brianwhaley/pixelated-components/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/brianwhaley/pixelated-components/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a library of components I have found useful to build web sites quickly.  



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Storybook][Storybook.js]][Storybook-url]
* [![Contentful][Contentful.com]][Contentful-url]
* [![Wordpress][Wordpress.com]][Wordpress-url]
* [![Github][Github.com]][Github-url]
* [![npm][npm.org]][npm-url]





<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation

1. Install NPM packages
   ```sh
   npm install @pixelated-tech/components@latest
   ```




<!-- USAGE EXAMPLES -->
## Usage

Components to help build websites quicker:
1. Buzzword Bingo Cards
1. Page Callouts - Large and Small
1. Image Carousel - Page, Header, and Simple
1. Contentful CMS Integration
1. eBay Store Listings
1. Form Components and Form Builder
1. Google Search and Google Analytics Integration
1. Markdown to HTMl Engine
1. Menu Components - Simple and Accordion
1. Metadata Injection from Route JSON file
1. Modal Dialogs
1. NerdJokes Integration
1. Recipe XML MicroFormat Engine
1. Resume MicroFormat Engine
1. Sitemap.XML dynamic generation from Route JSON file
1. Social Card Engine
1. Table Components
1. Other Utilities

### Google Reviews (server-side)
- Requires: `GOOGLE_MAPS_API_KEY` (or use the built-in hard-coded key during testing).
- Import: `import { getGoogleReviewsByCompanyName } from 'pixelated-components';`
- Example:

```
const { place, reviews } = await getGoogleReviewsByCompanyName({
  companyName: 'PixelVivid',
  language: 'en',
  near: { lat: 32.2163, lng: -80.7526 },
  radiusMeters: 50000,
  region: 'us',
  type: 'point_of_interest',
  maxReviews: 5,
});
```

- Tips:
  - Prefer `near` + `radiusMeters` for better disambiguation.
  - If results return 0, try adjusting `region` or `type`, or use the exact business name.




<!-- ROADMAP -->
## Roadmap

- [ ] LinkedIn Recommendations Integration
- [ ] eBay Feedback Integration
- [ ] Yelp Recommendations integration
- [ ] Calendly Integration
- [ ] Instagram Image Integration for Carousels
- [ ] Expanding menu based on 
- [ ] eCommerce Features + Paypal ( or Stripe, Square)
- [ ] Shopify Integration
- [ ] Quickbooks Integration
- [ ] Buffer Integration (or Sendible, Sprout Social, Hootsuite)
- [ ] Zapier Integration


See the [open issues](https://github.com/brianwhaley/pixelated-components/issues) for a full list of proposed features (and known issues).




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request






### Top contributors:

<a href="https://github.com/brianwhaley/pixelated-components/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=brianwhaley/pixelated-components" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.




<!-- CONTACT -->
## Contact

Your Name - [@brianwhaley](https://twitter.com/@brianwhaley) - brian.whaley@gmail.com

Project Link: [https://github.com/brianwhaley/pixelated-components](https://github.com/brianwhaley/pixelated-components)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/brianwhaley/pixelated-components.svg?style=for-the-badge
[contributors-url]: https://github.com/brianwhaley/pixelated-components/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/brianwhaley/pixelated-components.svg?style=for-the-badge
[forks-url]: https://github.com/brianwhaley/pixelated-components/network/members

[stars-shield]: https://img.shields.io/github/stars/brianwhaley/pixelated-components.svg?style=for-the-badge
[stars-url]: https://github.com/brianwhaley/pixelated-components/stargazers

[issues-shield]: https://img.shields.io/github/issues/brianwhaley/pixelated-components.svg?style=for-the-badge
[issues-url]: https://github.com/brianwhaley/pixelated-components/issues

[license-shield]: https://img.shields.io/github/license/brianwhaley/pixelated-components.svg?style=for-the-badge
[license-url]: https://github.com/brianwhaley/pixelated-components/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/brianwhaley

[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Storybook.js]: https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white
[Storybook-url]: https://storybook.js.org

[Contentful.com]: https://img.shields.io/badge/Contentful-2478CC?logo=contentful&logoColor=fff
[Contentful-url]: https://contentful.com

[WordPress.com]: https://img.shields.io/badge/WordPress-%2321759B.svg?logo=wordpress&logoColor=white
[Wordpress-url]: http://www.wordpress.com

[npm.org]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff
[npm-url]: https://www.npmjs.org

[GitHub.com]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[Github-url]: https://www.github.com