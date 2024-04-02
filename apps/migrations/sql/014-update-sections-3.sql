UPDATE stores.store
SET 
  section = '{"type": "restaurant", "sections": [{"name": "ENTRÉE SELECTIONS", "dishes": [{"id": "78345", "name": "Vegan Chickn Drummies", "price": 11.5, "rating": 4.5, "image_url": "https://i.redd.it/gwtcnhsqdce91.jpg", "description": "", "out_of_stock": false}, {"id": "78495", "name": "Country Fried Steak", "price": 9.5, "rating": 4.9, "image_url": "https://midnightmunchiesandmorecom.files.wordpress.com/2019/05/img_9287.jpg?w=1000", "description": "", "out_of_stock": false}, {"id": "98764", "name": "Vegan Lasagna", "price": 9.5, "rating": 4.2, "image_url": "https://images.happycow.net/venues/1024/17/90/hcmp1790_381754.jpeg", "description": "", "out_of_stock": false}, {"id": "34567", "name": "Vegan Barbecue Roast w. Rice", "price": 9.5, "rating": 4.7, "image_url": "https://imagedelivery.net/olI9wp0b6luWFB9nPfnqjQ/2ffccbfa-d929-4718-1353-ef789294c700/w=720", "description": "", "out_of_stock": false}]}]}'::JSONB,
  profile_image = 'https://www.ilovenuvegan.com/backend/wp-content/uploads/2023/04/contact_sign.jpg'
WHERE sid = 'Nexa-3';


