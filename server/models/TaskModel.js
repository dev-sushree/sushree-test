const db = require('../config/database');
const TaskModel = {
    async getSuppler() {
        try {
            const sql = `SELECT DISTINCT supplier_name FROM purchase_orders ORDER BY supplier_name ASC`;
            return await db.query(sql);

        } catch (error) {
            console.log(error);
        }
    },

    async getPurchaseOrder(supplier) {
        try {
            const sql = `SELECT id, po_number, description FROM purchase_orders WHERE supplier_name LIKE ? ORDER BY po_number ASC`;
            return await db.query(sql, [supplier]);
        } catch (error) {
            console.log(error);
        }
    },

    async createDocket(params) {
        try {
            const sql = `INSERT INTO dockets (name, start_time, end_time, hour_worked, rate, po_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const result =  await db.query(sql,  [params.name, params.start_time, params.end_time, params.hour_worked, params.rate, params.po_id, new Date()]);

            if(result.affectedRows > 0) {
                return {
                    message: "Docket created!",
                } 
            } else {
                return {
                    message: "Failed to create docket",
                    status: false
                }
            }
          
        } catch (error) {
            console.log(error);
        }
    },

    async getDocket() {
        try {
            const sql = `SELECT D.name, D.start_time, D.end_time, D.hour_worked, D.rate, PO.id, PO.po_number, PO.supplier_name, PO.description
            FROM dockets D
            INNER JOIN purchase_orders PO ON D.po_id = PO.id
            ORDER BY D.id DESC`;

            return await db.query(sql);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TaskModel;