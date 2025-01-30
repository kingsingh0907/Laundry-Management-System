import { Schema, model } from "mongoose";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

const staffSchema = new Schema({
    role: {
        type: String,
    },
    staffId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]
});

const Staff = new model("staff",staffSchema);

export default Staff;