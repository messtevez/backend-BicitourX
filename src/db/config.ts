import { connect } from 'mongoose';
import { MONGO_URI } from '../utils/config';
import logger from '../utils/logger';
const connectDB = async () => {
    const uri = MONGO_URI;
    if (!uri) {
        logger.error('La URI de la base de datos no está definida');
        throw new Error('La URI de la base de datos no está definida');
    }
    try {
        await connect(uri);
        logger.info('DB conectada');
    } catch (error) {
        logger.error('Error conectando a la base de datos', error);
        throw error;
    }
}
export default connectDB;