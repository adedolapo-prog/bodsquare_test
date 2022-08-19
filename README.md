# bodsquare_test

For the documentation, visit: [https://documenter.getpostman.com/view/15668662/VUqoRJZt] .

The env file contains a mongodb url link (MONGO_URI) and the jwt secret (JWT_SECRET)

---
Simply run: npm run dev to start the app

- Upon starting the app, the join socket must be emitted in order to save the user's detail and socket to the db for future targeting. Sample data is: 

    - {
    "userId": "62f74a7347368fbf64a8190d",
    }
