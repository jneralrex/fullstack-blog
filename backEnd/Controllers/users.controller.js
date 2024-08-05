const User = require("../Models/user.model");

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            res.json({
                status: 403,
                message: 'Forbidden, Email already exist'
            })
        } else {
            const createUser = new User({ firstName, lastName, email, phone, password });
            const result = await createUser.save();
            res.json({
                status: 200,
                message: 'User registered successfully',
                data: result
            })
        }
    } catch (error) {
        console.log(error)
    }

};

const getAllUsers = async (req, res) => {
    try {
        const result = await User.find({}, { password: 0 })
        if (result) {
            res.json({
                status: 200,
                message: 'Getting all users successful',
                length: result.length,
                data: result
            })
        } else {
            res.json({
                status: 404,
                message: 'Operation not successful',
            })
            return
        }
    } catch (error) {
        console.error(error)
    }
};

const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findById(id, { password: 0 })
        if (result) {
            res.json({
                status: 200,
                message: 'Operation successful',
                data: result
            })
        } else {
            res.json({
                status: 404,
                message: 'User not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updated_value = req.body;
        const result = await User.findByIdAndUpdate(id, updated_value, { new: true });
        if (result) {
            res.json({
                status: 200,
                message: 'Update successful',
                data: result
            })
        } else {
            res.json({
                status: 404,
                message: 'Not successful'
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Deleted successfully'
            })
        }else{
            res.json({
                status: 404,
                message: 'Operation not successful'
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const loginUser = async(req, res) => {
try {
    const {email, password} = req.body;
    const result = await User.findOne({email, password}, {password:0});
    if (!result){
        res.json({
            status: 404,
            message: 'Email or password incorrect'
        })
    } else{
        res.json({
            status: 200,
            message: 'Login successful',
            data:result
        })
    };
} catch (error) {
    console.error(error)
}
};

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, loginUser }