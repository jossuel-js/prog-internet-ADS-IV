

 function AuthMiddleware(request, 
    response, next){

        const auth = request.headers.authorization

        if (!auth){
            return response.status(401).json('Crendenciais inválidas!')
        }

        const [authType, authValue] = auth.split(' ')

        if (authType === 'Basic'){
            
            let buff = Buffer.from(authValue, 'base64');
            let [email, senha] = buff.toString('ascii').split(':');
            console.log(email, senha)
            
        }


        if (authType === 'Bearer'){
            // Validar o Token para liberar ou não a requisição
        }

        console.log(`Auth Middleware 🃏 -> ${authType}->${authValue}`)
        
        return next()
}
module.exports = AuthMiddleware