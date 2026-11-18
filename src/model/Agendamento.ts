import { DatabaseModel } from "./DatabaseModel.js";
import type { AgendamentoDTO } from "../view/AgendamentoDTO.js";

const database = new DatabaseModel().pool;

export class Agendamento {
	private id_agendamento?: number;
	private data_concerto: Date | string;
	private id_cliente: number;
	private id_equipamento: number;

	constructor(_data_concerto: Date | string, _id_cliente: number, _id_equipamento: number) {
		this.data_concerto = _data_concerto;
		this.id_cliente = _id_cliente;
		this.id_equipamento = _id_equipamento;
	}

	// ========== GETTERS ==========
	public getIdAgendamento(): number | undefined { return this.id_agendamento; }
	public getDataConcerto(): Date | string { return this.data_concerto; }
	public getIdCliente(): number { return this.id_cliente; }
	public getIdEquipamento(): number { return this.id_equipamento; }

	// ========== SETTERS ==========
	public setIdAgendamento(_id_agendamento: number): void { this.id_agendamento = _id_agendamento; }
	public setDataConcerto(_data_concerto: Date | string): void { this.data_concerto = _data_concerto; }
	public setIdCliente(_id_cliente: number): void { this.id_cliente = _id_cliente; }
	public setIdEquipamento(_id_equipamento: number): void { this.id_equipamento = _id_equipamento; }

	static async listarAgendamentos(): Promise<Array<Agendamento> | null> {
		try {
			const resultado = await database.query("SELECT * FROM agendamento ORDER BY id_agendamento;");
			const lista: Array<Agendamento> = resultado.rows.map((linha) => {
				const agendamento = new Agendamento(
					linha.data_concerto,
					linha.id_cliente,
					linha.id_equipamento
				);
				agendamento.setIdAgendamento(linha.id_agendamento);
				return agendamento;
			});

			return lista;
		} catch (error) {
			console.error(`Erro na consulta ao banco de dados. ${error}`);
			return null;
		}
	}

	static async cadastrarAgendamento(agendamento: AgendamentoDTO): Promise<boolean> {
		try {
			const resultado = await database.query(
				`INSERT INTO agendamento (data_concerto, id_cliente, id_equipamento)
				 VALUES ($1, $2, $3)
				 RETURNING id_agendamento;`,
				[agendamento.data_concerto, agendamento.id_cliente, agendamento.id_equipamento]
			);

			return resultado.rows.length > 0;
		} catch (error) {
			console.error(`Erro ao cadastrar agendamento: ${error}`);
			return false;
		}
	}

	static async atualizarAgendamento(
		idAgendamento: number,
		campos: Partial<AgendamentoDTO>
	): Promise<boolean> {
		try {
			const resultado = await database.query(
				`UPDATE agendamento SET
					data_concerto = COALESCE($1, data_concerto),
					id_cliente = COALESCE($2, id_cliente),
					id_equipamento = COALESCE($3, id_equipamento)
				 WHERE id_agendamento = $4
				 RETURNING id_agendamento;`,
				[
					campos.data_concerto ?? null,
					campos.id_cliente ?? null,
					campos.id_equipamento ?? null,
					idAgendamento
				]
			);

			return resultado.rows.length > 0;
		} catch (error) {
			console.error(`Erro ao atualizar agendamento: ${error}`);
			return false;
		}
	}
}
