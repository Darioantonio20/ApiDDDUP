// src/domain/repositories/IBusinessRepository.ts

import Business from '../models/bussines';

export interface IBusinessRepository {
    save(business: Business): Promise<Business>;
    findById(id: string): Promise<Business | null>;
    findAll(): Promise<Business[]>;
    update(business: Business): Promise<Business>;
    deleteById(id: string): Promise<void>;
}
