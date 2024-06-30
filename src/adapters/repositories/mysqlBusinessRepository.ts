import { IBusinessRepository } from '../../domain/repositories/IBusinessRepository';
import Business from '../../domain/models/bussines';
import connectMySQL from '../../infrastructure/database/mysqlConnection';
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2';

class MySQLBusinessRepository implements IBusinessRepository {
    async save(business: Business): Promise<Business> {
        const connection = await connectMySQL();
        const [result]: [OkPacket, FieldPacket[]] = await connection.execute(
            'INSERT INTO businesses (name, description) VALUES (?, ?)',
            [business.name, business.description]
        );
        business.id = result.insertId.toString();
        return business;
    }

    async findById(id: string): Promise<Business | null> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM businesses WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Business(row.id.toString(), row.name, row.description);
    }

    async findAll(): Promise<Business[]> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute('SELECT * FROM businesses');
        return rows.map(row => new Business(row.id.toString(), row.name, row.description));
    }

    async update(business: Business): Promise<Business> {
        const connection = await connectMySQL();
        await connection.execute(
            'UPDATE businesses SET name = ?, description = ? WHERE id = ?',
            [business.name, business.description, business.id]
        );
        return business;
    }

    async deleteById(id: string): Promise<void> {
        const connection = await connectMySQL();
        await connection.execute('DELETE FROM businesses WHERE id = ?', [id]);
    }
}

export default MySQLBusinessRepository;
