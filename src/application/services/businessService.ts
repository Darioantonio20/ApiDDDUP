import { IBusinessRepository } from '../../domain/repositories/IBusinessRepository';
import Business from '../../domain/models/bussines';

export class BusinessService {
    private static businessRepository: IBusinessRepository;

    constructor(businessRepository: IBusinessRepository) {
        BusinessService.businessRepository = businessRepository;
    }

    static async createBusiness(name: string, description: string): Promise<Business> {
        const business = new Business(null, name, description);
        return await BusinessService.businessRepository.save(business);
    }

    static async getBusinessById(id: string): Promise<Business | null> {
        return await BusinessService.businessRepository.findById(id);
    }

    static async getAllBusinesses(): Promise<Business[]> {
        return await BusinessService.businessRepository.findAll();
    }

    static async updateBusiness(id: string, name: string, description: string): Promise<Business> {
        const business = new Business(id, name, description);
        return await BusinessService.businessRepository.update(business);
    }

    static async deleteBusinessById(id: string): Promise<void> {
        await BusinessService.businessRepository.deleteById(id);
    }
}
