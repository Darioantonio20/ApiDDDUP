// src/adapters/repositories/mongoBusinessRepository.ts

import { IBusinessRepository } from '../../domain/repositories/IBusinessRepository';
import Business from '../../domain/models/bussines';
import { IBusinessDocument, BusinessModel } from './schemas/businessSchema';

class MongoBusinessRepository implements IBusinessRepository {
    async save(business: Business): Promise<Business> {
        const businessModel = new BusinessModel(business);
        const savedBusiness = await businessModel.save();
        return new Business(savedBusiness.id, savedBusiness.name, savedBusiness.description);
    }

    async findById(id: string): Promise<Business | null> {
        const business = await BusinessModel.findById(id);
        if (!business) return null;
        return new Business(business.id, business.name, business.description);
    }

    async findAll(): Promise<Business[]> {
        const businesses: IBusinessDocument[] = await BusinessModel.find();
        return businesses.map(business => new Business(business.id, business.name, business.description));
    }

    async update(business: Business): Promise<Business> {
        const updatedBusiness = await BusinessModel.findByIdAndUpdate(business.id, business, { new: true });
        if (!updatedBusiness) throw new Error('Business not found');
        return new Business(updatedBusiness.id, updatedBusiness.name, updatedBusiness.description);
    }

    async deleteById(id: string): Promise<void> {
        await BusinessModel.findByIdAndDelete(id);
    }
}

export default MongoBusinessRepository;
