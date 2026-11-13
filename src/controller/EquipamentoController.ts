import { Equipamento } from "../model/Equipamento.js";
import type { Request, Response } from "express";

class EquipamentoController {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaEquipamento: Array<Equipamento> | null = await Equipamento.listarEquipamento();
            return res.status(200).json(listaEquipamento);

        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de equipamentos." });

        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosEquipamento = req.body;
            const respostaModelo = await Equipamento.cadastrarEquipamento(dadosRecebidosEquipamento);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Equipamento cadastrado com sucesso." });

            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar equipamento." });
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o equipamento" });
        }
    }

    static async atualizarEquipamento(req: Request, res: Response): Promise<Response> {
        try {
            const idEquipamentoParam = req.params.idEquipamento;
            const idEquipamento = Number(idEquipamentoParam);

            if (isNaN(idEquipamento)) {
                return res.status(400).json({ erro: 'ID do Equipamento inválido' });
            }
            const campos = req.body;
            const atualizado = await Equipamento.atualizarEquipamento(idEquipamento, campos);
            console.log(idEquipamento, campos);

            if (atualizado) {
                return res.status(200).json({ mensagem: "Equipamento atualizado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar Equipamento." });
            }
        } catch (error) {
            console.error(`Erro ao atualizar Equipamento: ${error}`);
            return res.status(500).json({ mensagem: "Erro ao atualizar Equipamento." });
        }
    }
}

export default EquipamentoController;