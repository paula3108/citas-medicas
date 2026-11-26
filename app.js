const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/centro_salud')
.then(()=> console.log('Conectado a MongoDB'))
.catch(err=> console.log(err));

// MODELOS - todo en un solo archivo
const Paciente = mongoose.model('Paciente', new mongoose.Schema({
  nombre: String, documento: String, telefono: String, correo: String
}));
const Medico = mongoose.model('Medico', new mongoose.Schema({
  nombre: String, especialidad: String, telefono: String, correo: String
}));
const Cita = mongoose.model('Cita', new mongoose.Schema({
  paciente: String, medico: String, fecha: String, motivo: String
}));

// RUTAS PACIENTES
app.get('/api/pacientes', async (req,res)=> res.json(await Paciente.find()));
app.post('/api/pacientes', async (req,res)=> res.json(await new Paciente(req.body).save()));

// RUTAS MEDICOS
app.get('/api/medicos', async (req,res)=> res.json(await Medico.find()));
app.post('/api/medicos', async (req,res)=> res.json(await new Medico(req.body).save()));

// RUTAS CITAS
app.get('/api/citas', async (req,res)=> res.json(await Cita.find()));
app.post('/api/citas', async (req,res)=> res.json(await new Cita(req.body).save()));

app.listen(3000, ()=> console.log('Servidor en puerto 3000'));