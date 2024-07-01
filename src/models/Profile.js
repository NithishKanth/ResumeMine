import { Schema, model, models } from 'mongoose';

const profileSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    contact:{type:Schema.Types.Mixed,default:{}},
    skills: { type: [Schema.Types.Mixed], default: [] },
    projects:{type:[Schema.Types.Mixed], default:[]},
    languages:{type:Schema.Types.Mixed,default:{}},
    works:{type:[Schema.Types.Mixed],default:[]},
    certificates:{type:[Schema.Types.Mixed],default:[]},
    summary:{type:String,default:''},
    role:{type:String,default:"Student"},
    number:{type:String,default:"none"},
    location:{type:String,default:"none"},
    gender:{type:String,default:"none"},
    linkUrl:{type:String,default:""},
    DOB:{type:String,default:"none"},
    education: { type: [Schema.Types.Mixed], default: [] },
    city:{type:String,required:true}
})

const ProfileModel = models?.profiles || model("profiles",profileSchema);

export default ProfileModel;