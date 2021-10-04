// API REST de Funcionários
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'
const router = express.Router()

/*******************************************
 * GET /funcionarios
 * Retornar a lista de todos os funcionários
 ********************************************/
router.get("/", (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .execute('SP_S_FUN_FUNCIONARIO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err) //400 - Bad Request
        })
    } catch (err){
        console.error(err)
    }
})

/*******************************************
 * GET /funcionarios/:registro
 * Retornar um funcionario através do registro
 ********************************************/
 router.get("/:registro", (req, res) => {
     const registro = req.params.registro
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('registro', sql.Char(14), registro)
            .execute('SP_S_FUN_FUNCIONARIO_2')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err) //400 - Bad Request
        })
    } catch (err){
        console.error(err)
    }
})
/*******************************************
 * POST /funcionarios
 * Insere um novo funcionario
 ********************************************/
router.post("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {registro, nome, tipo, dataadmissao, valor,numero} = req.body
        return pool.request()
        .input('registro', sql.Char(14), registro)
        .input('nome', sql.VarChar(70), nome)
        .input('tipo', sql.VarChar(50), tipo)
        .input('dataadmissao', sql.Date, dataadmissao)
        .input('valor', sql.Numeric, valor)
        .input('numero', sql.Int, numero)
        .output('codigogerado', sql.Int)
        .execute('SP_I_FUN_FUNCIONARIO')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message) // bad request
    })
})

/*******************************************
 * PUT /funcionarios
 * Altera os dados de um funcionario
 ********************************************/
 router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {registro, nome, tipo, dataadmissao, valor,numero} = req.body
        return pool.request()
        .input('registro', sql.Char(14), registro)
        .input('nome', sql.VarChar(70), nome)
        .input('tipo', sql.VarChar(50), tipo)
        .input('dataadmissao', sql.Date, dataadmissao)
        .input('valor', sql.Numeric, valor)
        .input('numero', sql.Int, numero)
        .execute('SP_U_FUN_FUNCIONARIO')
    }).then(dados => {
        res.status(200).json('Funcionário alterado com sucesso!')
    }).catch(err => {
        res.status(400).json(err.message) // bad request
    })
})

/*******************************************
 * DELETE /funcionarios/:registro
 * Apaga um funcionário pelo registro
 ********************************************/
router.delete('/:registro', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const registro = req.params.registro
        return pool.request()
        .input('registro', sql.Char(14), registro)
        .execute('SP_D_FUN_FUNCIONARIO')
    }).then(dados => {
        res.status(200).json('Funcionário excluído com sucesso!')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

export default router