import { Cliente } from "../model/Cliente.js";
import type { Request, Response } from "express";

class ClienteController {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaClientes: Array<Cliente> | null = await Cliente.listarClientes();
            return res.status(200).json(listaClientes);

        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });

        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosCliente = req.body;
            const respostaModelo = await Cliente.cadastrarCliente(dadosRecebidosCliente);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });

            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar cliente." });
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o cliente" });
        }
    }

    static async atualizarCliente(req: Request, res: Response): Promise<Response> {
        try {
            const idClienteParam = req.params.idCliente;
            const idCliente = Number(idClienteParam);

            if (isNaN(idCliente)) {
                return res.status(400).json({ erro: 'ID do Cliente inválido' });
            }
            const campos = req.body;
            const atualizado = await Cliente.atualizarCliente(idCliente, campos);
            console.log(idCliente, campos);

            if (atualizado) {
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar Cliente." });
            }
        } catch (error) {
            console.error(`Erro ao atualizar Cliente: ${error}`);
            return res.status(500).json({ mensagem: "Erro ao atualizar Cliente." });
        }
    }
}

export default ClienteController;