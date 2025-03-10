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
    milestones: {
      type: Map,
      of: new Schema({
        current: {
          type: String,
          default: "Beginner", // Default milestone for all places
        },
        previous: {
          type: String,
          default: null,
        },
      }),
      default: () => {
        // Initialize default milestones for all 3 places
        const defaultMilestones = new Map();
        const places = ["simple-bar", "complex-bar", "bad-bar"];
        places.forEach(placeId => {
          defaultMilestones.set(placeId, {
            current: "Beginner",
            previous: null,
          });
        });
        return defaultMilestones;
      },
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
            password:process.env.ADMIN_PASSWORD,
            milestones: new Map([
              ["simple-bar", { current: "Beginner", previous: null }],
              ["complex-bar", { current: "Beginner", previous: null }],
              ["bad-bar", { current: "Beginner", previous: null }],
            ]),
      
        })

        await admin.save()
        console.log('Admin created')
    }
}

const Admin = mongoose.model("Admin", adminSchema);
export  {Admin};