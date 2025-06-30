# BushidoCoder dTCG API Test Commands

## 1. Server Status Check
GET http://localhost:5000/
Expected: "Welcome to the back of the PetShop"

## 2. User Registration  
POST http://localhost:5000/api/auth/register
Body:
{
    "username": "demo_user",
    "email": "demo@example.com",
    "password": "demo123"
}
Expected: User created with 100 starting currency

## 3. User Login
POST http://localhost:5000/api/auth/login  
Body:
{
    "email": "demo@example.com",
    "password": "demo123"
}
Expected: JWT token returned

## 4. View All Pets
GET http://localhost:5000/api/pets
Expected: List of available pets with stats

## 5. Collect a Pet
POST http://localhost:5000/api/auth/collect-pet/[PET_ID]
Expected: "Pet added to collection!"

## 6. View User Collection
GET http://localhost:5000/api/auth/
Expected: User with ownedPets array populated