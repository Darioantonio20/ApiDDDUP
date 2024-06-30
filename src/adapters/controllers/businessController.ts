// src/adapters/controllers/businessController.ts

import { Request, Response } from 'express';
import { BusinessService } from '../../application/services/businessService'; // Verifica la importación aquí

export const createBusiness = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const business = await BusinessService.createBusiness(name, description);
        res.status(201).json(business);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBusinessById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const business = await BusinessService.getBusinessById(id);
        if (!business) {
            res.status(404).json({ message: 'Business not found' });
        } else {
            res.status(200).json(business);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllBusinesses = async (req: Request, res: Response) => {
    try {
        const businesses = await BusinessService.getAllBusinesses();
        res.status(200).json(businesses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedBusiness = await BusinessService.updateBusiness(id, name, description);
        res.status(200).json(updatedBusiness);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBusinessById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await BusinessService.deleteBusinessById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
