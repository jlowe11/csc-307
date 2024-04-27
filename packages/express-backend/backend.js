// backend.js
import express from "express";
import cors from "cors";
import mongoose, { get } from "mongoose";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;

  function findUserById(id) {
    return User.findById(id);
  }

  function addUser(user) {
    const userToAdd = new User(user);
    const promise = userToAdd.save();
    return promise;
  }

  app.get("/users?name=<name>&job=<job>", (req, res) => {
    const { name, job } = req.query;
    let query = {};
    if (name) query.name = name;
    if (job) query.job = job;

    User.find(query)
        .then(users => {
            if (users.length === 0) {
                res.status(404).send('No users found.');
            } else {
                res.send({ users_list: users });
            }
        })
        .catch(error => res.status(500).send(error.message));
});

  app.get("/users/:id", (req, res) => {
    findUserById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send('Resource not found.');
      } else {
        res.send(result);
      }
    })
    .catch(error => res.status(500).send(error.message));
  });
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
    .then(addedUser => {
      res.status(201).send(addedUser); 
    })
    .catch(error => {
      res.status(400).send(error.message); 
    });
  });
  
  app.delete("/users/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).send('Resource not found.');
            } else {
                res.status(204).send(); 
            }
        })
        .catch(error => res.status(500).send(error.message));
});

  