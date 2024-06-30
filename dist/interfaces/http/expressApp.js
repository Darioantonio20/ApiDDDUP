"use strict";
// src/interfaces/http/expressApp.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alumnoController_1 = require("../../adapters/controllers/alumnoController");
const businessController_1 = require("../../adapters/controllers/businessController");
const multerConfig_1 = require("../../infrastructure/config/multerConfig");
const storageController_1 = require("../../adapters/controllers/storageController");
const diContainer_1 = require("../../infrastructure/diContainer");
const storageService_1 = require("../../application/services/storageService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Inicialización de servicios y controladores
const storageService = new storageService_1.StorageService(diContainer_1.storageRepository);
const storageController = new storageController_1.StorageController(storageService);
app.post('/upload', multerConfig_1.upload.single('file'), storageController.upload);
app.post('/api/alumnos', alumnoController_1.createAlumno);
app.get('/api/alumnos/:id', alumnoController_1.getAlumnoById);
app.get('/api/alumnos', alumnoController_1.getAllAlumnos);
app.put('/api/alumnos/:id', alumnoController_1.updateAlumno);
app.delete('/api/alumnos/:id', alumnoController_1.deleteAlumnoById);
app.post('/api/businesses', businessController_1.createBusiness); // Añadido
app.get('/api/businesses/:id', businessController_1.getBusinessById); // Añadido
app.get('/api/businesses', businessController_1.getAllBusinesses); // Añadido
app.put('/api/businesses/:id', businessController_1.updateBusiness); // Añadido
app.delete('/api/businesses/:id', businessController_1.deleteBusinessById); // Añadido
exports.default = app;
