// Importa la librería jsonwebtoken que se utiliza para manejar los tokens
import jsonwebtoken from 'jsonwebtoken';

// Importa la clave secreta para generar el token
import { secretKey } from './loginconfig.js';

// Middleware que se utiliza para autenticar las rutas protegidas con token
export const autentica = (req, res, next) => {

	// Obtiene el token del header Authorization
	let token = req.headers.authorization || '';

	// Si el token está ausente, responde con un error y un mensaje de token ausente
	if (!token) {
		res.status(400).json({ ok: false, error: 'token absent' });
	} 

	// Verifica el token con la clave secreta
	jsonwebtoken.verify(token, secretKey, (error, decoded) => {

		// Si hay un error en la verificación, responde con un error y un mensaje de token no válido
		if (error) {
			res.status(400).json({ ok: false, error: 'token invalid' });
		} else {
			// Si la verificación es correcta, comprueba si el token ha caducado
			const { expiredAt } = decoded;
			if (expiredAt > new Date().getTime()) {
				// Si el token no ha caducado, permite el acceso a la ruta protegida
				next();
			} else {
				// Si el token ha caducado, responde con un error y un mensaje de token caducado
				res.status(400).json({ ok: false, error: 'token caducat' });
			}
		}
	});
};




// // Middleware que se utiliza para autenticar las rutas protegidas con token
// export const autenticaAdmin = (req, res, next) => {

// 	// Obtiene el token del header Authorization
// 	let token = req.headers.authorization || '';

// 	// Si el token está ausente, responde con un error y un mensaje de token ausente
// 	if (!token) {
// 		res.status(400).json({ ok: false, error: 'token absent' });
// 	} 

// 	// Verifica el token con la clave secreta
// 	jsonwebtoken.verify(token, secretKey, (error, decoded) => {

// 		// Si hay un error en la verificación, responde con un error y un mensaje de token no válido
// 		if (error) {
// 			res.status(400).json({ ok: false, error: 'token invalid' });
// 		} else {
// 			// Si la verificación es correcta, comprueba si el token ha caducado
// 			const { expiredAt, admin } = decoded;

// 			if (!admin){
// 				res.status(400).json({ ok: false, error: 'no es admin' });
// 			}
// 			if (expiredAt > new Date().getTime()) {
// 				// Si el token no ha caducado, permite el acceso a la ruta protegida
// 				next();
// 			} else {
// 				// Si el token ha caducado, responde con un error y un mensaje de token caducado
// 				res.status(400).json({ ok: false, error: 'token caducat' });
// // 			}
// 		}
// 	});
// };
