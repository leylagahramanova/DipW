import Maintenance from "../models/MaintenanceModel.js";
import User from "../models/UserModel.js";
import { response } from "express";
import { Op } from "sequelize";
export const getMaintenances = async (req, res) => {
    try {
        let responce;
        if (req.role === "admin") {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'username', 'sim', 'type', 'found_problems', 'how_to_fix', 'status', 'userId'],
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }]
            });
        }
        else {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'username', 'sim', 'type', 'found_problems', 'how_to_fix', 'status', 'userId'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }]
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!maintenance) return res.status(404).json({ msg: "Data not found" });
        let responce;
        if (req.role === "admin") {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'username', 'sim', 'type', 'found_problems', 'how_to_fix', 'status', 'userId'],
                where: {
                    id: maintenance.id
                },
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }]
            });
        }
        else {
            response = await Maintenance.findOne({
                attributes: ['uuid', 'date', 'username', 'sim', 'type', 'found_problems', 'how_to_fix', 'status', 'userId'],
                where: {
                    [Op.and]: [{ id: maintenance.id }, { userId: req.userId }]

                },
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }]
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createMaintenance = async (req, res) => {
    const { date, username, sim, type, found_problems, how_to_fix, status, userId } = req.body;
    try {
        await Maintenance.create({
            date: date,
            username: username,
            sim: sim,
            type: type,
            found_problems: found_problems,
            how_to_fix: how_to_fix,
            status: status,
            userId: req.userId
        });
        res.status(201).json({ msg: "Maintenance created succesfuly" })
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!maintenance) return res.status(404).json({ msg: "Data not found" });
        const { date, username, sim, type, found_problems, how_to_fix, status, userId } = req.body;
        if (req.role === "admin") {
            await Maintenance.update({ date, username, sim, type, found_problems, how_to_fix, status, userId }, {
                where: {
                    id: maintenance.id

                },
            });
        } else {
            if (req.userId !== maintenanceuserId) return res.status(403)({ msg: "Forbidden access" })
            await Maintenance.update({ date, username, sim, type, found_problems, how_to_fix, status, userId }, {
                where: {
                    [Op.and]: [{ id: maintenance.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Maintenance updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
export const deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!maintenance) return res.status(404).json({ msg: "Data dont work" });
        const { date, username, sim, type, found_problems, how_to_fix, status, userId } = req.body;
        if (req.role === "admin") {
            await Maintenance.destroy({ date, username, sim, type, found_problems, how_to_fix, status, userId }, {
                where: {
                    id: maintenance.id

                },
            });
        } else {
            if (req.userId !== maintenanceuserId) return res.status(403)({ msg: "" })
            await Maintenance.destroy({ date, username, sim, type, found_problems, how_to_fix, status, userId }, {
                where: {
                    [Op.and]: [{ id: maintenance.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Maintenance deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}