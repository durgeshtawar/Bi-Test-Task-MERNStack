import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";



const userOperation = {
    async AddUser(userObject, response) {
      try {
        
        const doc = await userModel.create(userObject);
        response.json({ Status: "S", record: doc });
      } catch (err) {
        console.log("Error is ", err);
        response.json({ Status: "F" });
      }
    },
    async login(userObject, response) {
      try {
        const doc = await userModel.findOne(userObject);
        if (!doc) {
          response.jsson({ Status: "F", msg: "Invalid username or password" });
          return;
        }
  
        const token = jwt.sign({ doc }, 'secretkey', { expiresIn: '1h' });
        response.json({ Status: "S", msg: "welcome bro " + doc.userName, token: token });
      } catch (err) {
        console.log(err);
        response.json({ Status: "F", msg: "An error occurred" });
      }
    },
    async AddFriend(userObject, response) {
      try {
        const check = await this.Find(userObject.userName);
        if (check) {
          const doc = await userModel.findOneAndUpdate(
            { userName: userObject.defaultUser },
            {
              $push: {
                friends: userObject.userName,
                expensis: { name: userObject.userName, data: {} },
              },
            },
            { new: true }
          );
          response.json({ Status: "S", msg: "Added successfully", doc: doc });
        } else {
          response.json({ Status: "F", msg: "Your friend is not registered yet" });
        }
      } catch (err) {
        console.log(err);
        response.json({ Status: "F", msg: "An error occurred" });
      }
    },
    Find(userName) {
      return userModel.findOne({ userName }, function (err, doc) {
        if (err) {
          console.log(err);
          return;
        } else {
          if (doc) {
            console.log(doc);
          } else {
            console.log("Not Found");
          }
        }
      });
    },
    async AddExp(userObject, response) {
      try {
        const doc = await userModel.findOneAndUpdate(
          { username: userObject.userName, "expensis.name": userObject.user },
          {
            $set: {
              "expensis.$.data.desc": userObject.inp.description,
              "expensis.$.data.date": userObject.inp.date,
            },
            $inc: { "expensis.$.data.amount": userObject.inp.amount },
            new: true,
          }
        );
        response.json({ Status: "S", msg: "Added successfully", doc: doc });
      } catch (err) {
        console.log(err);
        response.json({ Status: "F", msg: "An error occurred" });
      }
    },
    async settle(userObject, response) {
      try {
        const doc = await userModel.findOneAndUpdate(
          { userName: userObject.userName, "expensis.name": userObject.user },
          { $inc: { "expensis.$.data.amount": userObject.val } },
          { new: true }
        );
        response.json({ Status: "S", msg: "Added successfully", doc: doc });
      } catch (err) {
        console.log(err);
        response.json({ Status: "F", msg: "An error occurred" });
      }
    },
  };
  
  export default userOperation;