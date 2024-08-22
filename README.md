# Travel Backend App

This is a Backend Application built with Node js and Mongo Db.

## Tourist

1. Register Tourist Api : POST

```
http://localhost:8000/api/v1/tourist/register
```

2. Login Tourist Api : POST

```
http://localhost:8000/api/v1/tourist/login
```

3. Logout Tourist Api : POST

```
http://localhost:8000/api/v1/tourist/logout

```

4. Update Tourist Api : PATCH

```
http://localhost:8000/api/v1/tourist/update-tourist
```

5. Update Profile of Tourist Api : PATCH

```
http://localhost:8000/api/v1/tourist/profile-pic
```

6. Change Current Password Api : PATCH

```
http://localhost:8000/api/v1/tourist/change-password
```

7. Get Current Torist Api : GET

```
http://localhost:8000/api/v1/tourist/current-tourist
```

## Holiday

1. Holiday Register Api : POST

```
http://localhost:8000/api/v1/holiday/register-holiday
```

2. Holiday Images Upload And Update Images Api : PATCH

```
http://localhost:8000/api/v1/holiday/upload-holiday-images/:id
```

3. Holiday Update By Id Api : PATCH

```
http://localhost:8000/api/v1/holiday/update-holiday/:id
```

4. Get All Holidays Api : GET

```
http://localhost:8000/api/v1/holiday/get-holiday
```

5. Get Holidays By Id Api : GET

```
http://localhost:8000/api/v1/holiday/get-holiday/:id
```

6. Delete Holiday By Id Api : DELETE

```
http://localhost:8000/api/v1/holiday/delete-holiday/:id
```

## Destination

1. Destination Register / Create Api : POST

```
http://localhost:8000/api/v1/destination/register-destination
```
2. Destination Update By Id Api : PATCH

```
http://localhost:8000/api/v1/destination/update-destination/:id
```
3. Destination Thumbnail Update By Id Api : PATCH

```
http://localhost:8000/api/v1/destination/update-destthumbnail/:id
```

4. Destination Images Update By Id Api : PATCH

```
http://localhost:8000/api/v1/destination/update-destimages/:id
```
5. Get Destination By Id Api : GET

```
http://localhost:8000/api/v1/destination/get-destination/:id
```
6. Get All Destination Api : GET
```
http://localhost:8000/api/v1/destination/get-destination
```
7. Delete Destination By Id Api : DELETE
```
http://localhost:8000/api/v1/destination/delete-destination/:id
```

## Accomodation

1. Accomodation Create Api : POST
```
http://localhost:8000/api/v1/accomodation/create-accomodation
```
2. Accomodation Update By Id Api : PATCH
```
http://localhost:8000/api/v1/accomodation/update-accomodation/:id
```

3. Accomodation Update Thumbnail Image By Id : PATCH
```
http://localhost:8000/api/v1/accomodation/update-accomodation-thumbnail/:id
```

4. Accomodation Update Images By Id : PATCH
```
http://localhost:8000/api/v1/accomodation/update-accomodation-images/:id
```

5. Get All Accomodations : GET
```
http://localhost:8000/api/v1/accomodation/accomodation
```

6. Get All Accomodations By Id : GET
```
http://localhost:8000/api/v1/accomodation/accomodation/:id
```

7. Delete Accomodation By Id : DELETE

```
http://localhost:8000/api/v1/accomodation/delete-accomodation/:id
```

## Activity

1. Create Activity Api : POST

```
http://localhost:8000/api/v1/activity/create-activity
```

2. Update Activity By Id : PATCH
```
http://localhost:8000/api/v1/activity/update-activity/:id
```

3. Update Activity Thumbnail By Id : PATCH
```
http://localhost:8000/api/v1/activity/update-activity-thumbnail/:id
```

4. Update Activity Images By Id : PATCH
```
http://localhost:8000/api/v1/activity/update-activity-images/:id
```

5. Get All Activity By Id : GET
```
http://localhost:8000/api/v1/activity/get-all-activity/:id
```

6. Get All Activity : GET
```
http://localhost:8000/api/v1/activity/get-all-activity
```

7. Delete Activity By Id : DELETE

```
http://localhost:8000/api/v1/activity/delete-activity/66bc382ddcb92de99bb55c84
```

## Package

1. Created Package Api : POST
```
http://localhost:8000/api/v1/package/create-package
```

2. Update Package By Id Api : PATCH
```
http://localhost:8000/api/v1/package/update-package/:id
```

3. Package Thumbnail Update By Id Api : PATCH
```
http://localhost:8000/api/v1/package/update-package-thumbnail/:id
```

4. Package Images Update By Id Api : PATCH
```
http://localhost:8000/api/v1/package/update-package-images/:id
```
5. Get All Packages Api : GET
```
http://localhost:8000/api/v1/package/package
```

6. Get Packages By Id Api : GET
```
http://localhost:8000/api/v1/package/package/:id
```

7. Delete Package By Id Api : DELETE
```
http://localhost:8000/api/v1/package/delete-package/:id
```

## Transport

1. Created transport Api : POST
```
http://localhost:8000/api/v1/transport/create-transport
```

2. Update transport By Id Api : PATCH
```
http://localhost:8000/api/v1/transport/update-transport/:id
```

3. transport Thumbnail Update By Id Api : PATCH
```
http://localhost:8000/api/v1/transport/update-thumbnail/:id
```

4. transport Images Update By Id Api : PATCH
```
http://localhost:8000/api/v1/transport/update-images/:id
```
5. Get All transports Api : GET
```
http://localhost:8000/api/v1/transport/get-transport
```

6. Get transports By Id Api : GET
```
http://localhost:8000/api/v1/transport/get-transport/:id
```

7. Delete transport By Id Api : DELETE
```
http://localhost:8000/api/v1/transport/delete-transport/:id
```

## Ratings

1. Created Reveiw Api : POST
```
http://localhost:8000/api/v1/reveiw/reveiw-create
```

2. Update Reveiw By Id Api : PATCH
```
http://localhost:8000/api/v1/reveiw/reveiw-edit/:id
```

3. Get All reveiws Api : GET
```
http://localhost:8000/api/v1/reveiw/get-reveiw
```

4. Get All reveiws By Id Api : GET
```
http://localhost:8000/api/v1/reveiw/get-reveiw/:id
```

5. Delete Reveiws By Id Api : DELETE
```
http://localhost:8000/api/v1/reveiw/delete-reveiw/:id
```

## Booking

1. Created Booking Api : POST
```
http://localhost:8000/api/v1/booking/create-booking
```

2. Update Booking By Id Api : PATCH
```
http://localhost:8000/api/v1/booking/update-booking/:id
```

3. Get All Booking Api : GET
```
http://localhost:8000/api/v1/booking/get-booking
```

4. Get All Booking By Id Api : GET
```
http://localhost:8000/api/v1/booking/get-booking/:id
```

5. Delete Booking By Id Api : DELETE
```
http://localhost:8000/api/v1/reveiw/delete-booking/:id
```

## Flights

1. Flights Search From Departure To Arrival Api : GET

```
http://localhost:8000/api/v1/flight/location/?from=&to=
```