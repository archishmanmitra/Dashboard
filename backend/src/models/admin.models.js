import mongoose from "mongoose";
import { Schema}from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: "admin",
      immutable: true,
    },
    milestone: {
      type: String,
      default: "Beginner", // Initially, no milestone is set
    },
  },
  { timestamps: true }
);

//pasword hashing:
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Duplication prevention: 

adminSchema.statics.initAdmin = async function () {
    const adminExists= await this.findOne({role:'admin'})
    if(!adminExists){
        const admin= new this({
            username:process.env.ADMIN_USERNAME,
            password:process.env.ADMIN_PASSWORD
        })

        await admin.save()
        console.log('Admin created')
    }
}

const Admin = mongoose.model("Admin", adminSchema);
export  {Admin};