import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { PostgresDataSource } from '../utils/postgres-data-source'
import { user } from '../models/typeorm/user'
import config from '../config'

export class AuthControl {
    static login = async (req: Request, res: Response) => {
        let { email, password } = req.body

        if(!(email && password)) {
            res.status(401).send()
        }

        const userRepository = PostgresDataSource.getRepository(user)
        let u: user

        try {
            u = await userRepository.findOneOrFail({where: { email }})

            if(!u.passwordValidator(password)) {
                res.status(401).send()
                return
            }
        
            const token = jwt.sign({userId: u.id, email: u.email}, config.key, {expiresIn: "1h"})
            console.log("success", token)
            res.status(200).send({
                userId: u.id,
                email: u.email,
                perms: u.perms,
                accessToken: token
            })
        } catch (error) {
            res.status(401).send()
        }
    }
}