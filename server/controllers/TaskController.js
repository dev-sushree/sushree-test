const Joi = require('joi');
const TaskModel = require('../models/TaskModel');

const TaskController = {
    async getSupplier(req, res, next) {
        try {
           
            const response = await TaskModel.getSuppler();
            return res.status(200).json(response ?? []);

        } catch (error) {
            console.log(error);
        }
    },

    async getPurchaseOrder(req, res, next) {
        try {
            console.log(req.query);
            if (!req.query.supplier || req.query.supplier == "") {
              return res.status(401).json({ error: "Provide supplier name" });
            }
            const response = await TaskModel.getPurchaseOrder(
              req.query.supplier
            );
            return res.status(200).json(response ?? []);
        } catch (error) {
            console.log(error);
        }
    },

    async createDocket(req, res, next) {
        try {
            const { error } = validate({name: req.body.name, po_id: req.body.po_id});
            if (error) {
                return res.status(401).json({ error: error.details[0].message });
            }

            const response = await TaskModel.createDocket(req.body);
            return res.status(200).json(response ?? []);
        } catch (error) {
            console.log(error);
        }
    },

    async getDocket(req, res, next) {
        try {
            const response = await TaskModel.getDocket();
            return res.status(200).json(response ?? []);
        } catch (error) {
            console.log(error);
        }
    }
}

const validate = (req) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        po_id: Joi.number().required()
    })
    return schema.validate(req);
}

module.exports = TaskController;