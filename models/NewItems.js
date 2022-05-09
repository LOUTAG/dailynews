const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newItemSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        title : { type: String, required: ''},
        description : { type: String, required: ''},
        content: { type: String, required: ''},
        postedBy: { type: Object, required:'' }
    },
    {
        timestamps: true
        //mongoose timestamps option manage automaticcaly 'createAt' and 'UpdatedAt' properties on the document
    }
);
module.exports = mongoose.model('newitems', newItemSchema);
