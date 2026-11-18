import { Agendamento } from "../model/Agendamento.js";
import type { Request, Response } from "express";

class AgendamentoController {
	static async todos(req: Request, res: Response): Promise<Response> {
		try {
			const listaAgendamentos = await Agendamento.listarAgendamentos();
			return res.status(200).json(listaAgendamentos);
		} catch (error) {
			console.error(`Erro ao consultar modelo. ${error}`);
			return res.status(500).json({ mensagem: "Não foi possível acessar a lista de agendamentos." });
		}
	}

	static async novo(req: Request, res: Response): Promise<Response> {
		try {
			const cadastrado = await Agendamento.cadastrarAgendamento(req.body);

			if (cadastrado) {
				return res.status(201).json({ mensagem: "Agendamento cadastrado com sucesso." });
			}

			return res.status(400).json({ mensagem: "Erro ao cadastrar agendamento." });
		} catch (error) {
			console.error(`Erro no modelo. ${error}`);
			return res.status(500).json({ mensagem: "Não foi possível inserir o agendamento." });
		}
	}

	static async atualizarAgendamento(req: Request, res: Response): Promise<Response> {
		try {
			const idAgendamento = Number(req.params.idAgendamento);
			if (!Number.isInteger(idAgendamento) || idAgendamento <= 0) {
				return res.status(400).json({ erro: "ID do agendamento inválido." });
			}

			const atualizado = await Agendamento.atualizarAgendamento(idAgendamento, req.body);
			if (atualizado) {
				return res.status(200).json({ mensagem: "Agendamento atualizado com sucesso." });
			}

			return res.status(400).json({ mensagem: "Erro ao atualizar agendamento." });
		} catch (error) {
			console.error(`Erro ao atualizar agendamento: ${error}`);
			return res.status(500).json({ mensagem: "Erro ao atualizar agendamento." });
		}
	}
}

export default AgendamentoController;
