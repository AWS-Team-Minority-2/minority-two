UPDATE stores.store
SET 
  section = '{"type": "restaurant", "sections": [{"name": "Snack Time", "dishes": [{"id": "st-87654", "name": "CAJUN CRAB FRIES", "price": 14, "rating": 4.8, "image_url": "https://static.spotapps.co/spots/15/a6f36877694abea4d2c23a897cfe03/medium", "description": "Blue crab meat, cajun seasoning, crab aioli, parsley", "out_of_stock": false}, {"id": "st-76545", "name": "FARM FRESH DEVILED EGGS", "price": 10, "rating": 4.2, "image_url": "https://static.spotapps.co/spots/47/8f7aad41084a22ae143a8b75d31532/medium", "description": "", "out_of_stock": false}, {"id": "st-438u2", "name": "WOOD GRILLED CHICKEN WINGS", "price": 13, "rating": 4.2, "image_url": "https://static.spotapps.co/spots/70/343372261342e493efbe2ec0be8ce9/medium", "description": "Served with our house mumbo sauce", "out_of_stock": false}, {"id": "st-432432", "name": "HOUSEMADE HUMMUS", "price": 9, "rating": 4.1, "image_url": "https://static.spotapps.co/spots/d0/b7490c37004e8c82ed9889cbb6196a/medium", "description": "", "out_of_stock": false}]}]}'::JSONB,
  profile_image = 'https://static.spotapps.co/web/halfsmoke--com/custom/about/about_slide_1.jpg'
WHERE sid = 'Nexa-10';

