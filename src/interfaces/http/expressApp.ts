import express from 'express';
import { createAlumno, getAlumnoById, getAllAlumnos, updateAlumno, deleteAlumnoById } from '../../adapters/controllers/alumnoController';
import { createBusiness, getBusinessById, getAllBusinesses, updateBusiness, deleteBusinessById } from '../../adapters/controllers/businessController'; 
import { upload } from '../../infrastructure/config/multerConfig';
import { StorageController } from '../../adapters/controllers/storageController';
import { storageRepository } from '../../infrastructure/diContainer';
import { StorageService } from '../../application/services/storageService';
import { BusinessService } from '../../application/services/businessService'; // Añadido
import { businessService } from '../../infrastructure/diContainer'; // Añadido

const app = express();
app.use(express.json());

// Inicialización de servicios y controladores
const storageService = new StorageService(storageRepository);
const storageController = new StorageController(storageService);

app.post('/upload', upload.single('file'), storageController.upload);
app.post('/api/alumnos', createAlumno);
app.get('/api/alumnos/:id', getAlumnoById);
app.get('/api/alumnos', getAllAlumnos);
app.put('/api/alumnos/:id', updateAlumno);
app.delete('/api/alumnos/:id', deleteAlumnoById);

app.post('/api/businesses', createBusiness); // Añadido
app.get('/api/businesses/:id', getBusinessById); // Añadido
app.get('/api/businesses', getAllBusinesses); // Añadido
app.put('/api/businesses/:id', updateBusiness); // Añadido
app.delete('/api/businesses/:id', deleteBusinessById); // Añadido

export default app;
