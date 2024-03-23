UPDATE stores.store
SET section = '{
  "type": "restaurant",
  "sections": [
    {
      "name": "ENTRÉE SELECTIONS",
      "dishes": [
        {
          "id": "78345",
          "name": "Vegan Chickn Drummies",
          "description": "",
          "price": 11.5,
          "image_url": "https://i.redd.it/gwtcnhsqdce91.jpg",
          "rating": 4.5,
          "out_of_stock": false
        },
        {
          "id": "78495",
          "name": "Country Fried Steak",
          "description": "",
          "price": 9.5,
          "image_url": "https://midnightmunchiesandmorecom.files.wordpress.com/2019/05/img_9287.jpg?w=1000",
          "rating": 4.9,
          "out_of_stock": false
        },
        {
          "id": "98764",
          "name": "Vegan Lasagna",
          "description": "",
          "price": 9.5,
          "image_url": "https://images.happycow.net/venues/1024/17/90/hcmp1790_381754.jpeg",
          "rating": 4.2,
          "out_of_stock": false
        },
        {
          "id": "34567",
          "name": "Vegan Barbecue Roast w. Rice",
          "description": "",
          "price": 9.5,
          "image_url": "https://imagedelivery.net/olI9wp0b6luWFB9nPfnqjQ/2ffccbfa-d929-4718-1353-ef789294c700/w=720",
          "rating": 4.7,
          "out_of_stock": false
        }
      ]
    }
  ]
}'::jsonb
WHERE sid = '94b4d80b-6b72-4e59-8903-0205e33a27ef';