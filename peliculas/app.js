import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/pelicula.routes.js'
import logger from './middlewares/logger.js'
import authRoutes from './routes/auth.routes.js'
import validarToken from './middlewares/auth.js'

const app = express()
const port = 3000

app.use(bodyParser.json())

// logger SIEMPRE primero
app.use(logger)

// 👇 LOGIN SIN SEGURIDAD
app.use('/', authRoutes)

// 👇 PROTEGER TODO CON JWT
app.use(validarToken)

// 👇 RUTAS PROTEGIDAS
app.use('/', router)

app.listen(port, () => {
    console.log('Servidor corriendo en puerto:', port)
})