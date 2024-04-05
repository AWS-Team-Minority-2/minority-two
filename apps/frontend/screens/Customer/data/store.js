const shop = [
  {
    name: "Lay's Classic Potato Chips",
    price: 4.99,
    measurement: "8 oz",
    feature: "Snacks",
    image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg",
  },
  {
    name: "Cheetos Crunchy Flamin' Hot Cheese",
    price: 2.69,
    measurement: "92.1 g",
    feature: "Snacks",
    image:
      "https://www.cheetos.com/sites/cheetos.com/files/2019-02/Cheetos%20Crunchy%20Flamin%27%20Hot_1.png",
  },
  {
    name: "Ruffles Cheddar-Sour Cream",
    price: 2.69,
    measurement: "2.5 oz",
    feature: "Snacks",
    image:
      "https://m.media-amazon.com/images/I/51Zhe0Vh84L._AC_UF894,1000_QL80_.jpg",
  },
  {
    name: "Munchies Flamin' Hot Snack",
    price: 4.39,
    measurement: "8 oz",
    feature: "Snacks",
    image:
      "https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_2,format=auto,fit=scale-down,width=800,height=800/0c497500-b6da-4a03-a370-20810f54cc36.png",
  },
  {
    name: "Gush Tropical Fruit Flavored Snacks",
    price: 2.99,
    measurement: "4.25 oz",
    feature: "Snacks",
    image:
      "https://cdn11.bigcommerce.com/s-omwfd2x16c/images/stencil/1280x1280/products/9486/10747/gushert__77291.1661983663.jpg?c=1",
  },
  {
    name: "Cheetos Cheese Puffs",
    price: 2.69,
    measurement: "3 oz",
    feature: "Snacks",
    image: "https://m.media-amazon.com/images/I/81nqv9773ML.jpg",
  },
  {
    name: "Hostess Donettes Powdered Mini Donuts",
    price: 2.0,
    measurement: "6 ct",
    feature: "Snacks",
    image:
      "https://voltcandy.com/wp-content/uploads/2020/01/Hostess-Powdered-Donettes-1.jpg",
  },
  {
    name: "Slim Jim Original Giant Smoked Snacks",
    price: 2.39,
    measurement: "0.97 oz",
    feature: "Snacks",
    image:
      "https://mobileimages.lowes.com/productimages/d2ce72c7-3c2a-40e5-8521-4ae0468fbeba/66071397.jpeg?size=pdhism",
  },
  {
    name: "Mountain Dew Citrus Soda Bottle",
    price: 2.89,
    measurement: "20 oz",
    feature: "Soda",
    image:
      "https://assets.wakefern.com/is/image/wakefern/1200000131-001?$Mi9Product_detail$",
  },
  {
    name: "Pepsi Cola Soda",
    price: 2.89,
    measurement: "20 oz",
    feature: "Soda",
    image:
      "https://www.usatoday.com/gcdn/media/USATODAY/USATODAY/2013/03/21/ap-pepsi-new-bottle-3_4.jpg",
  },
  {
    name: "Candy Dry Ginger",
    price: 2.99,
    measurement: "20 oz",
    feature: "Soda",
    image:
      "https://i5.walmartimages.com/asr/d83f6555-4861-46e7-8016-042cf5d1fab9.19a1fd8d1c0d800efe448d94d0ecedf4.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
  {
    name: "Fanta Strawberry Soda",
    price: 2.89,
    measurement: "20 oz",
    feature: "Soda",
    image: "https://m.media-amazon.com/images/I/41Fxm88lpJL.jpg",
  },
  {
    name: "Coca-Cola Classic Soda",
    price: 2.89,
    measurement: "20 oz",
    feature: "Soda",
    image:
      "https://www.luekensliquors.com/wp-content/uploads/2018/10/Coke-2Lt.jpg",
  },
  {
    name: "Sprite Lemon-Lime Soda",
    price: 2.89,
    measurement: "20 oz",
    feature: "Soda",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_ec2f8891-8edd-4fff-bb17-417a446f04e8?wid=488&hei=488&fmt=pjpeg",
  },
  {
    name: "Haagen-Dazs Caramel Cone Ice Cream",
    price: 5.0,
    measurement: "14 oz",
    feature: "Ice Cream",
    image:
      "https://www.icecream.com/content/dam/dreyersgrandicecreaminc/us/en/haagen-dazs/products/pints/haagen-dazs-caramel-cone-ice-cream-pint-1500x1140.png",
  },
  {
    name: "Snicker's Vanilla Ice Cream",
    price: 7.07,
    measurement: "16 oz",
    feature: "Ice Cream",
    image: "https://images.heb.com/is/image/HEBGrocery/001457166-2",
  },
  {
    name: "Ben & Jerry's Milk & Cookies Ice Cream",
    price: 7.49,
    measurement: "16 oz",
    feature: "Ice Cream",
    image:
      "https://shop.benjerry.com/cdn/shop/products/36798_US_IC_Milk---Cookies_473ml_FOP-1000x1000-18428b7b-956e-43da-a5ac-44fbb30892ed.png?v=1677670415",
  },
  {
    name: "Oreo Frozen Dairy Dessert",
    price: 5.99,
    measurement: "14 oz",
    feature: "Ice Cream",
    image:
      "https://www.oreo.com/media/catalog/product/cache/e95618f36a44fdfd08c1d13eb64bc814/o/r/oreo_fd_14_oz.png",
  },
  {
    name: "Twix Ice Cream",
    price: 7.09,
    measurement: "16 oz",
    feature: "Ice Cream",
    image:
      "https://www.twix.com/cdn-cgi/image/width=600,height=600,f=auto,quality=90/sites/g/files/fnmzdf236/files/migrate-product-files/l9dmcmluctbbrkmgekfi.png",
  },
  {
    name: "Drumstick Vanilla Frozen Dairy Dessert Cones",
    price: 7.49,
    measurement: "4 ct",
    feature: "Ice Cream",
    image: "https://www.kroger.com/product/images/large/front/0007255411058",
  },
  {
    name: "Lysol Power Toilet Bowl Cleaner",
    price: 4.29,
    measurement: "24 oz",
    feature: "Cleaning Supplies",
    image: "https://pics.walgreens.com/prodimg/382679/450.jpg",
  },
  {
    name: "Fabuloso Multi-Purpose Cleaner Refreshing Lime",
    price: 4.79,
    measurement: "33.8 oz",
    feature: "Cleaning Supplies",
    image:
      "https://www.kroger.com/product/images/large/front/0003500047041?banner=harristeeter",
  },
  {
    name: "Clorox Bleach Foamer Ocean Mist Bathroom",
    price: 5.79,
    measurement: "30 oz",
    feature: "Cleaning Supplies",
    image:
      "https://i5.walmartimages.com/seo/Clorox-Bathroom-Bleach-Foamer-Ocean-Mist-30-fl-oz_3289ac78-f09e-4d1d-9ff1-4010cdd7f3e0.9367c90354f6d5da7787e385e2d91ba0.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
  {
    name: "Scrubbing Bubbles Drop-Ins Blue Toilet Cleaning",
    price: 7.49,
    measurement: "",
    feature: "Cleaning Supplies",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_f7ea28c0-c1f9-48b9-bfbb-60d46eeb890f?wid=488&hei=488&fmt=pjpeg",
  },
  {
    name: "Tide 3-in-1 Pods",
    price: 14.99,
    measurement: "42 ct",
    feature: "Cleaning Supplies",
    image:
      "https://assets.syndigo.cloud/cdn/0e3f81dd-c0c8-4947-b3bd-101656b4b606/fileType_jpg;size_600x600/0e3f81dd-c0c8-4947-b3bd-101656b4b606",
  },
  {
    name: "Libman Small Space Scrub Brush",
    price: 6.79,
    measurement: "",
    feature: "Cleaning Supplies",
    image:
      "https://i5.walmartimages.com/asr/9578590a-1c00-462e-aea1-a0c9b0c67fd7_1.75e0c97d15b0d3840c4956041ae43742.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
  {
    name: "Listerine Total Care Fresh Mint Anticavity Fluoride MouthWash",
    price: 9.99,
    measurement: "16.9 oz",
    feature: "Oral Care",
    image:
      "https://www.listerine.com/sites/listerine_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/listerine-total-care-anticavity-fresh-mint-1l.webp",
  },
  {
    name: "Oral-B Essential Cavity Defense Mint Floss",
    price: 2.99,
    measurement: "50 m",
    feature: "Oral Care",
    image:
      "https://cdn11.bigcommerce.com/s-i5q5a5nhp2/images/stencil/1280x1280/products/30991/80057/300410104214__95116.1702356679.png?c=1",
  },
  {
    name: "Colgate Cavity Protection Fluoride Toothpaste",
    price: 2.99,
    measurement: "4 oz",
    feature: "Oral Care",
    image: "https://m.media-amazon.com/images/I/71r3cjgNsfL.jpg",
  },
  {
    name: "Sensodyne ProNamel Fresh Breath Toothpaste",
    price: 8.29,
    measurement: "4 oz",
    feature: "Oral Care",
    image: "https://pics.walgreens.com/prodimg/413063/450.jpg",
  },
  {
    name: "Oral B Indicator Max Extra Value Pack Soft Toothbrushes",
    price: 11.99,
    measurement: "4 ct",
    feature: "Oral Care",
    image:
      "https://www.riteaid.com/shop/media/catalog/product/b/s/bsh2fcaaxpw1enar6gjg.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=265&width=265&canvas=265:265",
  },
  {
    name: "Biotene Gentle Mint Dry Mouth Moisturizing Spray",
    price: 8.99,
    measurement: "1.5 oz",
    feature: "Oral Care",
    image: "https://m.media-amazon.com/images/I/61bqu904PRL.jpg",
  },
];

// const features = [
//   "Snacks",
//   "Soda",
//   "Ice Cream",
//   "Cleaning Supplies",
//   "Oral Care",
// ];

const features = [
  { name: "Snacks", amount: 112 },
  { name: "Soda", amount: 82 },
  { name: "Ice Cream", amount: 52 },
  { name: "Cleaning Supplies", amount: 86 },
  { name: "Oral Care", amount: 41 },
];

export { shop, features };
