import jwt from 'jsonwebtoken'

const SECRET_KEY = 'mi_secreto_super_seguro'

const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ message: 'Token requerido' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' })
        }

        req.user = decoded
        next()
    })
}

export default validarToken