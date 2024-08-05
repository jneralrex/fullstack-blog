const Admin = require("../Models/admin.model");

const createAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const checkEmail = await Admin.findOne({ email });
        if (checkEmail) {
            res.json({
                status: 403,
                message: "Forbidden, email already in use",
            });
        } else {
            const create_admin = new Admin({ firstName, lastName, email, phone, password });
            const result = await create_admin.save();
            res.json({
                status: 200,
                message: "Admin created successfully",
                data: result,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const getAdmin = async (req, res) => {
    try {
        const result = await Admin.find({}, { password: 0 });
        if (!result) {
            res.json({
                status: 404,
                message: "Operation not successful",
            });
        } else {
            res.json({
                status: 200,
                message: "Operation successful",
                length: result.length,
                data: result,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const getSingleAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Admin.findById(id);
        if (!result) {
            res.json({
                status: 404,
                message: "Operation not successful",
            });
        } else {
            res.json({
                status: 200,
                message: "Operation successful",
                data: result,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const updated_value = req.body;
        const result = await Admin.findByIdAndUpdate(id, updated_value, {
            new: true,
        });
        if (!result) {
            res.json({
                status: 404,
                message: "Operation not successful",
            });
        } else {
            res.json({
                status: 200,
                message: "Operation successful",
                data: result,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Admin.findByIdAndDelete(id);
        if (!result) {
            res.json({
                status: 404,
                message: "Operation failed",
            });
        } else {
            res.json({
                status: 200,
                message: "Operation successful",
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const adminLogging = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await Admin.findOne({ email, password }, { password: 0 });
        if (!result) {
            res.json({
                status: 404,
                message: 'Email or password incorrect'
            })
        } else {
            res.json({
                status: 200,
                message: 'Login successful',
                data: result
            })
        };
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    createAdmin,
    getAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
    adminLogging
};
